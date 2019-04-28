import React, { Component } from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    Header, SearchButton, ButtonView,
} from '@rich/react-native-richway-component';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseStyle from '$src/css/BaseStyle';
import HomeAll from './scrollPage/HomeAll';
import HomeWarn from './scrollPage/HomeWarn';
import HomeCollection from './scrollPage/HomeCollection';
import Map from './Map';

const styles = StyleSheet.create({
    underline: {
        backgroundColor: BaseStyle.themeColor,
        bottom: -1,
        height: 2,
    },
    buttonMap: {
        width: 35,
        height: 35,
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
});

class Page extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }

    static defaultProps = {
        navigation: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            size: 'normal',
        };
    }

    componentDidMount() {

    }

    setMapSize = () => {
        const { size } = this.state;
        if (size === 'full') {
            this.setState({
                size: 'normal',
            });
        } else {
            this.setState({
                size: 'full',
            });
        }
    }

    mapStyle = () => {
        const { size } = this.state;
        if (size === 'full') {
            return { flex: 1, backgroundColor: 'white' };
        }
        return { width: '100%', height: '40%', backgroundColor: 'white' };
    }

    render() {
        const { navigation } = this.props;
        const { size } = this.state;
        return (
          <View style={BaseStyle.container}>
              <Header title="城市内涝智能图像识别系统" leftView={<View />} />
              <View style={this.mapStyle()}>
              {size === 'full' ? null : (
                        <SearchButton
                            onPress={() => {
                                navigation.navigate('UrbanWaterloggingSearch');
                            }}
                />
                    )}
              <Map />
              <ButtonView
                      style={styles.buttonMap}
                        onPress={this.setMapSize}
                    >
                      {size === 'full'
                            ? <Icon name="md-contract" color="gray" size={22} />
                            : <Icon name="md-qr-scanner" color="gray" size={22} />}
                    </ButtonView>
                </View>
                <View
                    style={(size === 'full'
                        ? { width: '100%', height: 0, backgroundColor: 'white' }
                        : { flex: 1, backgroundColor: 'white' })}
            >
              <View style={{ flex: 1 }}>
                      <ScrollableTabView
                            tabBarUnderlineStyle={styles.underline}
                          tabBarInactiveTextColor={BaseStyle.valueItemColor}
                          tabBarActiveTextColor={BaseStyle.themeColor}
                          renderTabBar={() => (
                                <DefaultTabBar
                              style={{ height: 38, borderColor: BaseStyle.border.borderColor }}
                              tabStyle={{ paddingBottom: 0 }}
                              textStyle={{ fontSize: 12 }}
                            />
                            )}
                        >
                            <HomeAll tabLabel="全部" />
                          <HomeWarn tabLabel="预警" />
                          <HomeCollection tabLabel="收藏" />
                        </ScrollableTabView>
                    </View>
            </View>
            </View>
        );
    }
}

export default Page;
