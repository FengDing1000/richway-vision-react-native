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

const {width} = Dimensions.get(`window`);
const styles = StyleSheet.create({
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
        widthImage: PropTypes.number,
    }

    static defaultProps = {
        dataArr: {},
        widthImage: width,
    }

    constructor(props) {
        super(props);
        this.state = {
            fail: false,
            per: props.widthImage / 640,
        };
    }

    componentDidMount() {

    }


    showLayer = () => {
        const {dataArr, widthImage} = this.props;
        const {per} = this.state;
        if (dataArr.objects && dataArr.objects[0].points) {
            // dataArr.objects[0].points.forEach((arr, indexArr) => {
            let points = ``;
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
            // });
            return (
                <View
                    style={{
                        width: widthImage,
                        height: widthImage * 0.75,
                        position: `absolute`,
                        top: 0,
                        left: 0,
                    }}
                >
                    <Svg
                        width={widthImage}
                        height={widthImage * 0.75}
                    >
                        {polyLine}
                    </Svg>
                </View>
            );
        }
        return null;
    }

    render() {
        const {dataArr, widthImage} = this.props;
        const {fail} = this.state;
        return (
            <View
                style={{
                    width: widthImage,
                    height: widthImage * 0.75,
                }}
                key={dataArr.fileCdOrig}
            >
                {fail ? (
                    <View style={styles.flex}>
                        <Icon name="ios-help-circle" size={20} color={BaseStyle.valueItemColor}/>
                        <TextView style={{marginLeft: 8}}>加载失败</TextView>
                    </View>
                ) : (
                    <View style={styles.flex1}>
                        <Image
                            source={{uri: baseImage + dataArr.fileCdPred}}
                            style={{
                                width: widthImage,
                                height: widthImage * 0.75,
                            }}
                            onError={() => this.setState({fail: true})}
                        />
                        {this.showLayer()}
                    </View>
                )}
            </View>
        );
    }
}

export default Page;
