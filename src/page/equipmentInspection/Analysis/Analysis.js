import React, {Component} from 'react';
import {
    View, StyleSheet, ImageBackground, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    ButtonView, Header, StatusView,
} from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {inject} from 'mobx-react/index';
import _ from 'lodash';

import BaseStyle from '$src/css/BaseStyle';
// import AnalysisBackground from '$src/image/AnalysisBackground.jpg';
import ContainerView from './ContainerView';
import IntegrityLineChart from './IntegrityLineChart';
import Service from '$src/common/Service';
import {get} from '$src/common/Fetch';
import ModalTime from '$src/common/ModalTime';
import GroupChart from './GroupChart';
import Circle from './Circle';
import List from './List';
import CircleChart from './CircleChart';

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    rightView: {
        paddingRight: 10,
        height: '100%',
        justifyContent: 'center',
    },
    circleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
});

@inject(['user'])
class Page extends Component {
    static propTypes = {
        user: PropTypes.object,
        newWarnY1: PropTypes.string,
        newWarnY2: PropTypes.string,
    }

    static defaultProps = {
        user: {},
        newWarnY1: '',
        newWarnY2: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            // 必设信息完整度
            IntegrityY: [],
            IntegrityX: [],
            // 当前产生预警站点
            NewWarnSegY: [],
            NewWarnGaugeY: [],
            NewWarnX: [],
            // 本月累计预警
            circleArr: [],
            // 站点异常
            abNormalCircle: [{
                zb: 0,
                marker: '异常站点：0个',
            }, {
                zb: 0,
                marker: '正常站点：0个',
            }],
            abNormalArr: [],

            scroll: true,
            startTm: moment().add(-1, 'days').format('YYYY-MM-DD'),
            endTm: moment().format('YYYY-MM-DD'),
            groupName: [{name: '水域预警'}, {name: '水尺预警'}],
        };
        const {startTm, endTm} = this.state;
        this.params = {
            appId: props.user.user.appId,
            startTm,
            endTm,
        };
    }

    componentDidMount() {

    }

    callbackIntegrity = (data) => {
        const Y = [];
        const X = [];
        data.result.forEach((item) => {
            const str = item.value;
            const value = str.substr(0, str.length - 1);
            Y.push({y: Number(value), marker: `${item.name}:${str}`});
            X.push(item.name);
        });
        this.setState({
            IntegrityY: Y,
            IntegrityX: X,
        });
    }

    callbackNewWarn = (data) => {
        const Seg = [];
        const Gauge = [];
        const X = [];
        data.st.forEach((item) => {
            const viwWaterSeg = (item.model[data.keyName[0].key] === null
                ? null
                : Number(item.model[data.keyName[0].key]));
            const viwWaterGauge = (item.model[data.keyName[1].key] === null
                ? null
                : Number(item.model[data.keyName[1].key]));
            Seg.push({
                y: viwWaterSeg,
                marker: `${item.stnm}:${viwWaterSeg === null ? '--' : viwWaterSeg}`,
            });
            Gauge.push({
                y: viwWaterGauge,
                marker: `${item.stnm}:${viwWaterGauge === null ? '--' : viwWaterGauge}`,
            });
            X.push(item.stnm);
        });
        this.setState({
            NewWarnSegY: Seg,
            NewWarnGaugeY: Gauge,
            NewWarnX: X,
            groupName: data.keyName,
        });
    }

    callbackNowMount = (data) => {
        const arr = [];
        data.viw.forEach((item) => {
            const obj = {
                warn: item.counts,
                mount: item.allCounts,
                name: item.modelnm,
            };
            arr.push(obj);
        });
        this.setState({
            circleArr: arr,
        });
    }

    callbackAbnormal = (data) => {
        const arrObj = [{
            zb: data.execsum,
            marker: `异常站点：${data.execsum}个`,
        }, {
            zb: data.total - data.execsum,
            marker: `正常站点：${data.total - data.execsum}个`,
        }];
        let arr = [];
        if (data.stlist && data.stlist.length > 0) {
            arr = _.reject(data.stlist, (item) => item.reason === null);
        }
        this.setState({
            abNormalCircle: arrObj,
            abNormalArr: arr,
        });
    }

    renderCircle = (circleArr) => {
        const arr = [];
        circleArr.forEach((item, index) => {
            arr.push(
                <Circle key={index} mount={item.mount} warn={item.warn} name={item.name} />,
            );
        });
        return arr;
    }

    open = () => {
        this.ModalTime.open();
    }

    reloadAll = (startTm, endTm) => {
        this.params.startTm = startTm;
        this.params.endTm = endTm;
        this.Circle.reload({params: this.params});
        this.Group.reload({params: this.params});
        this.Integrity.reload({params: this.params});
        this.abNormal.reload({params: this.params});
    }

    render() {
        const {
            IntegrityX,
            IntegrityY,
            NewWarnSegY,
            NewWarnGaugeY,
            NewWarnX,
            circleArr,
            abNormalCircle,
            scroll,
            abNormalArr,
            groupName,
        } = this.state;
        return (
            <View style={BaseStyle.container}>
            <Header
                    title="综合分析"
                    leftView={<View />}
                    rightView={(
                        <ButtonView
                        style={styles.rightView}
                            onPress={this.open}
                      >
                            <Icon name="ios-calendar" size={24} color="white" />
                      </ButtonView>
                    )}
              />
                <View
                style={[BaseStyle.container]}
              >
                <ScrollView
                        style={styles.flex}
                      scrollEnabled={scroll}
                    >
                      <ContainerView title="本月累计预警">
                          <StatusView
                              ref={(v) => {
                                    this.Circle = v;
                                }}
                              getData={(params) => get({url: Service.WarnAnalysisNew, params})}
                              callBack={this.callbackNowMount}
                                params={this.params}
                            >
                                <View style={[styles.circleContainer, {justifyContent: 'space-between'}]}>
                                    {this.renderCircle(circleArr)}
                                </View>
                            </StatusView>
                        </ContainerView>
                        <ContainerView title="当前产生预警站点">
                    <StatusView
                          ref={(v) => {
                                    this.Group = v;
                                }}
                          getData={(params) => get({url: Service.WarnAnalysisNew, params})}
                                callBack={this.callbackNewWarn}
                                params={this.params}
                        >
                                <GroupChart
                                    chartArrX={NewWarnX}
                        chartArrSeg={NewWarnSegY}
                                    chartArrGauge={NewWarnGaugeY}
                        groupName={groupName}
                      />
                            </StatusView>
                  </ContainerView>
                        <ContainerView title="必信息完整度">
                    <StatusView
                                ref={(v) => {
                                    this.Integrity = v;
                                }}
                              getData={(params) => get({url: Service.Integrity, params})}
                              callBack={this.callbackIntegrity}
                              params={this.params}
                            >
                              <IntegrityLineChart chartArrX={IntegrityX} chartArrY={IntegrityY} />
                            </StatusView>
                  </ContainerView>
                      <ContainerView title="站点异常">
                            <StatusView
                                ref={(v) => {
                                    this.abNormal = v;
                                }}
                            getData={(params) => get({url: Service.AbnormalStation, params})}
                                callBack={this.callbackAbnormal}
                            params={this.params}
                          >
                                <View style={styles.circleContainer}>
                                    <CircleChart stations={abNormalCircle} />
                                <List
                                      callback={(bool) => this.setState({scroll: bool})}
                                      data={abNormalArr}
                                    />
                                </View>
                          </StatusView>
                  </ContainerView>
                    </ScrollView>
                    <ModalTime
                        ref={(v) => {
                            this.ModalTime = v;
                        }}
                        callback={this.reloadAll}
                  />
              </View>
          </View>
        );
    }
}

export default Page;
