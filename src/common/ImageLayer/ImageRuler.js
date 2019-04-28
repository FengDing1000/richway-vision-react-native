import React, {Component} from 'react';
import {
    View, StyleSheet, Dimensions, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {TextView} from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import {Polygon, Polyline, Svg} from 'react-native-svg';
import {baseImage} from '../Service';
import BaseStyle from '$src/css/BaseStyle';

const {width} = Dimensions.get(`window`);
// const per = width / 1920;
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
    smallLayer: {
        backgroundColor: BaseStyle.themeColor,
        width: 18,
        height: 10,
        alignItems: `center`,
        justifyContent: `center`,
    },
    smallLine: {
        height: 12,
        width: 6,
        borderColor: `#fff`,
        borderTopWidth: 0.8,
        borderLeftWidth: 0.8,
        marginTop: 5,
    },
    smallLineRight: {
        height: 12,
        width: 6,
        borderColor: `#fff`,
        borderTopWidth: 0.8,
        borderRightWidth: 0.8,
        marginTop: 5,
    },
    shadowText: {color: `white`, fontSize: 10},
});

class Page extends Component {
    static propTypes = {
        dataArr: PropTypes.object,
        widthImage: PropTypes.number,
        small: PropTypes.bool,
        name: PropTypes.string,
    }

    static defaultProps = {
        dataArr: {},
        widthImage: width,
        small: false,
        name: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            fail: false,
            per: props.widthImage / 1280,
        };
    }

    componentDidMount() {

    }

    setLine = (height) => {
        const length = Math.ceil(height / 6);
        const arr = [];
        for (let i = 0; i < length; i += 1) {
            if (i < length - 1) {
                arr.push(<View key={i} style={styles.little}/>);
            }
        }
        return arr;
    }

    showSmallLayer = () => {
        const {dataArr, widthImage} = this.props;
        const {per} = this.state;
        if (dataArr.objects && dataArr.objects[0].bbox) {
            const {bbox} = dataArr.objects[0];
            const bottom = widthImage * 0.75 - bbox[1] * per;
            const left = bbox[0] * per;
            const position1 = `${bbox[0] * per},${bbox[1] * per} `;
            const position2 = `${bbox[2] * per},${bbox[1] * per} `;
            const position3 = `${bbox[2] * per},${bbox[3] * per} `;
            const position4 = `${bbox[0] * per},${bbox[3] * per}`;
            const showLeft = ((widthImage - left) > 40);
            return ([
                    <View
                        key="0"
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
                            <Polygon
                                points={position1 + position2 + position3 + position4}
                                fill="none"
                                stroke="yellow"
                                strokeWidth="1"
                            />
                        </Svg>
                    </View>,
                    <View
                        key="1"
                        style={[{
                            position: `absolute`,
                            bottom,
                            flexDirection: `row`,
                        }, (showLeft ? {left} : {right: widthImage - left})]}
                    >
                        {showLeft ? <View style={styles.smallLine}/> : null}
                        <View style={styles.smallLayer}>
                            <TextView style={{color: `white`, fontSize: 4}}>
                                {(dataArr.gauge_read !== null && dataArr.gauge_read !== undefined) ? `${dataArr.gauge_read}m` : `--`}
                            </TextView>
                        </View>
                        {showLeft ? null : <View style={styles.smallLineRight}/>}
                    </View>]
            );
        }
        return null;
    }

    showLayer = () => {
        // const {dataArr, widthImage, name} = this.props;
        // const {per} = this.state;
        // if (dataArr.objects && dataArr.objects[0].bbox) {
        //     const {bbox} = dataArr.objects[0];
        //     // const height = (bbox[3] - bbox[1]) * per;
        //     const height = 50 * (widthImage / width);
        //     const bottom = widthImage * 0.75 - bbox[1] * per;
        //     const left = bbox[0] * per;
        //     const position1 = `${bbox[0] * per},${bbox[1] * per} `;
        //     const position2 = `${bbox[2] * per},${bbox[1] * per} `;
        //     const position3 = `${bbox[2] * per},${bbox[3] * per} `;
        //     const position4 = `${bbox[0] * per},${bbox[3] * per}`;
        //     const showLeft = ((widthImage - left) > 110);
        //     return ([
        //         <View
        //             key="0"
        //             style={{
        //                 width: widthImage,
        //                 height: widthImage * 0.75,
        //                 position: `absolute`,
        //                 top: 0,
        //                 left: 0,
        //             }}
        //         >
        //             <Svg
        //                 width={widthImage}
        //                 height={widthImage * 0.75}
        //             >
        //                 <Polygon
        //                     points={position1 + position2 + position3 + position4}
        //                     fill="none"
        //                     stroke="yellow"
        //                     strokeWidth="1"
        //                 />
        //             </Svg>
        //         </View>,
        //         <View
        //             key="1"
        //             style={[styles.layer, {
        //                 minHeight: (height + 10) * (widthImage / width),
        //                 bottom,
        //             }, (showLeft ? {left} : {right: width - left})]}
        //         >
        //             <View style={[styles.layerLine, {height}]}>
        //                 {this.setLine(height)}
        //             </View>
        //             <View style={[styles.layerContainer, {width: 90}]}>
        //                 <TextView style={[styles.shadowText, {fontWeight: `bold`}]}>
        //                     {name || dataArr.nm || `--`}
        //                 </TextView>
        //                 <View
        //                     style={{
        //                         borderWidth: 1, borderColor: `white`, padding: 3,
        //                     }}
        //                 >
        //                     <TextView style={styles.shadowText}>
        //                         {`水尺读数:${dataArr.gauge_read === undefined || dataArr.gauge_read === null
        //                             ? `--`
        //                             : dataArr.gauge_read}m`}
        //                     </TextView>
        //                     <TextView style={styles.shadowText}>
        //                         {`水位阈值:${
        //                             dataArr.gauge_threshold === undefined || dataArr.gauge_threshold === null
        //                                 ? `--`
        //                                 : dataArr.gauge_threshold}m`}
        //                     </TextView>
        //                     <TextView style={styles.shadowText}>
        //                         {`水位:${dataArr.gauge_rz === undefined || dataArr.gauge_rz === null
        //                             ? `--`
        //                             : dataArr.gauge_rz}m`}
        //                     </TextView>
        //                     <TextView style={styles.shadowText}>
        //                         {`置信度:${(dataArr.objects[0].score * 100).toFixed(1)}%`}
        //                     </TextView>
        //                 </View>
        //                 <TextView
        //                     style={[styles.layerText, {marginBottom: 0}]}
        //                     numberOfLines={1}
        //                 >
        //                     {dataArr.gauge_read === null || dataArr.gauge_read === undefined ? `--` : `${dataArr.gauge_read}m`}
        //                 </TextView>
        //             </View>
        //         </View>,
        //     ]);
        // }
        return null;
    }

    render() {
        const {dataArr, widthImage, small} = this.props;
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
                            // 2019-04-25 ZG
                            // source={{uri: baseImage + dataArr.fileCdOrig}}
                            source={{ uri: baseImage + (small ? dataArr.fileCdOrig : dataArr.fileCdPred)}}
                            style={{
                                width: widthImage,
                                height: widthImage * 0.75,
                            }}
                            onError={() => this.setState({fail: true})}
                        />
                        {small ? this.showSmallLayer() : this.showLayer()}
                    </View>
                )}
            </View>
        );
    }
}

export default Page;
