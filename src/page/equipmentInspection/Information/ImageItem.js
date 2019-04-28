import React, { Component } from 'react';
import {
    View, StyleSheet, Dimensions, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView } from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import { baseImage } from '$src/common/Service';
import BaseStyle from '$src/css/BaseStyle';

const { width } = Dimensions.get('window');
const per = (width - 20) / 1920;
const styles = StyleSheet.create({
    image: {
        width: (width - 20),
        height: (width - 20) * 0.5625,
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
        position: 'absolute',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    layerContainer: {
        height: '100%',
        justifyContent: 'flex-end',
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
        width: 8,
        borderColor: 'white',
        borderBottomWidth: 1,
        borderLeftWidth: 0.8,
        marginRight: 6,
    },
    little: {
        borderColor: 'white',
        borderTopWidth: 0.8,
        height: 6,
        width: '50%',
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
        name: PropTypes.string,
    }

    static defaultProps = {
        dataArr: {},
        name: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            fail: false,
        };
    }

    componentDidMount() {

    }

    setLine = (height) => {
        const length = Math.ceil(height / 6);
        const arr = [];
        for (let i = 0; i < length; i += 1) {
            if (i < length - 1) {
                arr.push(<View key={i} style={styles.little} />);
            }
        }
        return arr;
    }

    showLayer = () => {
        const { dataArr } = this.props;
        if (dataArr.objects && dataArr.objects[0].bbox) {
            const { bbox } = dataArr.objects[0];
            const height = (bbox[3] - bbox[1]) * per;
            const top = bbox[1] * per;
            const left = bbox[0] * per + 5;
            return (
              <View
                    style={[styles.layer, {
                        height: height + 10,
                        top,
                        left,
                    }]}
                >
                  <View style={[styles.layerLine, { height }]}>
                      {this.setLine(height)}
                    </View>
                    <View style={styles.layerContainer}>
                  <TextView
                          style={[styles.layerText, { marginBottom: 3 }]}
                          numberOfLines={1}
                        >
                          {dataArr.gaugeRead === null ? '--' : `${dataArr.gauge_len}m`}
                        </TextView>
                </View>
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
