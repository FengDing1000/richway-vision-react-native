import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Keyboard
} from "react-native";
import PropTypes from "prop-types"
import Icon from "react-native-vector-icons/Ionicons";
import Input from "./Input";
import ButtonView from "./ButtonView";
import TextView from "./TextView";
import BaseStyle from "../css/BaseStyle";

export default class SearchInput extends Component {
    static propTypes = {
        editable: PropTypes.bool,
        placeholder: PropTypes.string,
        filterResult: PropTypes.func,
        leftIcon: PropTypes.func,
    }

    static defaultProps = {
        placeholder: "请输入查询信息",
        editable: true,
        filterResult: () => {
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showClear: false,
        }
    }


    changeVal(text) {
        if (text !== '') {
            this.setState({value: text, showClear: true});
        } else {
            this.setState({value: text, showClear: false});
        }
    }

    clearTxt() {
        this.props.filterResult("");
        this.setState({value: "", showClear: false});
    }

    search = () => {
        if (this.props.editable) {
            Keyboard.dismiss();
            this.props.filterResult(this.state.value);
        }

    }

    render() {
        let v = this.state.showClear ?
            <Icon name={'md-close-circle'} size={15} color={BaseStyle.textItemColor}/> :
            null;
        return (
            <View style={styles.header}>
                {this.props.leftIcon ? this.props.leftIcon() : null}
                <View style={[styles.txtInputWrapper, {marginLeft: this.props.leftIcon ? 0 : 10}]}>
                    <View style={styles.IconTextBox}>
                        <Icon name={'md-search'} size={16} color={BaseStyle.textItemColor}/>
                    </View>
                    <Input
                        placeholder={this.props.placeholder}
                        onChangeText={(text) => this.changeVal(text)}
                        value={this.state.value}
                        clearButtonMode={'never'}
                        onSubmitEditing={this.search}
                    />
                    <View style={styles.searchBtnBox}>
                        <ButtonView onPress={() => this.clearTxt()}>
                            {v}
                        </ButtonView>
                    </View>
                </View>
                <View style={styles.cancel}>
                    <ButtonView onPress={this.search}>
                        <TextView style={{fontSize: 12, color: BaseStyle.textItemColor}}>搜索</TextView>
                    </ButtonView>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    header: {
        height: 45,
        flexDirection: "row",
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 0.8,
        alignItems: 'center',
    },
    txtInputWrapper: {
        height: 30,
        flexDirection: 'row',
        borderRadius: 3,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
    },
    cancel: {
        paddingHorizontal: 8
    },
    searchBtnBox: {
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchbtn: {
        fontFamily: 'iconfont',
        fontSize: 20
    },
    IconText: {
        fontFamily: 'iconfont',
        fontSize: 12,
        color: BaseStyle.textItemColor
    },
    IconTextBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
