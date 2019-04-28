import React, { Component } from 'react';
import {
    View, StyleSheet, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView } from '@rich/react-native-richway-component';

const styles = StyleSheet.create({
    container: {
        height: 170,
        flex: 1,
        marginLeft: 25,
        marginBottom: 26,
    },
    item: {
        flex: 1,
        minHeight: 40,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 6,
        padding: 5,
        marginBottom: 6,
    },
    title: {
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 3,
    },
    emptyItem: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class Page extends Component {
    static propTypes = {
        callback: PropTypes.func,
        data: PropTypes.array,
    }

    static defaultProps = {
        callback: () => {},
        data: [],
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    renderItem=({ item }) => (
      <View style={styles.item}>
          <TextView style={styles.title}>{`预警站点：${item.stnm || '--'}`}</TextView>
          <TextView>{item.reason[0].execinfo || '--'}</TextView>
        </View>
    )

    onStartShouldSetResponder=() => {
        const { callback } = this.props;
        callback(false);
        return true;
    }

    onResponderEnd=() => {
        const { callback } = this.props;
        callback(true);
    }

    render() {
        const { data } = this.props;
        return (
          <View
                style={styles.container}
                onStartShouldSetResponder={this.onStartShouldSetResponder}
                onResponderEnd={this.onResponderEnd}
            >
              {data.length > 0 ? (
                  <FlatList
                      data={data}
                      renderItem={this.renderItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                  <View style={styles.emptyContainer}>
                      <TextView>暂无预警站点</TextView>
                    </View>
                )}
            </View>
        );
    }
}

export default Page;
