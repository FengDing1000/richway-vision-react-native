import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions, ScrollView,
} from 'react-native';
import {inject} from 'mobx-react/index';
import PropTypes from 'prop-types';
import {
    ButtonView, Header, StatusView, TextView, Dialog,
} from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment/moment';
import Carousel from 'react-native-looped-carousel';
import {withNavigation} from 'react-navigation';
import BaseStyle from '$src/css/BaseStyle';
// import Item from '../../page/Home/scrollPage/Item';
import Service from '../Service';
import {put, get} from '../Fetch';
import ImageItem from './ImageItem';
import ImageWater from './ImageWater';
import Toast from '../Toast';
import ImageDetect from './ImageDetect';
import RubbishWater from './RubbishWater';

const {width} = Dimensions.get(`window`);
const styles = StyleSheet.create({
    buttonView: {
        height: `100%`,
        justifyContent: `center`,
        paddingRight: 10,
    },
    titleContainer: {
        height: 38,
        width: `100%`,
        flexDirection: `row`,
        paddingHorizontal: 10,
        alignItems: `center`,
        justifyContent: `space-between`,
        backgroundColor: `white`,
        borderColor: `#f5f5f5`,
        borderBottomWidth: 1,
    },
    title: {
        flexDirection: `row`,
        height: 60,
        alignItems: `center`,
        paddingHorizontal: 10,
        backgroundColor: `white`,
        borderBottomWidth: 0.8,
        borderColor: `#f5f5f5`,
    },
    stationInformation: {
        flexDirection: `row`,
        justifyContent: `center`,
        paddingTop: 10,
        backgroundColor: `white`,
    },
    stationText: {
        color: `#333`,
        fontWeight: `bold`,
        marginBottom: 10,
        width: 120,
    },
    stationContainer: {
        flex: 1,
        alignItems: `center`,
    },
    icon: {
        fontSize: 22,
        color: BaseStyle.textItemColor,
        marginRight: 8,
    },
    selectTime: {
        height: 23,
        paddingHorizontal: 8,
        justifyContent: `center`,
        backgroundColor: BaseStyle.themeColor,
        borderRadius: 3,
    },
    image: {
        width,
        // height: width * 0.5625 + 60,
        marginVertical: 8,
    },
    button: {
        borderWidth: 0.8,
        borderColor: BaseStyle.themeColor,
        borderRadius: 5,
        width: 80,
        height: 32,
        justifyContent: `center`,
        alignItems: `center`,
        marginLeft: 30,
    },
});

