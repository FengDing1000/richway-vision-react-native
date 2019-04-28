import React, { Component } from 'react';
import {
    StyleSheet,
    processColor, View,
} from 'react-native';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { LineChart } from 'react-native-charts-wrapper';
import { TextView } from '@rich/react-native-richway-component';
import BaseStyle from '$src/css/BaseStyle';


const styles = StyleSheet.create({
    chart: {
        width: '100%',
        height: 170,
    },
    title: {
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        paddingHorizontal: 10,
        top: 6,
    },
});

class Chart extends Component {
    static propTypes = {
        chartArrX: PropTypes.array,
        chartArrY: PropTypes.array,
        dw: PropTypes.string,
    }

    static defaultProps = {
        chartArrX: [],
        chartArrY: [],
        dw: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            xAxis: {},
            yAxis: {},
            marker: {
                enabled: true,
                digits: 2,
                backgroundTint: processColor('teal'),
                markerColor: processColor('#F0C0FF8C'),
                textColor: processColor('white'),
                width: 100,
            },
            dw: props.dw,
        };
    }

    componentWillReceiveProps(newProps) {
        const { chartArrY, chartArrX } = this.props;
        if (chartArrX !== newProps.chartArrX && chartArrY !== newProps.chartArrY) {
            const reject = _.reject(newProps.chartArrY, (x) => (x === null));
            if (reject.length === 0) {
                return;
            }
            const { state } = this;
            let circle = true;
            if (reject.length > 1) {
                circle = false;
            }
            const X = newProps.chartArrX;
            const Y = newProps.chartArrY;
            this.setState(
                update(state, {
                    data: {
                        $set: {
                            dataSets: [{
                                values: Y,
                                label: '',
                                config: {
                                    lineWidth: 1.5,
                                    drawCircles: circle,
                                    circleRadius: 3,
                                    drawCubicIntensity: 1,
                                    drawCubic: true,
                                    drawHighlightIndicators: false,
                                    color: processColor('#66A7E8'),
                                    drawFilled: true,
                                    drawValues: false,
                                },
                            }],
                        },
                    },
                    xAxis: {
                        $set: {
                            valueFormatter: X,
                            textColor: processColor(BaseStyle.textItemColor),
                            textSize: 10,
                            gridColor: processColor(BaseStyle.border.borderColor),
                            gridLineWidth: 1,
                            axisLineColor: processColor(BaseStyle.textItemColor),
                            axisLineWidth: 0.6,
                            labelCount: X.length > 10 ? 10 : X.length,
                            granularityEnabled: true,
                            granularity: 1,
                            position: 'BOTTOM',
                        },
                    },
                    yAxis: {
                        $set: {
                            left: {
                                textColor: processColor(BaseStyle.textItemColor),
                                textSize: 10,
                                gridColor: processColor(BaseStyle.border.borderColor),
                                gridLineWidth: 1,
                                axisLineColor: processColor(BaseStyle.border.borderColor), // y轴颜色
                            },
                            right: {
                                enabled: false,
                            },
                        },
                    },
                    dw: { $set: newProps.dw },
                }),
            );
        }
    }

    render() {
        const {
            data, xAxis, yAxis, marker, dw,
        } = this.state;
        const { chartArrY } = this.props;
        const reject = _.reject(chartArrY, (x) => (x === null));
        return (
          <View style={styles.chart}>
              {
                    reject.length > 0 ? (
                      <View
                          style={{
                                flex: 1,
                                paddingHorizontal: 20,
                            }}
                        >
                          <View style={styles.title}>
                                <TextView style={{ color: BaseStyle.textItemColor, fontSize: 10 }}>{dw}</TextView>
                            </View>
                            <LineChart
                          style={{ flex: 1, marginTop: 15 }}
                          data={data}
                          chartDescription={{ text: '' }}
                          xAxis={xAxis}
                          yAxis={yAxis}
                          marker={marker}
                          legend={{ enabled: false }}
                          animation={{
                                    durationY: 1500,
                                    easingY: 'EaseInOutQuart',
                                    easingX: 'EaseInOutQuart',
                                }}
                        />
                        </View>
                    ) : (
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                          <TextView>无数据展示</TextView>
                        </View>
                    )
                }
            </View>
        );
    }
}


export default Chart;
