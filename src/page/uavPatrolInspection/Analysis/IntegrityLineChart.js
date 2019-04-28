import React, { Component } from 'react';
import {
    View, StyleSheet, processColor,
} from 'react-native';
import PropTypes from 'prop-types';
import { HorizontalBarChart } from 'react-native-charts-wrapper';
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
        chartArrY: PropTypes.array,
        chartArrX: PropTypes.array,
    }

    static defaultProps = {
        chartArrY: [],
        chartArrX: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {

            },
            xAxis: {

            },
            yAxis: {

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
        const { chartArrY, chartArrX } = this.props;
        if (chartArrX !== newProps.chartArrX || chartArrY !== newProps.chartArrY) {
            const { state } = this;
            this.setState(
                update(state, {
                    data: {
                        $set: {
                            dataSets: [{
                                values: newProps.chartArrY,
                                label: '',
                                config: {
                                    color: processColor('#6699CC'),
                                    highlightAlpha: 0,
                                    drawValues: false,
                                },
                            }],
                            config: {
                                barWidth: 0.3,
                            },
                        },
                    },
                    xAxis: {
                        $set: {
                            valueFormatter: newProps.chartArrX,
                            position: 'BOTTOM',
                            granularityEnabled: true,
                            granularity: 1,
                            labelCount: 10,
                            textColor: processColor(BaseStyle.textItemColor),
                            textSize: 10,
                            gridColor: processColor(BaseStyle.border.borderColor),
                            gridLineWidth: 1,
                            axisLineColor: processColor(BaseStyle.textItemColor),
                            axisLineWidth: 0.6,
                        },
                    },
                    yAxis: {
                        $set: {
                            right: {
                                axisMinimum: 0,
                                axisMaximum: 100,
                                granularity: 10,
                                textColor: processColor(BaseStyle.textItemColor),
                                textSize: 10,
                                gridColor: processColor(BaseStyle.border.borderColor),
                                gridLineWidth: 1,
                                axisLineColor: processColor(BaseStyle.border.borderColor),
                            },
                            left: {
                                axisMinimum: 0,
                                axisMaximum: 100,
                                granularity: 10,
                                textColor: processColor(BaseStyle.textItemColor),
                                textSize: 10,
                                gridColor: processColor(BaseStyle.border.borderColor),
                                gridLineWidth: 1,
                                axisLineColor: processColor(BaseStyle.border.borderColor),
                            },
                        },
                    },
                }),
            );
        }
    }


    render() {
        const {
            data, xAxis, yAxis, marker,
        } = this.state;
        const { chartArrY } = this.props;
        const reject = _.reject(chartArrY, (x) => (x === null));
        return (
          <View style={{ flex: 1 }}>
              {reject.length > 0 ? (
                  <HorizontalBarChart
                  style={styles.chart}
                  data={data}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  legend={{ enabled: false }}
                  marker={marker}
                  borderColor={processColor(BaseStyle.textItemColor)}
                  borderWidth={0.4}
                  drawBorders
                  chartDescription={{ text: '' }}
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
