import React, { Component } from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
    ButtonView,
    Header, Paper, RefreshFlatList, SearchBox, TextView,
} from '@rich/react-native-richway-component';
import { inject } from 'mobx-react/index';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseStyle from '$src/css/BaseStyle';
import Service, { baseUrl } from '$src/common/Service';
import { get } from '$src/common/Fetch';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        minHeight: 120,
        borderRadius: 6,
    },
    warn: {
        height: 85,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        flexDirection: 'row',
    },
    warnTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentTitle: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        width: '100%',
        padding: 10,
    },
    contentText: {
        color: BaseStyle.textItemColor,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    back: {
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
});

@inject(['user'])
class Page extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        user: PropTypes.object,
    }

    static defaultProps = {
        navigation: {},
        user: {},
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.params = {
            appId: props.user.user.appId,
            nm: '',
            page: 1,
            rows: 20,
        };
    }

    componentDidMount() {

    }

    onPress=(item) => {
        const { navigation } = this.props;
        navigation.navigate('UavPatrolInspectionInformationDetail', item);
    }

    renderItem = ({ item }) => (
      <Paper style={styles.container}>
          <ButtonView
              style={{ flex: 1 }}
              onPress={() => { this.onPress(item); }}
            >
                <View style={styles.warn}>
                    <Icon name="ios-alert" color="white" size={25} />
              <TextView style={[styles.warnTitle, { marginLeft: 12 }]}>预警</TextView>
            </View>
              <View style={styles.content}>
                    <View style={styles.row}>
                        <TextView style={styles.contentTitle}>{item.nm}</TextView>
                        <TextView style={styles.contentText}>{item.start_tm}</TextView>
                </View>
                  <TextView style={styles.contentText}>{item.content}</TextView>
                </View>
            </ButtonView>
        </Paper>
    )

    keyExtractor = (item, index) => index.toString();

    leftIcon = () => {
        const { navigation } = this.props;
        return (
          <ButtonView
              style={styles.back}
              onPress={() => {
                    navigation.goBack();
                }}
            >
              <Icon name="md-arrow-back" size={20} color="white" />
            </ButtonView>
        );
    };

    filterResult=(text) => {
        this.params.nm = text;
        this.refreshFlatList.onRefresh(this.params);
    }

    render() {
        return (
          <View style={BaseStyle.container}>
              <SearchBox
                    filterResult={this.filterResult}
                    placeholder="请输入站点名称"
            />
              <View style={BaseStyle.content}>
                  <RefreshFlatList
                      ref={(v) => { this.refreshFlatList = v; }}
                      getData={(params) => get({ url: Service.WarnList, params })}
                      params={this.params}
                      renderItem={this.renderItem}
                      keyExtractor={this.keyExtractor}
                    />
                </View>
            </View>
        );
    }
}

export default Page;
