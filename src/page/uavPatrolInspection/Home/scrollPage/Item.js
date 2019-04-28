import React, { PureComponent } from 'react';
import {
    View, StyleSheet, DeviceEventEmitter, Image, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { ButtonView, TextView } from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import { inject } from 'mobx-react/index';
import BaseStyle from '$src/css/BaseStyle';
import Toast from '$src/common/Toast';
import { put } from '$src/common/Fetch';
import Service, { baseImage } from '$src/common/Service';
import ImageRuler from '$src/common/ImageLayer/ImageRuler';
import ImageWaters from '$src/common/ImageLayer/ImageWaters';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        minHeight: 100,
        paddingHorizontal: 10,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    card: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        paddingBottom: 3,
    },
    name: {
        width: 80,
    },
    time: {
        flex: 1,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    value: {
        marginTop: 4,
        color: BaseStyle.themeColor,
        fontSize: 13,
    },
    valueTitle: {
        fontSize: 12,
    },
    bottom: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

@inject('user')
@inject('imageLayer')
class Page extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object,
        item: PropTypes.object,
        user: PropTypes.object,
        imageLayer: PropTypes.object,
        warn: PropTypes.bool,
    }

    static defaultProps = {
        navigation: {},
        item: {},
        user: {},
        imageLayer: {},
        warn: false,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    fav = (bool) => {
        if (bool) {
            return (
              <Icon name="md-star" size={20} color={BaseStyle.themeColor} />
            );
        }
        return (
          <Icon name="md-star-outline" size={20} color={BaseStyle.themeColor} />
        );
    }

    collection = () => {
        const { item, user } = this.props;
        const params = {
            userId: user.user.userAccount,
            stId: item.id,
            fav: !item.fav,
        };
        put({
            url: Service.Collection,
            params,
        }).then(() => {
            Toast(item.fav ? '取消关注成功' : '关注成功');
            DeviceEventEmitter.emit('RefreshCollection');
        }).catch((error) => {
            console.log(error);
            Toast(item.fav ? '取消关注失败' : '关注失败');
        });
    }

    openImage=(item) => {
        const { imageLayer } = this.props;
        if (item.sttpCd === 'VV') {
            imageLayer.show(<ImageRuler dataArr={item} />);
        } else {
            imageLayer.show(<ImageWaters dataArr={item} />);
        }
    }

    render() {
        const { item, navigation, warn } = this.props;
        return (
          <View style={styles.container}>
              <ButtonView
                  activeOpacity={1}
                    onPress={() => { this.openImage(item); }}
                >
                  {item.sttpCd === 'VV'
                        ? <ImageRuler dataArr={item} widthImage={100} small />
                        : <ImageWaters dataArr={item} widthImage={100} />}
                </ButtonView>
              <View style={styles.card}>
              <View style={[styles.title, { paddingTop: 8 }]}>
                      <View style={styles.name}>
                          <TextView
                                numberOfLines={1}
                              style={{
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    color: item.status === '2'
                                        ? 'red'
                                        : '#333',
                                }}
                            >
                              {item.nm || '--'}
                            </TextView>
                        </View>
                      <ButtonView onPress={this.collection}>
                          {this.fav(item.fav)}
                        </ButtonView>
                    </View>
              <View style={[styles.title, BaseStyle.border]}>
                        <View style={styles.time}>
                            <TextView
                            numberOfLines={1}
                            style={{ color: BaseStyle.textItemColor, fontSize: 11 }}
                          >
                            {warn
                                    ? (`报警时间:${(item.wrnModel[0] || { tm: '' }).tm}`)
                                    : (`上次报送:${item.tm || ''}`)}
                          </TextView>
                    </View>
                    </View>
              <ButtonView
                      style={styles.content}
                        onPress={() => {
                            navigation.navigate('UavPatrolInspectionDetailImage', item);
                        }}
                    >
                      {warn
                            ? (
                              <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                  <TextView style={styles.valueTitle} numberOfLines={5}>
                                        {(item.wrnModel[0] || { content: '' }).content}
                                </TextView>
                                </View>
                            )
                            : [(
                              <View style={styles.item} key={1}>
                                  <TextView style={styles.valueTitle}>
                                水位(m)
                                    </TextView>
                                    <TextView style={[styles.value, { color: item.status === '2' ? 'red' : BaseStyle.themeColor }]}>
                                        {(item.gauge_rz !== null && item.gauge_rz !== undefined) ? item.gauge_rz : '--'}
                                    </TextView>
                                </View>
                            ),
                            (
                              <View style={styles.item} key={2}>
                                  <TextView style={styles.valueTitle}>
                                读数(m)
                                    </TextView>
                                    <TextView style={styles.value}>
                                  {(item.gauge_read !== null && item.gauge_read !== undefined) ? item.gauge_read : '--'}
                                </TextView>
                                </View>
                            ),
                            (
                              <View style={styles.item} key={3}>
                                  <TextView style={styles.valueTitle}>
                                阈值(m)
                                    </TextView>
                                  <TextView style={styles.value}>
                                      {(item.gauge_threshold !== null && item.gauge_threshold !== undefined)
                                            ? item.gauge_threshold
                                            : '--'}
                                    </TextView>
                                </View>
                            )]}
                    </ButtonView>
                </View>
            </View>
        );
    }
}

export default withNavigation(Page);
