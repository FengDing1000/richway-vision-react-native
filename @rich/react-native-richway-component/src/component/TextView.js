/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import BaseStyle from '../css/BaseStyle';

const styles = StyleSheet.create({
  container: {
    color: BaseStyle.valueItemColor,
    fontSize: 13,
    backgroundColor: 'transparent',
  },
});
export default class TextView extends PureComponent {
  render() {
    const { style, children } = this.props;
    return (
      <Text
        {...this.props}
        style={[styles.container, style]}
      >
        {children}
      </Text>
    );
  }
}
