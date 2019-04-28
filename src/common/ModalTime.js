import React, {Component} from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import {
    ButtonView, Input, TextView,
} from '@rich/react-native-richway-component';
import moment from 'moment/moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import BaseStyle from '$src/css/BaseStyle';

const styles = StyleSheet.create({
    timePicker: {
        backgroundColor: `#fff`,
        flexDirection: `row`,
        width: `100%`,
        height: 50,
        justifyContent: `space-between`,
        alignItems: `center`,
        paddingHorizontal: 10,
    },
    timeItem: {
        width: `35%`,
        height: 30,
        borderWidth: 1,
        borderColor: `#B6B4B6`,
        borderRadius: 5,
    },
    timeButton: {
        width: `12%`,
        height: 25,
        borderRadius: 5,
        backgroundColor: BaseStyle.themeColor,
        alignItems: `center`,
        justifyContent: `center`,
    },
    timeText: {height: 35, justifyContent: `center`},
    input: {textAlign: `center`},
});

class Page extends Component {
    static propTypes = {
        startTm: PropTypes.string,
        endTm: PropTypes.string,
        callback: PropTypes.func,
    }

    static defaultProps = {
        startTm: moment().add(-1, `days`).format(`YYYY-MM-DD`),
        endTm: moment().format(`YYYY-MM-DD`),
        callback: () => {
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            type: `start`,
            start: props.startTm,
            end: props.endTm,
            date: new Date(),
            isOpen: false,
        };
    }

    closeTime = () => {
        const {callback} = this.props;
        const {start, end} = this.state;
        callback(start, end);
        this.close();
    }

    close = () => {
        this.modal.close();
    }

    open = () => {
        const {isOpen} = this.state;
        if (isOpen) {
            this.modal.close();
        } else {
            this.modal.open();
        }
    }

    onConfirm = (dateTime) => {
        const {type} = this.state;
        if (type === `start`) {
            this.setState({
                isDateTimePickerVisible: false,
                start: moment(dateTime).format(`YYYY-MM-DD`),
            });
        } else {
            this.setState({
                isDateTimePickerVisible: false,
                end: moment(dateTime).format(`YYYY-MM-DD`),
            });
        }
    }

    end = () => {
        const {end} = this.state;
        this.setState({
            isDateTimePickerVisible: true,
            type: `end`,
            date: new Date(moment(end)),
        });
    }

    start = () => {
        const {start} = this.state;
        this.setState({
            isDateTimePickerVisible: true,
            type: `start`,
            date: new Date(moment(start)),
        });
    }

    render() {
        const {start, end, date} = this.state;
        const {isDateTimePickerVisible} = this.state;
        return (
            <Modal
                ref={(v) => {
                    this.modal = v;
                }}
                style={styles.timePicker}
                position="top"
                entry="top"
                onClosed={() => this.setState({isOpen: false})}
                onOpened={() => this.setState({isOpen: true})}
                backdropOpacity={0.5}
                backButtonClose
            >
                <ButtonView
                    onPress={this.start}
                    style={styles.timeItem}
                >
                    <Input
                        placeholder="选择开始时间"
                        editable={false}
                        style={styles.input}
                        value={start}
                    />
                </ButtonView>
                <View style={styles.timeText}>
                    <TextView>至</TextView>
                </View>
                <ButtonView
                    onPress={this.end}
                    style={styles.timeItem}
                >
                    <Input
                        placeholder="选择开始时间"
                        editable={false}
                        style={styles.input}
                        value={end}
                    />
                </ButtonView>
                <ButtonView
                    style={styles.timeButton}
                    onPress={this.closeTime}
                >
                    <TextView style={{color: `#fff`, fontSize: 11}}>确定</TextView>
                </ButtonView>
                <DateTimePicker
                    isVisible={isDateTimePickerVisible}
                    cancelTextIOS="取消"
                    confirmTextIOS="确定"
                    titleIOS="选择日期"
                    date={date}
                    onConfirm={this.onConfirm}
                    maximumDate={new Date()}
                    onCancel={() => this.setState({isDateTimePickerVisible: false})}
                />
            </Modal>
        );
    }
}

export default Page;
