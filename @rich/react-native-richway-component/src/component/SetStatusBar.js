// import { Platform, StatusBar } from 'react-native';
//
// const SetStatusBar = () => {
//   // 改变状态栏样式
//   StatusBar.setBarStyle('light-content', true);
//   if (Platform.OS === 'android') {
//     StatusBar.setTranslucent(true);
//     StatusBar.setBackgroundColor('#00000000', true);
//   }
// };
//
// export default SetStatusBar;

import React, {Component} from 'react';
import {
    StatusBar,
    AppState,
    Platform
} from 'react-native';
import PropTypes from "prop-types";

export default class SetStatusBar extends Component {
    static propTypes = {
        BackgroundColor:PropTypes.string,
        BarStyle:PropTypes.string
    }

    static defaultProps = {
        BackgroundColor:'#00000000',
        BarStyle:'light-content'
    }

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentAppState: AppState.currentState,
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        const {currentAppState} = this.state;
        if (currentAppState.match(/inactive|background/) && nextAppState === 'active') {
            StatusBar.setBarStyle('light-content', false);
            if (Platform.OS === 'android') {
                StatusBar.setTranslucent(true);
                StatusBar.setBackgroundColor('#00000000', false);
            }
        }
        this.setState({currentAppState: nextAppState});
    }

    render() {
        return (
            <StatusBar
                translucent
                backgroundColor={'#00000000'}
                barStyle={'light-content'}
            />
        );
    }
}