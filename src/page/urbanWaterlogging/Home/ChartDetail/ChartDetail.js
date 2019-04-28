import React, { Component } from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { ButtonView, Header, TextView } from '@rich/react-native-richway-component';
import StatusView from '@rich/react-native-richway-component/src/component/StatusView';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import BaseStyle from '$src/css/BaseStyle';
import { get } from '$src/common/Fetch';
import Service from '$src/common/Service';
import Chart from './Chart';
import List from './List';

const styles = StyleSheet.create({
    title: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
    },
    icon: {
        fontSize: 22,
        color: BaseStyle.valueItemColor,
        marginRight: 8,
    },
    selectTime: {
        height: 28,
        paddingHorizontal: 8,
        justifyContent: 'center',
        backgroundColor: BaseStyle.themeColor,
        borderRadius: 3,
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
            chartX: [],
            chartY: [],
            data: [],
            isDateTimePickerVisible: false,
            date: params.dateDetail,
            queryTime: params.queryDetail,
        };
    }

    componentDidMount() {

    }

    callback = (res) => {
        const chartX = [];
        const chartY = [];
        res.forEach((item) => {
            const time = moment(item.tm).format('HH:mm');
            const obj = {
                y: item.gaugeRz,
                marker: (`${time} 水位：${item.gaugeRz !== null ? item.gaugeRz : '--'}m`),
            };
            chartX.push(time);
            chartY.push(obj);
        });
        this.setState({ chartX, chartY, data: res });
    }

    onConfirm = (dateTime) => {
        this.setState({
            isDateTimePickerVisible: false,
            date: dateTime,
            queryTime: moment(dateTime).format('YYYY-MM-DD'),
        }, () => {
            const { navigation } = this.props;
            const {
                queryTime,
            } = this.state;
            this.custom.reload({
                params: {
                    dataSrcId: navigation.state.params.mid,
                    model: 'viw_water_gauge_tongsha',
                    labelMark: 'ruler',
                    stm: queryTime,
                },
            });
        });
    }

    render() {
        const { navigation } = this.props;
        const {
            chartX, chartY, data, isDateTimePickerVisible, start, date, queryTime,
        } = this.state;
        return (
          <View style={BaseStyle.container}>
              <Header
                  title={navigation.state.params.nm}
                />
              <View style={BaseStyle.content}>
                  <View style={styles.title}>
                      <TextView style={{ color: BaseStyle.title }}>{`预警站点：${navigation.state.params.nm}`}</TextView>
                      <TextView style={{ color: BaseStyle.textItemColor, fontSize: 12, marginTop: 8 }}>
                          {`上次报送：${navigation.state.params.tm}`}
                        </TextView>
                    </View>
                  <View style={styles.titleContainer}>
                      <TextView>水位/水深过程线</TextView>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                            name="md-calendar"
                            style={styles.icon}
                          />
                      <ButtonView
                            onPress={() => this.setState({
                                    isDateTimePickerVisible: true,
                                })}
                            style={styles.selectTime}
                          >
                            <TextView style={{ color: 'white' }}>{queryTime}</TextView>
                          </ButtonView>
                    </View>
                    </View>
                  <StatusView
                      ref={(v) => {
                            this.custom = v;
                        }}
                      getData={(params) => get({ url: Service.ChartDetail, params })}
                      callBack={this.callback}
                      params={{
                            dataSrcId: navigation.state.params.mid,
                            model: 'viw_water_gauge_tongsha',
                            labelMark: 'ruler',
                            stm: queryTime,
                        }}
                    >
                        <View style={{ flex: 1 }}>
                      <Chart chartArrX={chartX} chartArrY={chartY} dw="水尺水深(m)" />
                      <View style={[styles.titleContainer, { marginTop: 10 }]}>
                              <TextView>水位历史读数</TextView>
                                <View />
                            </View>
                      <List data={data} />
                    </View>
                    </StatusView>
                </View>
              <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  cancelTextIOS="取消"
                  confirmTextIOS="确定"
                  titleIOS="选择日期"
                  date={date}
                  mode="date"
                  onConfirm={this.onConfirm}
                  maximumDate={new Date()}
                  onCancel={() => this.setState({ isDateTimePickerVisible: false })}
                />
            </View>
        );
    }
}

export default Page;
