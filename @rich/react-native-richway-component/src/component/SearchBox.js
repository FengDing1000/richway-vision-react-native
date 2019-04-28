import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from './Input';
import Text from './TextView';
import ButtonView from './ButtonView';
import BaseStyle from '../css/BaseStyle';


const styles = StyleSheet.create({
    container: {
        height: 63,
        justifyContent: 'flex-end',
        // 阴影样式
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: `#000000`,
        elevation: 3,
    },
    header: {
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtInputWrapper: {
        height: 28,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
    },
    cancel: {
        paddingHorizontal: 8,
    },
    searchBtnBox: {
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    IconTextBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class SearchBox extends Component {
    static propTypes = {
        editable: PropTypes.bool,
        placeholder: PropTypes.string,
        filterResult: PropTypes.func,
        leftIcon: PropTypes.func,
        backgroundColor: PropTypes.string,
    }

    static defaultProps = {
        placeholder: '请输入查询信息',
        editable: true,
        filterResult: () => {
        },
        leftIcon: null,
        backgroundColor: BaseStyle.themeColor,
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showClear: false,
        };
    }


    search = () => {
        const {editable, filterResult} = this.props;
        const {value} = this.state;
        if (editable) {
            Keyboard.dismiss();
            filterResult(value);
        }
    }

    clearTxt() {
        const {filterResult} = this.props;
        filterResult('');
        this.setState({value: '', showClear: false});
    }

    changeVal(text) {
        if (text !== '') {
            this.setState({value: text, showClear: true});
        } else {
            this.setState({value: text, showClear: false});
        }
    }

    render() {
        const {showClear, value} = this.state;
        const {leftIcon, placeholder, backgroundColor} = this.props;
        const clear = showClear
            ? <Icon name="md-close-circle" size={15} color={BaseStyle.textItemColor}/>
            : null;
        return (
            <View style={[styles.container, {backgroundColor}]}>
                <View style={styles.header}>
                    {leftIcon ? leftIcon() : null}
                    <View style={[styles.txtInputWrapper, {marginLeft: leftIcon ? 5 : 10}]}>
                        <View style={styles.IconTextBox}>
                            <Icon name="md-search" size={16} color={BaseStyle.textItemColor}/>
                        </View>
                        <Input
                            placeholder={placeholder}
                            onChangeText={text => this.changeVal(text)}
                            value={value}
                            clearButtonMode="never"
                            onSubmitEditing={this.search}
                        />
                        <View style={styles.searchBtnBox}>
                            <ButtonView onPress={() => this.clearTxt()}>
                                {clear}
                            </ButtonView>
                        </View>
                    </View>
                    <View style={styles.cancel}>
                        <ButtonView onPress={this.search}>
                            <Text style={{fontSize: 12, color: '#fff'}}>搜索</Text>
                        </ButtonView>
                    </View>
                </View>
            </View>
        );
    }
}
