import React, { Component } from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    ButtonView, Header, Input, TextView,
} from '@rich/react-native-richway-component';
import BaseStyle from '$src/css/BaseStyle';
import Toast from '$src/common/Toast';
import { post } from '$src/common/Fetch';
import Service from '$src/common/Service';

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f1f1f1',
        height: 40,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 13,
    },
    text: {
        width: 90,
        color: '#333',
    },
    button: {
        flexDirection: 'row',
        marginTop: 50,
        marginHorizontal: 40,
        height: 30,
        backgroundColor: BaseStyle.themeColor,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

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
            old: '',
            newPassword: '',
            newAgain: '',
        };
    }

    componentDidMount() {

    }

    sure = () => {
        const { newAgain, newPassword } = this.state;
        const { navigation } = this.props;
        if (newAgain === '') {
            Toast('请输入新密码');
        } else if (newPassword === '') {
            Toast('请再次输入新密码');
        } else if (newPassword !== newAgain) {
            Toast('密码不一致，请重新输入');
        } else {
            const formData = new FormData();
            formData.append('UUIDCode', navigation.state.params);
            formData.append('password', newPassword);
            post({ url: Service.ResetPassword, params: formData, modal: true }).then(() => {
                Toast('重置密码成功');
                navigation.popToTop();
            }).catch((error) => {
                Toast(error.message);
            });
        }
    }

    render() {
        const { newAgain, newPassword } = this.state;
        return (
          <View style={BaseStyle.container}>
              <Header title="修改密码" />
              <View style={BaseStyle.content}>
              <View style={styles.input}>
                      <TextView style={styles.text}>新密码</TextView>
                      <Input
                            placeholder="请输入新密码"
                          onChangeText={(text) => this.setState({ newPassword: text })}
                          value={newPassword}
                            secureTextEntry
                        />
                    </View>
              <View style={styles.input}>
                      <TextView style={styles.text}>再次输入密码</TextView>
                      <Input
                          placeholder="请再次输入密码"
                          onChangeText={(text) => this.setState({ newAgain: text })}
                          value={newAgain}
                            secureTextEntry
                        />
                    </View>
              <ButtonView
                        style={styles.button}
                  onPress={this.sure}
                >
                  <TextView
                          style={{ color: 'white' }}
                        >
                          {'确认'}
                        </TextView>
                    </ButtonView>
                </View>
            </View>
        );
    }
}

export default Page;
