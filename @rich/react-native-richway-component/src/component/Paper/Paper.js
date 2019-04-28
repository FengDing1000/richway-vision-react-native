

import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { fade } from './colorManipulator';

function addDropShadows([height, radius, alpha]) {
  if (Platform.OS === 'android') {
    return { elevation: height + radius };
  }
  return {
    shadowOffset: { width: 0, height },
    shadowRadius: radius,
    shadowColor: fade('#000', alpha),
    shadowOpacity: 1,
  };
}

const styles = {
  paper: {
    backgroundColor: 'white',
  },
  dropshadows: [
    [1, 4, 0.12],
    [4, 6, 0.16],
    [6, 10, 0.19],
    [10, 14, 0.25],
    [14, 18, 0.30],
  ].map(addDropShadows),
};

class Paper extends Component {
    static propTypes = {
      zDepth: PropTypes.number,
      style: PropTypes.any,
      children: PropTypes.element,
    }

  static defaultProps = {
    zDepth: 1,
    style: null,
    children: [(<View />)],
  };

    shadow=null;

    setNativeProps = (props) => {
      this.shadow.setNativeProps(props);
    }

    render() {
      const {
        zDepth,
        style,
        children,
        ...other
      } = this.props;

      const paperStyles = [
        styles.paper,
        [styles.dropshadows[zDepth - 1]],
        style,
      ];

      return (
        <View {...other} style={paperStyles} ref={(c) => { this.shadow = c; }}>
          {children}
        </View>
      );
    }
}

export default Paper;
