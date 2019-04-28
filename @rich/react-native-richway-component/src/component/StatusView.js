import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import BaseStyle from '../css/BaseStyle';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    minHeight: {
        minHeight: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default class StatusView extends Component {
    static propTypes = {
        color: PropTypes.string,
        children: PropTypes.any,
        getData: PropTypes.func,
        callBack: PropTypes.func,
        params: PropTypes.any,
        errorFunc: PropTypes.func,
        startFunc: PropTypes.func,
        finalFunc: PropTypes.func,
        userDefinedKey: PropTypes.string,
    }

    static defaultProps = {
        color: BaseStyle.textItemColor,
        children: null,
        getData: () => new Promise((resolve) => {
            resolve();
        }),
        callBack: () => {

        },
        params: null,
        errorFunc: () => {
        },
        startFunc: () => {
        },
        finalFunc: () => {
        },
        userDefinedKey: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            status: 'noData',
        };
    }

    componentDidMount() {
        this.reload();
    }

    reload = (obj) => {
        const {
            getData, callBack, params, errorFunc, startFunc, finalFunc, userDefinedKey
        } = this.props;
        let data = obj;
        if (data === null || data === undefined) {
            data = {};
        }
        if (!data.keepStatus) {
            this.setState({
                status: '',
            });
        }
        startFunc();
        getData(data.params || params).then((res) => {
            if (res.data === null || res.data === undefined || res.data === '') {
                this.setState({
                    status: 'noData',
                });
            } else {
                let str;
                if (Object.prototype.toString.call(res.data) === '[object Object]') {
                    // const key = userDefinedKey === null ? res.data : res.data[userDefinedKey];
                    str = JSON.stringify(res.data) !== '{}' ? 'success' : 'noData';
                    if (JSON.stringify(res.data) !== '{}') {
                        //自定义key时重新判断一下是否有数据
                        if (userDefinedKey !== null) {
                            if (res.data[userDefinedKey] === null || res.data[userDefinedKey] === undefined || res.data[userDefinedKey] === '') {
                                str = 'noData';
                            } else if (Object.prototype.toString.call(res.data[userDefinedKey]) === '[object Object]') {
                                str = JSON.stringify(res.data[userDefinedKey]) !== '{}' ? 'success' : 'noData';
                            } else {
                                str = res.data[userDefinedKey].length > 0 ? 'success' : 'noData';
                            }
                        } else {
                            str = 'success';
                        }

                    } else {
                        str = 'noData';
                    }
                } else {
                    str = res.data.length > 0 ? 'success' : 'noData';
                }

                this.setState({
                    status: str,
                }, () => {
                    if (str === 'success') {
                        callBack(res.data);
                    }
                });
            }
        }).catch((error) => {
            errorFunc(error);
            this.setState({
                status: 'error',
            });
        }).finally(() => {
            finalFunc()
        });
    }

    renderChildren = () => {
        const {
            color, children,
        } = this.props;
        const {status} = this.state;
        if (status === 'error') {
            return (
                <View style={[styles.flex1, styles.minHeight]}>
                    <TouchableOpacity onPress={this.reload}>
                        <Text style={{
                            color,
                            backgroundColor: 'transparent',
                        }}
                        >
                            请求出错，点击重新获取数据
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        if (status === 'success') {
            return (children);
        }
        if (status === 'noData') {
            return (
                <View style={[styles.flex1, styles.minHeight]}>
                    <Text style={{color, backgroundColor: 'transparent'}}>暂无数据</Text>
                </View>
            );
        }
        return (
            <ActivityIndicator
                style={[styles.flex1, styles.minHeight]}
                color={color || BaseStyle.textItemColor}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderChildren()}
            </View>
        );
    }
}
