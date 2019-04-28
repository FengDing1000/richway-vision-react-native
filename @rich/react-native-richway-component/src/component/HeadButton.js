import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ButtonView from './ButtonView';
import Text from './TextView';

const styles = StyleSheet.create({
  item: {
    height: 38,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 11,
  },
});
class HeadButton extends PureComponent {
    static propTypes = {
      name: PropTypes.string,
      onPress: PropTypes.func,
    }

    static defaultProps = {
      name: '',
      onPress: () => {},
    }

    render() {
      const { name, onPress } = this.props;
      return (
        <ButtonView style={styles.item} onPress={onPress}>
          <Text style={styles.text}>{name}</Text>
        </ButtonView>
      );
    }
}
export default HeadButton;
