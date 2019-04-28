import React, { Component } from 'react';
import {
    StyleSheet, processColor, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-charts-wrapper';
import { TextView } from '@rich/react-native-richway-component';

const styles = StyleSheet.create({
    chart: {
        height: 130,
        width: 130,
    },
    container: {
        height: 170,
        width: 150,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    legend: {
        flexDirection: 'row',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    icon: {
        width: 18,
        height: 12,
        borderRadius: 5,
        marginRight: 3,
    },
    text: {
        fontSize: 10,
    },
});

class Page extends Component {
    color = ['#FFA019', '#A0A7E6']

    static propTypes = {
        stations: PropTypes.array,
    }

    static defaultProps = {
        stations: [],
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    processColor = () => {
        const arr = [];
        this.color.forEach((item) => {
            arr.push(processColor(item));
        });
        return arr;
    }

    setData = (data) => {
        const arr = [];
        data.forEach((item) => {
            arr.push({
                value: item.zb,
                marker: item.marker,
            });
        });
        const obj = {
            data: {
                dataSets: [{
                    values: arr,
                    label: '',
                    config: {
                        colors: this.processColor(),
                        sliceSpace: 5,
                        selectionShift: 13,
                        drawValues: false, // 是否在头部注明 值，
                    },
                }],
            },
        };
        return obj;
    }

    render() {
        const { stations } = this.props;
        const { data } = this.setData(stations);
        return (
          <View style={styles.container}>
              <PieChart
                  style={styles.chart}
                    logEnabled
                  chartDescription={{ text: '' }}
                  data={data}
                  legend={{ enabled: false }}
                    rotationEnabled
                  rotationAngle={0}
                  usePercentValues
                  holeRadius={70}
                  holeColor={processColor('#f0f0f000')}
                  transparentCircleRadius={0}
                  maxAngle={360}
                  animation={{
                        durationX: 1500,
                        durationY: 1500,
                        easingY: 'EaseInOutQuart',
                    }}
                  marker={{
                        enabled: true,
                        markerColor: processColor('#F0C0FF8C'),
                        textColor: processColor('white'),
                        markerFontSize: 10,
                    }}
                />
              <View style={styles.legend}>
                  <View style={styles.legendItem}>
                      <View style={[styles.icon, { backgroundColor: this.color[0] }]} />
                      <TextView style={styles.text}>异常</TextView>
                    </View>
                  <View style={styles.legendItem}>
                      <View style={[styles.icon, { backgroundColor: this.color[1] }]} />
                      <TextView style={styles.text}>正常</TextView>
                    </View>
                </View>
            </View>
        );
    }
}

export default Page;
