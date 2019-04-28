import React, { Component } from 'react';
import {
    View, StyleSheet, processColor,
} from 'react-native';
import PropTypes from 'prop-types';
import { BarChart } from 'react-native-charts-wrapper';
import update from 'immutability-helper';
import _ from 'lodash';
import { TextView } from '@rich/react-native-richway-component';
import BaseStyle from '$src/css/BaseStyle';

const styles = StyleSheet.create({
    chart: {
        flex: 1,
    },
});

class Page extends Component {
    static propTypes = {
        chartArrSeg: PropTypes.array,
        chartArrGauge: PropTypes.array,
        chartArrX: PropTypes.array,
        groupName: PropTypes.array,
    }

    static defaultProps = {
        chartArrSeg: [],
        chartArrGauge: [],
        chartArrX: [],
        groupName: [{ name: '水域预警' }, { name: '水尺预警' }],
    }

    constructor(props) {
        super(props);
        this.state = {
            legend: {
                enabled: true,
                textSize: 12,
                form: 'CIRCLE',
                formSize: 12,
                xEntrySpace: 10,
                yEntrySpace: 5,
                wordWrapEnabled: true,
                textColor: processColor(BaseStyle.textItemColor),
            },
            data: {},
            xAxis: {},
            yAxis: {
                right: {
                    axisMinimum: 0,
                    textColor: processColor(BaseStyle.textItemColor),
                    textSize: 10,
                    gridColor: processColor(BaseStyle.border.borderColor),
                    gridLineWidth: 1,
                    axisLineColor: processColor(BaseStyle.border.borderColor), // y轴颜色
                    granularity: 1,
                },
                left: {
                    axisMinimum: 0,
                    granularity: 1,
                    textColor: processColor(BaseStyle.textItemColor),
                    textSize: 10,
                    gridColor: processColor(BaseStyle.border.borderColor),
                    gridLineWidth: 1,
                    axisLineColor: processColor(BaseStyle.border.borderColor), // y轴颜色
                },
            },
            marker: {
                enabled: true,
                markerColor: processColor('#F0C0FF8C'),
                textColor: processColor('white'),
                markerFontSize: 14,
            },
        };
    }

    componentWillReceiveProps(newProps) {
        const { chartArrSeg, chartArrGauge, chartArrX } = this.props;
        if (
            chartArrX !== newProps.chartArrX
            || chartArrSeg !== newProps.chartArrSeg
            || chartArrGauge !== newProps.chartArrGauge
        ) {
            const { state } = this;
            this.setState(
                update(state, {
                    data: {
                        $set: {
                            dataSets: [{
                                values: newProps.chartArrSeg,
                                label: newProps.groupName[0].name,
                                config: {
                                    drawValues: false,
                                    colors: [processColor('#CCCC66')],
                                    highlightAlpha: 0,
                                },
                            }, {
                                values: newProps.chartArrGauge,
                                label: newProps.groupName[1].name,
                                config: {
                                    drawValues: false,
                                    colors: [processColor('#3366CC')],
                                    highlightAlpha: 0,
                                },
                            }],
                            config: {
                                barWidth: 0.3,
                                group: {
                                    fromX: 0,
                                    groupSpace: 0.2,
                                    barSpace: 0.1,
                                },
                            },
                        },
                    },
                    xAxis: {
                        $set: {
                            valueFormatter: newProps.chartArrX,
                            granularityEnabled: true,
                            axisMinimum: 0,
                            axisMaximum: newProps.chartArrX.length,
                            granularity: 1,
                            centerAxisLabels: true,
                            position: 'BOTTOM',
                            textColor: processColor(BaseStyle.textItemColor),
                            textSize: 10,
                            gridColor: processColor(BaseStyle.border.borderColor),
                            gridLineWidth: 1,
                            axisLineColor: processColor(BaseStyle.textItemColor),
                            axisLineWidth: 0.6,
                        },
                    },
                }),
            );
        }
    }


    render() {
        const {
            data, xAxis, yAxis, marker, legend,
        } = this.state;
        const { chartArrSeg, chartArrGauge } = this.props;
        const rejectSeg = _.reject(chartArrSeg, (x) => (x === null));
        const rejectGauge = _.reject(chartArrGauge, (x) => (x === null));
        return (
          <View style={{ flex: 1 }}>
              {(rejectSeg.length > 0 || rejectGauge.length > 0) ? (
                  <BarChart
                  style={styles.chart}
                  data={data}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  borderColor={processColor(BaseStyle.textItemColor)}
                  borderWidth={0.4}
                  drawBorders
                  chartDescription={{ text: '' }}
                  visibleRange={{ x: { min: 6, max: 6 } }}
                  marker={marker}
                  legend={legend}
                  animation={{
                            durationY: 1500,
                            easingY: 'EaseInOutQuart',
                            easingX: 'EaseInOutQuart',
                        }}
                />
                ) : (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <TextView>无数据展示</TextView>
                    </View>
                )}
            </View>
        );
    }
}

export default Page;
