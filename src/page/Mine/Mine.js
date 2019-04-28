import React, { Component } from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Header, TextView, Dialog } from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions, NavigationActions } from 'react-navigation';

import { inject } from 'mobx-react/index';
import BaseStyle from '$src/css/BaseStyle';
import CellItem from '$src/common/CellItem';

const styles = StyleSheet.create({
    headerBg: {
        height: 110,
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    icon: {
        width: 70,
        height: 70,
        borderRadius: 90,
        backgroundColor: BaseStyle.themeColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 30,
        height: 55,
    },
    name: {
        color: BaseStyle.title,
        fontSize: 18,
        fontWeight: 'bold',
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
        this.state = {};
    }

    componentDidMount() {

    }

    Logout=() => {
        const { user, navigation } = this.props;
        Dialog.open({
            text: '是否注销登录？',
            ok: () => {
                user.setUser({});
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login' }),
                    ],
                    key: null,
                });
                navigation.dispatch(resetAction);
            },
        });
    }

    ChangePassword=() => {
        const { navigation } = this.props;
        navigation.navigate('ChangePassword');
    }

    render() {
        const { user } = this.props;
        return (
          <View style={BaseStyle.container}>
              <Header title="我的" leftView={<View />} />
              <View style={styles.headerBg}>
              <View style={styles.icon}>
                  <Icon name="ios-person" size={45} color="white" />
                    </View>
              <View style={styles.message}>
                  <TextView style={styles.name}>{user.user.userName}</TextView>
                  <TextView numberOfLines={1}>{user.user.address}</TextView>
                    </View>
                </View>
              <CellItem color="#2DA5A7" title="关于" name="ios-filing" />
              <CellItem
                  color="#CD9E51"
                    title="密码修改"
                  name="md-document"
                    onPress={this.ChangePassword}
                />
              <CellItem
                  color="#108EE9"
                  title="注销登录"
                  name="md-power"
                  onPress={this.Logout}
                />
            </View>
        );
    }
}

export default Page;
