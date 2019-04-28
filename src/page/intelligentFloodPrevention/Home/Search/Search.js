import React, { Component } from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { ButtonView, RefreshFlatList, SearchBox } from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import { inject } from 'mobx-react/index';
import BaseStyle from '$src/css/BaseStyle';
import Service, { baseUrl } from '$src/common/Service';
import Item from '../scrollPage/Item';
import { get } from '$src/common/Fetch';

const styles = StyleSheet.create({
    back: {
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
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
        const { user } = props;
        this.params = {
            appId: user.user.appId,
            userId: user.user.userAccount,
            nm: '',
            page: 1,
            rows: 5,
        };
    }

    componentDidMount() {

    }

    leftIcon = () => {
        const { navigation } = this.props;
        return (
          <ButtonView
              style={styles.back}
              onPress={() => {
                    navigation.goBack();
                }}
            >
              <Icon name="md-arrow-back" size={20} color="white" />
            </ButtonView>
        );
    };

    keyExtractor = (item, index) => index.toString();

    renderItem=({ item }) => <Item item={item} />

    filterResult=(text) => {
        this.params.nm = text;
        this.refreshFlatList.onRefresh(this.params);
    }

    render() {
        return (
          <View style={BaseStyle.container}>
                <SearchBox
              leftIcon={this.leftIcon}
              filterResult={this.filterResult}
              placeholder="请输入站点名称或编号"
            />
                <RefreshFlatList
              ref={(w) => { this.refreshFlatList = w; }}
              getData={(params) => get({ url: Service.Monitoring, params })}
              params={this.params}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
            </View>
        );
    }
}

export default Page;
