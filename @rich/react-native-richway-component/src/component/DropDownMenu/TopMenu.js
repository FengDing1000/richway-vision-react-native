import React, {Component, PropTypes} from 'react';
import {
    View,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Easing,
    ART,
    StyleSheet,
} from 'react-native';
import Text from '../TextView';

const {
    Surface, Shape, Path, Group,
} = ART;

const T_WIDTH = 7;


const T_HEIGHT = 4;


const COLOR_HIGH = '#108ee9';


const COLOR_NORMAL = '#6c6c6c';


const SELECT_COLOR = '#108ee9';
const date = new Date();
const // 初始化时间选择器
    startValue = [
        date.getFullYear(),
        date.getMonth() < 9 ? `0${1 + date.getMonth()}` : 1 + date.getMonth(),
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
        '08:00',
    ];


const endValue = [
    date.getFullYear(),
    date.getMonth() < 9 ? `0${1 + date.getMonth()}` : 1 + date.getMonth(),
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    date.getHours() < 10 ? (`0${date.getHours()}:00`) : (`${date.getHours()}:00`),
];

const styles = StyleSheet.create({
    tableItemText: {
        fontWeight: '300',
        fontSize: 14,
    },
    TopMenu: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        height: 44,
    },
});

class DropdownMenu extends Component {
    static defaultProps={
        defaultIndex:[0,0]
    }
    constructor(props, context) {
        super(props, context);

        const selectIndex = new Array(this.props.data.length);
        for (let i = 0; i < selectIndex.length; i++) {
            if (i === props.defaultIndex[0]) {
                selectIndex[props.defaultIndex[0]] = props.defaultIndex[1];
            } else {
                selectIndex[i] = 0;
            }
        }
        this.state = {
            activityIndex: -1,
            selectIndex,
            rotationAnims: props.data.map(() => new Animated.Value(0)),
        };

        this.defaultConfig = {
            selectItemColor: SELECT_COLOR,
            arrowImg: './img/dropdown_arrow.png',
            checkImage: './img/menu_check.png',
        };
    }

    renderChcek(index, title) {
        const activityIndex = this.state.activityIndex;
        if (this.state.selectIndex[activityIndex] == index) {
            return (
                <View style={styles.text}>
                    <Text
                        style={[styles.tableItemText, {color: this.props.selectItemColor ? this.props.selectItemColor : this.defaultConfig.selectItemColor}]}
                    >
                        {title.title}
                    </Text>
                </View>
            );
        }
        return (
            <View style={styles.text}>
                <Text style={[styles.tableItemText, {color: COLOR_NORMAL}]}>{title.title}</Text>
            </View>
        );
    }

    renderActivityPanel() {
        if (this.state.activityIndex >= 0) {
            const currentTitles = this.props.data[this.state.activityIndex].data;

            const heightStyle = {};
            if (this.props.maxHeight && this.props.maxHeight < currentTitles.length * 44) {
                heightStyle.height = this.props.maxHeight;
            }

            return (
                <View style={{
                    position: 'absolute', left: 0, right: 0, top: 40, bottom: 0,
                }}
                >
                    <TouchableOpacity
                        onPress={() => this.openOrClosePanel(this.state.activityIndex)}
                        activeOpacity={1}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <View style={{opacity: 0.5, backgroundColor: 'black', flex: 1}}/>
                    </TouchableOpacity>

                    <ScrollView style={[{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                    }, heightStyle]}
                    >
                        {
                            currentTitles.map((title, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={1}
                                    style={{flex: 1}}
                                    onPress={this.itemOnPress.bind(this, index)}
                                >
                                    {this.renderChcek(index, title)}
                                    <View style={{backgroundColor: '#F6F6F6', height: 1, marginLeft: 15}}/>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            );
        }
        return (null);
    }

    openOrClosePanel(index) {
        if (this.state.activityIndex == index) {
            this.closePanel(index);
            this.setState({
                activityIndex: -1,
            });
        } else {
            if (this.state.activityIndex > -1) {
                this.closePanel(this.state.activityIndex);
            }
            this.openPanel(index);
            this.setState({
                activityIndex: index,
            });
        }
    }

    openPanel(index) {
        Animated.timing(
            this.state.rotationAnims[index],
            {
                toValue: 1,
                duration: 250,
                easing: Easing.linear,
            },
        ).start();
    }

    closePanel(index) {
        Animated.timing(
            this.state.rotationAnims[index],
            {
                toValue: 0,
                duration: 250,
                easing: Easing.linear,
            },
        ).start();
    }

    itemOnPress(index) {
        if (this.state.activityIndex > -1) {
            const selectIndex = this.state.selectIndex;
            selectIndex[this.state.activityIndex] = index;
            this.setState({
                selectIndex,
            });
            if (this.props.handler) {
                this.props.handler(this.state.activityIndex, this.props.data[this.state.activityIndex].data[index].value);
            }
        }
        this.openOrClosePanel(this.state.activityIndex);
    }

    itemOnPressDefined(index) {
        if (this.state.activityIndex > -1) {
            const selectIndex = this.state.selectIndex;
            selectIndex[this.state.activityIndex] = index;
            this.setState({
                selectIndex,
            });
        }
    }

    renderDropDownArrow(index) {
        let path;
        let fill;
        if (this.state.activityIndex == index) {
            fill = COLOR_HIGH;
            path = new Path()
                .moveTo(T_WIDTH / 2, 0)
                .lineTo(0, T_HEIGHT)
                .lineTo(T_WIDTH, T_HEIGHT)
                .close();
        } else {
            fill = COLOR_NORMAL;
            path = new Path()
                .moveTo(0, 0)
                .lineTo(T_WIDTH, 0)
                .lineTo(T_WIDTH / 2, T_HEIGHT)
                .close();
        }

        return (
            <Animated.View style={{
                marginLeft: 8,
                transform: [{
                    rotateZ: this.state.rotationAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                    }),
                }],
            }}
            >
                <Surface width={T_WIDTH} height={T_HEIGHT}>
                    <Shape d={path} stroke="#00000000" fill={fill} strokeWidth={0}/>
                </Surface>
            </Animated.View>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>

                    {
                        this.props.data.map((rows, index) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={this.openOrClosePanel.bind(this, index)}
                                key={index}
                                style={[styles.TopMenu, {
                                    borderColor: this.state.activityIndex == index ? SELECT_COLOR : '#F2F2F2',
                                    borderBottomWidth: 1,
                                }]}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: COLOR_NORMAL, fontSize: 13}}>{rows.title}</Text>
                                    {this.renderDropDownArrow(index)}
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                    {this.props.search ? this.props.search() : null}
                </View>
                {this.props.children}

                {this.renderActivityPanel()}

            </View>
        );
    }
}

export default DropdownMenu;
