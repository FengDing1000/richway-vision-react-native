import React, { Component } from 'react';
import {
    View, StyleSheet, Dimensions, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView } from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import { Svg, Polyline } from 'react-native-svg';
import BaseStyle from '$src/css/BaseStyle';
import { baseImage } from '$src/common/Service';

const { width } = Dimensions.get('window');
const per = (width - 20) / 640;
const styles = StyleSheet.create({
    image: {
        width: (width - 20),
        height: (width - 20) * 0.75,
    },
    stationInformation: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: 'white',
    },
    stationText: {
        color: '#333',
        fontWeight: 'bold',
        width: 120,
    },
    stationContainer: {
        flex: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'space-between',
    },
    layer: {
        width: 120,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    layerContainer: {
        flex: 1,
        marginTop: 10,
    },
    layerImage: {
        borderColor: 'white',
        borderWidth: 0.8,
        flex: 1,
        padding: 5,
        justifyContent: 'center',
    },
    layerText: {
        color: 'white',
        fontSize: 10,
    },
    layerLine: {
        width: 7,
        borderColor: 'white',
        borderBottomWidth: 1,
        borderLeftWidth: 0.8,
        marginTop: 10,
        marginRight: 6,
    },
    little: {
        borderColor: 'white',
        borderTopWidth: 0.8,
        height: 4,
        width: '60%',
    },
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        flexDirection: 'row',
    },
    flex1: {
        flex: 1,
    },
});

class Page extends Component {
    static propTypes = {
        dataArr: PropTypes.object,
    }

    static defaultProps = {
        dataArr: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            fail: false,
        };
    }

    componentDidMount() {

    }


    showLayer = () => {
        const { dataArr } = this.props;
        if (dataArr.objects && dataArr.objects[0].points) {
        // dataArr.objects[0].points.forEach((arr, indexArr) => {
            let points = '';
            dataArr.objects[0].points.forEach((item, index) => {
                const str = `${item[0] * per},${item[1] * per}`;
                if ((index + 1) < dataArr.objects[0].points.length) {
                    points += (`${str} `);
                } else {
                    points += (`${str}`);
                }
            });
            const polyLine = (
              <Polyline
                  points={points}
                  fill="none"
                  stroke="yellow"
                  strokeWidth="1"
                />
            );
            return (
              <View style={[styles.image, { position: 'absolute', top: 0, left: 0 }]}>
                    <Svg
                        width={(width - 20)}
                        height={(width - 20) * 0.75}
                >
                  {polyLine}
                </Svg>
                </View>
            );
        }
        return null;
    }

    render() {
        const { dataArr } = this.props;
        const { fail } = this.state;
        return (
          <View style={[styles.image, { marginVertical: 5 }]}>
              {fail ? (
                  <View style={styles.flex}>
                      <Icon name="ios-help-circle" size={20} color={BaseStyle.valueItemColor} />
                        <TextView style={{ marginLeft: 8 }}>加载失败</TextView>
                    </View>
                ) : (
                  <View style={styles.flex1}>
                      <Image
                          source={{ uri: baseImage + dataArr.file_cd_orig }}
                          style={styles.image}
                          onError={() => this.setState({ fail: true })}
                        />
                      {this.showLayer()}
                    </View>
                )}
            </View>
        );
    }
}

export default Page;
