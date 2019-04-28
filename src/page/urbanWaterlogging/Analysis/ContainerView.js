import React, { Component } from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { TextView } from '@rich/react-native-richway-component';
import BaseStyle from '$src/css/BaseStyle';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 240,
        borderBottomWidth: 0.8,
        borderColor: '#f5f5f5',
        paddingBottom: 20,
        marginBottom: 10,
        backgroundColor: `#fff`,
    },
    title: {
        width: '100%',
        height: 32,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    text: {
        color: BaseStyle.textItemColor,
    },
});

class Page extends Component {
    static propTypes = {
        title: PropTypes.string,
        subhead: PropTypes.string,
        children: PropTypes.element,
    }

    static defaultProps = {
        title: '',
        subhead: '',
        children: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const { title, subhead, children } = this.props;
        return (
          <View style={styles.container}>
              <View style={styles.title}>
              <TextView style={styles.text}>{title}</TextView>
              <TextView style={styles.text}>{subhead}</TextView>
                </View>
              {children}
            </View>
        );
    }
}

export default Page;
