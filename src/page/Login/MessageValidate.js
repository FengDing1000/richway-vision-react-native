import React, { Component } from 'react';
import {
    View, StyleSheet, Platform, Dimensions, TouchableOpacity, BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    ButtonView, Header, Input, TextView,
} from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import BaseStyle from '$src/css/BaseStyle';
import Toast from '$src/common/Toast';
import { post } from '$src/common/Fetch';
import Service from '$src/common/Service';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingLeft: 10,
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
    dropStyle: {
        marginTop: 13,
        paddingHorizontal: 20,
        height: 40,
        width: '100%',
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
    sendMessage: {
        height: '100%',
        width: 100,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropDownStyle: {
        width: width - 40,
        borderColor: BaseStyle.border.borderColor,
        borderWidth: 1,
        height: 'auto',
        minHeight: 40,
        maxHeight: 200,
    },
    dropCustomer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingLeft: 10,
    },
    selectInput: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 6,
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10,
        alignItems: 'center',
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
        const { params } = props.navigation.state;
        this.state = {
            messageCode: '',
            options: [
                { label: '请选择安全验证方式', value: '' },
                { label: `使用手机验证(${params.mobileNo})`, value: params.mobileNo },
                { label: `使用邮箱验证(${params.email})`, value: params.email },
            ],
            option: '',
            time: 60,
            showTime: false,
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    sure = () => {
        const { messageCode, option } = this.state;
        if (option === '') {
            Toast('请选择安全验证方式');
        } else if (messageCode === '') {
            Toast('请输入校验码');
        } else {
            const formData = new FormData();
            formData.append('pattern', option);
            formData.append('activateCode', messageCode);
            post({ url: Service.SafeValidate, params: formData, modal: true }).then((res) => {
                const { navigation } = this.props;
                navigation.navigate('ResetPassword', res.message);
            }).catch((error) => {
                Toast(error.message);
            });
        }
    }

    adjustFrame = (style) => {
        const obj = style;
        if (Platform.OS === 'android') {
            obj.top = style.top - 23;
        }
        return obj;
    }

    renderRow = (rowData, rowId, highlighted) => (
      <TouchableOpacity activeOpacity={1} style={styles.dropCustomer}>
          <TextView style={{ color: highlighted ? BaseStyle.themeColor : null }}>{rowData.label}</TextView>
        </TouchableOpacity>
    )

    sendMessage=() => {
        const { option } = this.state;
        if (option === '') {
            Toast('请选择安全验证方式');
        } else {
            this.setState({
                showTime: true,
            });
            this.timer = setInterval(() => {
                const { time } = this.state;
                if (time > 0) {
                    this.setState({
                        time: time - 1,
                    });
                } else {
                    this.setState({
                        time: 60,
                        showTime: false,
                    });
                }
            }, 1000);
            const formData = new FormData();
            formData.append('val', option);
            post({ url: Service.SendValidateCode, params: formData }).then((res) => {
                Toast(res.message);
            }).catch((error) => {
                Toast(error.message);
            });
        }
    }

    render() {
        const {
            messageCode, option, options, showTime, time,
        } = this.state;
        return (
          <View style={BaseStyle.container}>
              <Header title="安全验证" />
              <View style={BaseStyle.content}>
                  <View style={styles.dropStyle}>
                      <ModalDropdown
                          dropdownStyle={styles.dropDownStyle}
                            dropdownTextHighlightStyle={{ color: BaseStyle.themeColor }}
                            enableEmptySections
                          animated={false}
                          options={options}
                          onSelect={(index, data) => this.setState({ option: data.value })}
                            adjustFrame={this.adjustFrame}
                            renderRow={this.renderRow}
                        >
                            <View style={styles.selectInput}>
                          <Input
                                  placeholder="请选择安全验证方式"
                                    editable={false}
                                    onChangeText={(text) => this.setState({ option: text })}
                                    value={option}
                                />
                          <Icon name="md-arrow-dropdown" size={20} color="#333" />
                        </View>
                        </ModalDropdown>
                    </View>
                  <View style={styles.codeStyle}>
                        <View style={styles.input}>
                            <Input
                            placeholder="校验码"
                                onChangeText={(text) => this.setState({ messageCode: text })}
                            value={messageCode}
                          />
                      <ButtonView
                                style={[styles.sendMessage, { backgroundColor: showTime ? '#128DE933' : BaseStyle.themeColor }]}
                              onPress={this.sendMessage}
                              disabled={showTime}
                            >
                              <TextView style={{ color: 'white' }}>{showTime ? `${time}秒` : '发送验证码'}</TextView>
                            </ButtonView>
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
