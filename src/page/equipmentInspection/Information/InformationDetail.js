import React, { Component } from 'react';
import {
    View, StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { Header, StatusView, TextView } from '@rich/react-native-richway-component';
import moment from 'moment';
import BaseStyle from '$src/css/BaseStyle';
import { get } from '$src/common/Fetch';
import Service from '$src/common/Service';
import ImageItem from './ImageItem';
import ImageDetect from './ImageDetect';
import RubbishWater from './RubbishWater';
import ImageWaters from '$src/common/ImageLayer/ImageWaters';
import ImageWater from './ImageWater';
import ImageRuler from '$src/common/ImageLayer/ImageRuler';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    item: {
        height: 40,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleView: {
        width: '100%',
        marginVertical: 10,
    },
    title: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

class Page extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }

    static defaultProps = {
        navigation: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    componentDidMount() {
    }

    callback = (data) => {
        this.setState({
            data: data[0],
        });
    }

    renderImage=() => {
        const { data } = this.state;
        const { navigation } = this.props;
        const { params } = navigation.state;
        data.nm = params.nm;
        if (data.labelMark) {
        // if (data.model.indexOf('viw_water_gauge') !== -1) {
        //   return (<ImageItem dataArr={data} />);
        // }
        // if (data.model.indexOf('viw_water_seg') !== -1) {
        //   return (<ImageWater dataArr={data} />);
        // }
        // if (data.model.indexOf('viw_secchi_detect') !== -1) {
        //   return (<ImageDetect dataArr={data} />);
        // }
        // if (data.model.indexOf('viw_rubbish_seg') !== -1) {
        //   return (<RubbishWater dataArr={data} />);
        // }
        // 水域water_seg  水尺ruler
            if (data.labelMark === 'ruler') {
                return (<ImageRuler dataArr={data} widthImage={width - 20} />);
            }
            if (data.labelMark === 'water_seg') {
                return (<ImageWaters dataArr={data} widthImage={width - 20} />);
            }
        }

        return null;
    }

    renderItem=() => {
        const { data } = this.state;
        const arr = [];
        if (data.model === 'viw_water_gauge') {
            arr.push(
              <View key={0} style={[styles.item, BaseStyle.border]}>
                  <TextView>水尺识别长度:</TextView>
                  <TextView>{data.gauge_len === null ? '--' : `${data.gauge_len}m`}</TextView>
                </View>,
            );
            arr.push(
              <View key={1} style={[styles.item, BaseStyle.border]}>
                  <TextView>水位:</TextView>
                  <TextView>{data.gauge_rz === null ? '--' : `${data.gauge_rz}m`}</TextView>
                </View>,
            );
        } else if (data.model === 'viw_secchi_detect') {
            arr.push(
              <View key={0} style={[styles.item, BaseStyle.border]}>
                  <TextView>水体透明度:</TextView>
                    <TextView>{data.transparency === null ? '--' : `${data.transparency}cm`}</TextView>
                </View>,
            );
        } else if (data.model === 'viw_rubbish_seg') {
            arr.push(
              <View key={0} style={[styles.item, BaseStyle.border]}>
                  <TextView>垃圾漂浮物面积:</TextView>
                  <TextView>{data.areas === null ? '--' : `${data.areas}㎡`}</TextView>
                </View>,
            );
        }
        return arr;
    }

    render() {
        const { navigation } = this.props;
        const { params } = navigation.state;
        const { data } = this.state;
        return (
          <View style={BaseStyle.container}>
              <Header title={params.nm} />

              <View style={[BaseStyle.content, { paddingHorizontal: 10 }]}>
                    <StatusView
                        ref={(v) => {
                            this.StatusView = v;
                        }}
                  getData={(res) => get({ url: Service.WarnDetail, params: res })}
                  callBack={this.callback}
                  params={{
                            id: params.id,
                            model: params.model,
                            labelMark: params.labelMark,
                        }}
                >
                  <ScrollView style={{ flex: 1 }}>
                        <View style={styles.titleView}>
                                <TextView style={styles.title}>{params.nm}</TextView>
                      <TextView>{`江河瑞通 ${moment(params.start_tm).format('YYYY年MM月DD日 HH:mm:ss')}`}</TextView>
                    </View>
                        <TextView>{data.content}</TextView>
                        {this.renderImage()}
                        {this.renderItem()}

                        <View style={[styles.item, BaseStyle.border]}>
                              <TextView>置信度:</TextView>
                              <TextView>{data.score === null ? '--' : `${data.score * 100}%`}</TextView>
                            </View>
                        <View style={[styles.item, BaseStyle.border]}>
                              <TextView>负责人:</TextView>
                              <TextView>{data.contacts_name === null ? '--' : data.contacts_name}</TextView>
                            </View>
                        </ScrollView>
                </StatusView>
                </View>
            </View>
        );
    }
}

export default Page;
