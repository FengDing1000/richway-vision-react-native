import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    ButtonView, Header, Input, TextView,
} from '@rich/react-native-richway-component';
import { inject } from 'mobx-react/index';
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
        flex: 1,
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
    codeStyle: {
        flexDirection: 'row',
        marginTop: 13,
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 20,
    },
    imageView: {
        width: 60,
        backgroundColor: '#f1f1f1',
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        marginRight: 20,
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
            value: '',
        };
    }

    componentDidMount() {

    }

    sure = () => {
        const { navigation } = this.props;
        const { value } = this.state;
        if (value === '') {
            Toast('请输入用户名/手机号');
        } else {
            const formData = new FormData();
            formData.append('resetName', value);
            post({ url: Service.ValidateAccount, params: formData, modal: true }).then((res) => {
                navigation.navigate('MessageValidate', res.data);
            }).catch((error) => {
                Toast(error.message);
            });
        }
    }

    render() {
        const { value } = this.state;
        return (
          <View style={BaseStyle.container}>
              <Header title="确认账号" />
              <View style={BaseStyle.content}>
              <View style={styles.codeStyle}>
                  <View style={styles.input}>
                          <Input
                                placeholder="请输入用户名/手机号"
                              onChangeText={(text) => this.setState({ value: text })}
                              value={value}
                            />
                        </View>
                    </View>
              <ButtonView
                      style={styles.button}
                      onPress={this.sure}
                    >
                      <TextView
                          style={{ color: 'white' }}
                        >
                          {'下一步'}
                        </TextView>
                    </ButtonView>
                </View>
            </View>
        );
    }
}

export default Page;
