import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from './TextView';
import BaseStyle from '../css/BaseStyle';
import ButtonView from './ButtonView';


const styles = StyleSheet.create({
  header: {
    height: 45,
    flexDirection: 'row',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 0.8,
    alignItems: 'center',
  },
  txtInputWrapper: {
    height: 30,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  cancel: {
    paddingHorizontal: 8,
  },
  searchBtnBox: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbtn: {
    fontFamily: 'iconfont',
    fontSize: 20,
  },
  IconText: {
    fontFamily: 'iconfont',
    fontSize: 12,
    color: BaseStyle.textItemColor,
  },
  IconTextBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});

export default class SearchButton extends PureComponent {
    static propTypes = {
      placeholder: PropTypes.string,
      onPress: PropTypes.func,
    }

    static defaultProps = {
      placeholder: '请输入查询信息',
      onPress: () => {

      },
    }


    render() {
      const { placeholder, onPress } = this.props;
      return (
        <View style={styles.header}>
          <ButtonView
            style={styles.txtInputWrapper}
            onPress={onPress}
          >
            <View style={styles.IconTextBox}>
              <Icon name="md-search" size={16} color={BaseStyle.textItemColor} />
            </View>
            <Text style={{ color: BaseStyle.textItemColor, flex: 1 }}>{placeholder}</Text>
          </ButtonView>
        </View>
      );
    }
}
