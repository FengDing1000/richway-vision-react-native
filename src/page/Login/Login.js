import React, { Component } from 'react';
import {
    View, StyleSheet, Image, AsyncStorage, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    ButtonView, Header, Input, TextView, Dialog,
} from '@rich/react-native-richway-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import md5 from 'blueimp-md5';
import { inject } from 'mobx-react';
import { NavigationActions, StackActions } from 'react-navigation';
import BaseStyle from '$src/css/BaseStyle';
import loginImage from '$src/image/login.jpg';
import Toast from '$src/common/Toast';
import Service from '$src/common/Service';
import { post } from '$src/common/Fetch';
import Multifunctional from "./Multifunctional";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    input: {
        marginLeft: 10,
        height: 32,
        borderBottomWidth: 1,
        borderColor: '#e4e4e4',
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 30,
        width: 260,
    },
    dealAccount: {
        width: 260,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    remember: {
        fontSize: 11,
        color: BaseStyle.textItemColor,
        marginLeft: 8,
    },
    button: {
        flexDirection: 'row',
        marginTop: 50,
        width: 260,
        height: 40,
        backgroundColor: BaseStyle.themeColor,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width,
        height: width / 2,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    row: { flexDirection: 'row', alignItems: 'center' },
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
            loginName: '',
            loginPassWord: '',
            remember: true,
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('user').then((res) => {
            if (res) {
                const { loginName, loginPassWord } = JSON.parse(res);
                this.setState({
                    loginName, loginPassWord,
                });
            }
        });
    }

    login = () => {
        const { loginName, loginPassWord, remember } = this.state;
        const { user, navigation } = this.props;
        if (loginName === '' || loginPassWord === '') {
            Toast('请输入账号密码');
            return;
        }
        const formData = new FormData();
        formData.append('loginName', loginName.trim());
        formData.append('loginPassWord', md5(loginPassWord.trim()).toUpperCase());
        post({ url: Service.Login, params: formData, modal: true }).then((res) => {
            if (remember) {
                AsyncStorage.setItem('user', JSON.stringify({ loginName, loginPassWord }));
            } else {
                AsyncStorage.removeItem('user');
            }
            user.setUser(res.data);
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Multifunctional' }),
                ],
                key: null,
            });
            navigation.dispatch(resetAction);
        }).catch((error) => {
            Dialog.open({ text: error.message, alert: true });
        });
    }

    forgetPassword=() => {
        const { navigation } = this.props;
        navigation.navigate('ForgetPassword');
    }

    rememberPassword=() => {
        const { remember } = this.state;
        this.setState({
            remember: !remember,
        });
    }

    render() {
        const { loginName, loginPassWord, remember } = this.state;
        return (
          <View style={BaseStyle.container}>
              <KeyboardAwareScrollView>
                    <Image source={loginImage} style={styles.image} />
                  <View style={styles.container}>
                      <View style={styles.inputContainer}>
                      <Icon name="md-person" size={25} color={BaseStyle.textItemColor} />
                            <View style={styles.input}>
                            <Input
                                placeholder="请输入账号"
                                value={loginName}
                                onChangeText={(text) => {
                                        this.setState({
                                            loginName: text,
                                        });
                                    }}
                              />
                          </View>
                    </View>
                        <View style={styles.inputContainer}>
                      <Icon name="md-lock" size={25} color={BaseStyle.textItemColor} />
                      <View style={styles.input}>
                            <Input
                          placeholder="请输入密码"
                          secureTextEntry
                          value={loginPassWord}
                                    onChangeText={(text) => {
                                        this.setState({
                                            loginPassWord: text,
                                        });
                                    }}
                        />
                            </View>
                    </View>
                      <View style={styles.dealAccount}>
                          <View style={styles.row}>
                              <ButtonView
                                    style={styles.row}
                                    onPress={this.rememberPassword}
                                >
                                  <Icon
                                      name={remember ? 'md-checkbox' : 'md-square-outline'}
                                      size={14}
                                      color={BaseStyle.themeColor}
                                    />
                                    <TextView style={styles.remember}>记住密码</TextView>
                                </ButtonView>
                            </View>
                          <ButtonView onPress={this.forgetPassword}>
                              <TextView style={styles.remember}>忘记密码?</TextView>
                            </ButtonView>
                        </View>
                        <ButtonView
                      style={styles.button}
                      onPress={this.login}
                    >
                            <TextView
                            style={{ color: 'white' }}
                          >
                            登录
                          </TextView>
                    </ButtonView>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

export default Page;