@inject([`user`])
class Page extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        URL: PropTypes.string,
        detailRouter: PropTypes.string,
        showRight: PropTypes.bool,
    }

    static defaultProps = {
        navigation: {},
        URL: ``,
        detailRouter: ``,
        showRight: true,
    }

    constructor(props) {
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            isDateTimePickerVisible: false,
            date: new Date(moment(params.tm)),
            // start: moment().format('YYYY-MM-DD'),
            queryTime: moment(params.tm).minute(0).format(`YYYY-MM-DD`),
            loopImage: [],
            warnMessage: {},
        };
    }

    componentDidMount() {
    }

    headerPress = () => {
        const {navigation, detailRouter} = this.props;
        const {params} = navigation.state;
        const {date, queryTime} = this.state;
        params.dateDetail = date;
        params.queryDetail = queryTime;
        navigation.navigate(detailRouter, navigation.state.params);
    }

    onConfirm = (dateTime) => {
        this.setState({
            isDateTimePickerVisible: false,
            // start: moment(dateTime).format('YYYY-MM-DD'),
            date: dateTime,
            queryTime: moment(dateTime).minute(0).format(`YYYY-MM-DD`),
        }, () => {
            const {navigation} = this.props;
            const {params} = navigation.state;
            const {queryTime} = this.state;
            this.custom.reload({
                measid: params.mid,
                stm: queryTime,
            });
        });
    }

    callback = (data) => {
        const {navigation} = this.props;
        const {params} = navigation.state;
        const arr = [];
        if (data && data[0] && data[0].modelList && data[0].modelList.length === 0) {
            this.custom.setState({
                status: `noData`,
            });
            return;
        }
        // 宽高比例
        let proportion = 0.5625;
        data.forEach((item, index) => {
            const CarouselArr = [];
            if (item.model.indexOf(`watergauge`) !== -1) { // 水尺
                proportion = 0.75;
                item.modelList.forEach((ItemImage) => {
                    const obj = ItemImage;
                    obj.gauge_threshold = params.gauge_threshold;
                    CarouselArr.push(<ImageItem dataArr={obj} key={ItemImage.fileCdOrig} name={params.nm}/>);
                });
            } else if (item.model.indexOf(`waterarea`) !== -1) { // 水域
                proportion = 0.75;
                item.modelList.forEach((ItemImage) => {
                    CarouselArr.push(<ImageWater dataArr={ItemImage} key={ItemImage.fileCdOrig}/>);
                });
            } else if (item.model.indexOf(`viw_secchi_detect`) !== -1) { // 垃圾漂浮物
                proportion = 0.75;
                item.modelList.forEach((ItemImage) => {
                    CarouselArr.push(<ImageDetect dataArr={ItemImage} key={ItemImage.fileCdOrig}/>);
                });
            } else if (item.model.indexOf(`viw_rubbish_seg`) !== -1) { // 垃圾漂浮物
                proportion = 0.75;
                item.modelList.forEach((ItemImage) => {
                    CarouselArr.push(<RubbishWater dataArr={ItemImage} key={ItemImage.fileCdOrig}/>);
                });
            }
            if (CarouselArr.length > 0) {
                arr.push(
                    <Carousel
                        style={[styles.image, {height: width * proportion + 60}]}
                        key={index}
                        autoplay={false}
                        pageInfo
                        pageInfoTextStyle={{color: `white`}}
                        pageInfoBackgroundColor="rgba(0, 0, 0, 0.3)"
                    >
                        {CarouselArr}
                    </Carousel>,
                );
            }
        });
        let warnMessage = {};
        if (data && data[0] && data[0].wrnList && data[0].wrnList[0]) {
            [warnMessage] = data[0].wrnList;
        }
        this.setState({
            loopImage: arr,
            warnMessage,
        });
    }

    closeWarn = () => {
        const {navigation} = this.props;
        const {warnMessage} = this.state;
        Dialog.open({
            text: `是否关闭预警？`,
            ok: () => {
                put({
                    url: Service.DeleteWarn,
                    params: {
                        warnId: warnMessage.id,
                    },
                }).then(() => {
                    Toast(`关闭预警成功`);
                    navigation.goBack();
                }).catch(() => {
                    Toast(`关闭预警失败`);
                });
            },
        });
    }

    render() {
        const {navigation, URL, showRight} = this.props;
        const {params} = navigation.state;
        const {
            isDateTimePickerVisible, date, queryTime, loopImage, warnMessage,
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                <Header
                    title={navigation.state.params.nm}
                    rightView={showRight ? (
                        <ButtonView
                            style={styles.buttonView}
                            onPress={this.headerPress}
                        >
                            <TextView style={{color: `white`}}>详情信息</TextView>
                        </ButtonView>
                    ) : null}
                />

                <View style={{flex: 1}}>
                    <View style={styles.titleContainer}>
                        <TextView>识别图像结果</TextView>
                        <View style={{flexDirection: `row`, alignItems: `center`}}>
                            <Icon name="md-calendar" style={styles.icon}/>
                            <ButtonView
                                onPress={() => this.setState({isDateTimePickerVisible: true})}
                                style={styles.selectTime}
                            >
                                <TextView style={{color: `white`}}>{queryTime}</TextView>
                            </ButtonView>
                        </View>
                    </View>
                    <StatusView
                        ref={(v) => {
                            this.custom = v;
                        }}
                        getData={(data) => get({url: URL, params: data})}
                        callBack={this.callback}
                        params={{
                            measid: params.measid,
                            stm: queryTime,
                        }}
                    >
                        <ScrollView style={{flex: 1}}>
                            {loopImage}
                        </ScrollView>
                    </StatusView>
                    {warnMessage.id ? (
                        <View style={styles.title}>
                            <View style={{flex: 1}}>
                                <TextView style={{color: BaseStyle.title}}>{`预警：${warnMessage.nm}`}</TextView>
                                <TextView style={{color: BaseStyle.textItemColor, fontSize: 12, marginTop: 8}}>
                                    {`最近预警：${warnMessage.startTm}`}
                                </TextView>
                            </View>
                            <ButtonView
                                style={styles.button}
                                onPress={this.closeWarn}
                            >
                                <TextView style={{color: BaseStyle.themeColor}}>关闭预警</TextView>
                            </ButtonView>
                        </View>
                    ) : null}
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
                    onCancel={() => this.setState({isDateTimePickerVisible: false})}
                />
            </View>
        );
    }
}

export default withNavigation(Page);
