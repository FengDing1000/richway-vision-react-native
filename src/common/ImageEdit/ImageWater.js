import React, {Component} from 'react';
import {
    View, StyleSheet, Dimensions, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {TextView} from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import {Svg, Polyline} from 'react-native-svg';
import {baseImage} from '../Service';
import BaseStyle from '$src/css/BaseStyle';
import ImageWaters from '../ImageLayer/ImageWaters';

const {width} = Dimensions.get(`window`);
const per = width / 640;
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
        marginLeft: 15,
    },
    stationContainer: {
        flex: 1,
        height: 48,
        justifyContent: `space-between`,
    },
    layer: {
        width: 120,
        position: `absolute`,
        backgroundColor: `rgba(0,0,0,0.4)`,
        paddingHorizontal: 5,
        flexDirection: `row`,
    },
    layerContainer: {
        flex: 1,
        marginTop: 10,
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
        width: 7,
        borderColor: `white`,
        borderBottomWidth: 1,
        borderLeftWidth: 0.8,
        marginTop: 10,
        marginRight: 6,
    },
    little: {
        borderColor: `white`,
        borderTopWidth: 0.8,
        height: 4,
        width: `60%`,
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
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {dataArr} = this.props;
        return (
            <View style={{flex: 1}} key={dataArr.fileCdOrig}>
                <View style={styles.stationInformation}>
                    <TextView style={styles.stationText}>
                        {`置信度：${dataArr.score !== null ? (`${(dataArr.score * 100).toFixed(1)}%`) : `--`}`}
                    </TextView>
                </View>
                <ImageWaters dataArr={dataArr}/>
            </View>
        );
    }
}

export default Page;
