/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  StyleSheet, TextInput,
} from 'react-native';
import BaseStyle from '../css/BaseStyle';

const styles = StyleSheet.create({
  accountAndPwdTextInput: {
    flex: 1,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    fontSize: 13,
    color: BaseStyle.valueItemColor,
  },
});
export default class Input extends PureComponent {
  render() {
    const { style } = this.props;
    return (
      <TextInput
        placeholderTextColor="#d9d9d9"
        underlineColorAndroid="transparent"
        {...this.props}
        style={[styles.accountAndPwdTextInput, style]}
      />
    );
  }
}
