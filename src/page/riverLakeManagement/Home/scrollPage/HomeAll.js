import React, { Component } from 'react';
import {
    View, DeviceEventEmitter,
} from 'react-native';
import { RefreshFlatList } from '@rich/react-native-richway-component';
import { inject } from 'mobx-react/index';
import PropTypes from 'prop-types';
import BaseStyle from '$src/css/BaseStyle';
import Item from './Item';
import Service, { baseUrl } from '$src/common/Service';
import { get } from '$src/common/Fetch';
import TabsRight from '$src/common/TabsRight';

@inject(['user'])
class Page extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        user: PropTypes.object,
    }

    static defaultProps = {
        navigation: {},
        user: {},
        items: [
            {icon: 'md-apps', name: '全部', sttpCd: ''},
            {icon: 'md-boat', name: '水生态\n管理', sttpCd: 'ST'},
            {icon: 'md-pint', name: '河湖\n管护', sttpCd: 'HH'},
            {icon: 'md-cash', name: '风景区\n管理', sttpCd: 'FJ'},
        ],
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

    renderItem = ({ item }) => <Item item={item} />

    render() {
        const { user, items } = this.props;
        return (
          <View style={[BaseStyle.container, { flexDirection: 'row' }]}>
              <TabsRight
                    items={items}
                  callback={(sttpCd) => {
                        this.RefreshFlatList.onRefresh({
                            appId: user.user.appId,
                            userId: user.user.userAccount,
                            page: 1,
                            rows: 4,
                            sttpCd,
                        });
                    }}
                />
              <RefreshFlatList
                  ref={(v) => {
                        this.RefreshFlatList = v;
                    }}
                  getData={(params) => get({ url: Service.Monitoring, params })}
                  params={{
                        appId: user.user.appId,
                        userId: user.user.userAccount,
                        page: 1,
                        rows: 4,
                    }}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
}

export default Page;
