/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  View, BackHandler, Platform,
} from 'react-native';
import { Dialog, SetStatusBar, LayerModal } from '@rich/react-native-richway-component';
import { NavigationActions } from 'react-navigation';
import { Provider } from 'mobx-react';
import BaseStyle from './src/css/BaseStyle';
import Navigator from './src/navigation/navigator';
import store from './src/store';
import ImageLayer from './src/common/ImageLayer/ImageLayer';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      routeLength: 1,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

    getActiveRoute = (navigationState) => {
      if (navigationState) {
        this.setState({
          routeLength: navigationState.routes.length,
        });
      }
    }

    onBackAndroid = () => {
      const { imageLayer } = store;
      const { routeLength } = this.state;
      if (!global.Dialog && !global.layerModal && !imageLayer.visibility) {
        if (routeLength > 1) {
          this.navigator.dispatch(
            NavigationActions.back(),
          );
        } else {
          Dialog.open({
            text: '是否退出应用？',
            ok: () => {
              BackHandler.exitApp();
            },
          });
        }
        return true;
      }
      return false;
    }

    render() {
      return (
        <Provider {...store}>
          <View style={BaseStyle.container}>
            <SetStatusBar />
            <Navigator
              ref={(nav) => {
                this.navigator = nav;
              }}
              onNavigationStateChange={(prevState, currentState) => {
                this.getActiveRoute(currentState);
              }}
            />
            <Dialog />
            <LayerModal />
            <ImageLayer />
          </View>
        </Provider>
      );
    }
}

export default App;
