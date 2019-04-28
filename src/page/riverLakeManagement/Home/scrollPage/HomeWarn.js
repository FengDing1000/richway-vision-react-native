import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    StyleSheet,
    View,
} from 'react-native';
import { ButtonView, RefreshFlatList, TextView } from '@rich/react-native-richway-component';
import { inject } from 'mobx-react/index';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import BaseStyle from '$src/css/BaseStyle';
import Item from './Item';
import Service, { baseUrl } from '$src/common/Service';
import { get } from '$src/common/Fetch';
import TabsRight from '$src/common/TabsRight';

const styles = StyleSheet.create({
    bottom: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 35,
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BaseStyle.themeColor,
        borderRadius: 5,
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

    componentDidMount() {
        // 收到监听
        this.listener = DeviceEventEmitter.addListener('RefreshCollection', () => {
            this.RefreshFlatList.onRefresh();
        });
    }

    componentWillUnmount() {
        // 移除监听
        this.listener.remove();
    }

    keyExtractor = (item, index) => index.toString();

    renderItem=({ item }) => <Item item={item} warn />

    render() {
        const { user, navigation } = this.props;
        return (
          <View style={BaseStyle.container}>
              <RefreshFlatList
                  ref={(v) => { this.RefreshFlatList = v; }}
                  getData={(params) => get({ url: Service.Monitoring, params })}
                    params={{
                        appId: user.user.appId,
                        userId: user.user.userAccount,
                        type: 'wrn',
                        page: 1,
                        rows: 4,
                    }}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
              <View style={styles.bottom}>
                  <ButtonView
                      style={styles.button}
                      onPress={() => {
                            navigation.navigate('information');
                        }}
                    >
                      <TextView style={{ color: 'white' }}>更多历史预警</TextView>
                    </ButtonView>
                </View>
            </View>
        );
    }
}

export default withNavigation(Page);
