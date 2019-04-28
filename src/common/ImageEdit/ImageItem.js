import React, {Component} from 'react';
import {
    View, StyleSheet, Dimensions, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {TextView} from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import {baseImage} from '../Service';
import BaseStyle from '$src/css/BaseStyle';
import ImageRuler from '../ImageLayer/ImageRuler';

const {width} = Dimensions.get(`window`);
const per = width / 1280;
const styles = StyleSheet.create({
    image: {
        width,
        height: width * 0.75,
    },
    stationInformation: {
        flexDirection: `row`,
        alignItems: `center`,
        height: 60,
        backgroundColor: `white`,
    },
    stationText: {
        color: `#333`,
        fontWeight: `bold`,
        width: 120,
    },
    stationContainer: {
        flex: 1,
        alignItems: `center`,
        height: 48,
        justifyContent: `space-between`,
    },
    layer: {
        position: `absolute`,
        padding: 5,
        flexDirection: `row`,
        backgroundColor: `#00000080`,
        alignItems: `flex-end`,
    },
    layerContainer: {
        height: `100%`,
        justifyContent: `flex-end`,
    },
    layerImage: {
        borderColor: `white`,
        borderWidth: 0.8,
        flex: 1,
        padding: 5,
        justifyContent: `center`,
    },
    layerText: {
        color: `white`,
        fontSize: 10,
    },
    layerLine: {
        width: 8,
        borderColor: `white`,
        borderBottomWidth: 1,
        borderLeftWidth: 0.8,
        marginRight: 6,
        marginBottom: 5,
    },
    little: {
        borderColor: `white`,
        borderTopWidth: 0.8,
        height: 6,
        width: `50%`,
    },
    flex: {
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`,
        backgroundColor: `#ccc`,
        flexDirection: `row`,
    },
    flex1: {
        flex: 1,
    },
    shadowText: {color: `white`, fontSize: 10},
});

class Page extends Component {
    static propTypes = {
        dataArr: PropTypes.object,
    }

    static defaultProps = {
        dataArr: {},
        name: ``,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {dataArr, name} = this.props;
        return (
            <View style={{flex: 1}} key={dataArr.fileCdOrig}>
                <View style={styles.stationInformation}>
                    <View style={styles.stationContainer}>
                        <TextView style={styles.stationText}>
                            {`当前水位：${dataArr.gauge_rz !== null ? (`${dataArr.gauge_rz}m`) : `--`}`}
                        </TextView>
                        <TextView style={styles.stationText}>
                            {`水尺读数：${dataArr.gauge_read !== null ? (`${dataArr.gauge_read}m`) : `--`}`}
                        </TextView>
                    </View>
                    <View style={styles.stationContainer}>
                        <TextView style={styles.stationText}>
                            {`距坝顶：${dataArr.gauge_len !== null ? (`${dataArr.gauge_len}m`) : `--`}`}
                        </TextView>
                        <TextView style={styles.stationText}>
                            {`置信度：${dataArr.score !== null ? (`${(dataArr.score * 100).toFixed(1)}%`) : `--`}`}
                        </TextView>
                    </View>
                </View>
                <ImageRuler dataArr={dataArr} name={name}/>
            </View>
        );
    }
}

export default Page;
