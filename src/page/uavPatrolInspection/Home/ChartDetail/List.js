import React, { Component } from 'react';
import {
    View, StyleSheet, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView } from '@rich/react-native-richway-component';
import moment from 'moment';
import BaseStyle from '$src/css/BaseStyle';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    border: {
        borderColor: '#F5F5F5',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        height: 35,
        flexDirection: 'row',
    },
    item: {
        height: '100%',
        flex: 1,
        borderColor: '#F5F5F5',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty: {
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class Page extends Component {
    static propTypes = {
        data: PropTypes.array,
    }

    static defaultProps = {
        data: [],
    }

    state = {
        title: {
            tm: '时间',
            gaugeRead: '水尺读数',
            gaugeLen: '距坝顶',
            status: '状态',
            data: [],
        },
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        this.setState({
            data,
        });
    }

    renderItem = ({ item }) => {
        const element = this.setItem(item, true);
        return element;
    }

    setItem = (item, time) => (
      <View style={styles.border}>
          <View style={styles.item}>
              <TextView>{time ? moment(item.tm).format('MM-DD HH:mm') : item.tm}</TextView>
            </View>
          <View style={styles.item}>
              <TextView>{item.gaugeRead}</TextView>
            </View>
          <View style={styles.item}>
              <TextView>{item.gaugeLen}</TextView>
            </View>
          <View style={styles.item}>
              <TextView>{Number(item.status) === 1 ? '正常' : '预警'}</TextView>
            </View>
        </View>
    )

    ListEmptyComponent = () => (
      <View style={[styles.border, styles.empty]}>
          <TextView>暂无数据</TextView>
        </View>
    )

    render() {
        const { title, data } = this.state;
        return (
          <View style={styles.container}>
              {this.setItem(title)}
              <FlatList
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderItem}
                  ListEmptyComponent={this.ListEmptyComponent}
                />
            </View>
        );
    }
}

export default Page;
