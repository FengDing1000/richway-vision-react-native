import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    View,
} from 'react-native';
import { RefreshFlatList } from '@rich/react-native-richway-component';
import { inject } from 'mobx-react/index';
import PropTypes from 'prop-types';
import BaseStyle from '$src/css/BaseStyle';
import Item from './Item';
import Service, { baseUrl } from '$src/common/Service';
import { get } from '$src/common/Fetch';

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

    renderItem=({ item }) => <Item item={item} />

    render() {
        const { user } = this.props;
        return (
          <View style={BaseStyle.container}>
              <RefreshFlatList
              ref={(v) => { this.RefreshFlatList = v; }}
              getData={(params) => get({ url: Service.Monitoring, params })}
              params={{
                        appId: user.user.appId,
                        userId: user.user.userAccount,
                        type: 'collect',
                        page: 1,
                        rows: 20,
                    }}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
            </View>
        );
    }
}

export default Page;
