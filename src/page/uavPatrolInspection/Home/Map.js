import React, { Component } from 'react';
import {
    StyleSheet, WebView, Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import { inject } from 'mobx-react/index';
import { withNavigation } from 'react-navigation';
import webStatic from './static/wap/html/internet_platform.html';
import Service from '$src/common/Service';
import { get } from '$src/common/Fetch';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

@inject(['user'])
class Page extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        user: PropTypes.object,
    }

    static defaultProps = {
        navigation: {},
        user: {},
    }


    constructor(props) {
        super(props);
        this.state = {
            uri: this.setUri(),
        };
    }

    componentDidMount() {

    }

    onMessage = (event) => {
        console.log('RN', event.nativeEvent.data);
        let data = null;
        try {
            data = JSON.parse(event.nativeEvent.data);
        } catch (e) {
            data = {};
        }
        const res = {
            to: data.from,
            from: 'RN',
            data: null,
        };
        if (data.to === 'RN') {
            if (data.from === '/base/getBaseConfig') {
                res.data = {
                    config: {
                        layoutId: 'Layout-Wap-Base',
                        accessToken: '444444444444',
                        appId: '3333333',
                    },
                    path: {
                        imageServiceHost: 'http://testsh.rtongcloud.com:5001/staticRes',
                        nodeStaticResourcesHost: '',
                        portalHost: '/internet_platform/react_native_image_recognition',
                        webSocketUrl: '',
                        nodeServiceHost: 'http://www.baidu.com',
                        interfaceServiceHost: 'http://192.168.10.1:3004/api',
                    },
                };
                if (res.data) {
                    this.webView.postMessage(JSON.stringify(res), '*');
                }
            } else if (data.from === '/user/getUser') {
                res.data = {
                    userName: '张三111',
                    userAccount: 'wwwwww',
                    appId: 'dddddddddddddddddd',
                    appName: '贵州省山洪灾害预警系统',
                    adcd: '',
                    adnm: '贵州省',
                };
                if (res.data) {
                    this.webView.postMessage(JSON.stringify(res), '*');
                }
            } else if (data.from === '/menu/menuListForUser') {
                res.data = [];
                if (res.data) {
                    this.webView.postMessage(JSON.stringify(res), '*');
                }
            } else if (data.from === '/base/getBoundary') {
                res.data = [];
                if (res.data) {
                    this.webView.postMessage(JSON.stringify(res), '*');
                }
            } else if (data.from === '/getStationRN') {
                const { user } = this.props;
                get({
                    url: Service.Monitoring,
                    params: {
                        appId: user.user.appId,
                        userId: user.user.userAccount,
                        nm: '',
                        page: 1,
                        rows: 10000,
                    },
                }).then((response) => {
                    res.data = response.data;
                    if (res.data) {
                        this.webView.postMessage(JSON.stringify(res), '*');
                    }
                });
            } else if (data.from === 'openStationDetail') {
                const { navigation } = this.props;
                navigation.navigate('UavPatrolInspectionDetailImage', data.data);
            } else if (data.from === '/base/getLocation') {
                res.data = [22.759894, 113.540224];
                if (res.data) {
                    this.webView.postMessage(JSON.stringify(res), '*');
                }
            }
        }
    }

    setUri = () => {
        let webUrl;
        if (__DEV__) {
            webUrl = webStatic;
        } else if (Platform.OS === 'android') {
            webUrl = { uri: 'file:///android_asset/static/wap/html/internet_platform.html' };
        } else {
            webUrl = webStatic;
        }
        return webUrl;
    }

    render() {
        const { uri } = this.state;
        return (
          <WebView
              style={styles.container}
                source={uri}
              javaScriptEnabled
              domStorageEnabled
              decelerationRate="normal"
              startInLoadingState
              automaticallyAdjustContentInsets
              ref={(w) => {
                    this.webView = w;
                }}
              onMessage={this.onMessage}
              originWhitelist={['*']}
            />
        );
    }
}

export default withNavigation(Page);
