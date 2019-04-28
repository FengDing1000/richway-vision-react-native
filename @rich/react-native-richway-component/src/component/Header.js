import React, {PureComponent} from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationActions, withNavigation} from 'react-navigation';
import ButtonView from './ButtonView';
import TextView from './TextView';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 63,
        justifyContent: 'flex-end',
        // 阴影样式
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: `#000000`,
        elevation: 3,
    },
    titleView: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonView: {
        width: 90,
        height: '100%',
        justifyContent: 'center',
    },
    title: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        height: '100%',
        paddingLeft: 10,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 16,
    },
});

class Page extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object,
        backgroundColor: PropTypes.string,
        color: PropTypes.string,
        title: PropTypes.string,
        leftView: PropTypes.any,
        rightView: PropTypes.element,
        backFunc: PropTypes.func,
    }

    static defaultProps = {
        navigation: {},
        backgroundColor: '#128DE9',
        color: 'white',
        title: '',
        leftView: null,
        rightView: null,
        backFunc: () => {
        },
    }

    render() {
        const {
            backgroundColor, color, title, leftView, rightView, navigation, backFunc,
        } = this.props;
        return (
            <View style={[styles.container, {backgroundColor}]}>
                <View style={styles.titleView}>
                    <View style={styles.buttonView}>
                        {leftView || (
                            <ButtonView
                                style={styles.back}
                                onPress={() => {
                                    backFunc();
                                    navigation.dispatch(
                                        NavigationActions.back(),
                                    );
                                }}
                            >
                                <Icon name="md-arrow-back" size={20} style={{color}}/>
                            </ButtonView>
                        )}
                    </View>
                    <View style={styles.title}>
                        <TextView style={[styles.titleText, {color}]} numberOfLines={1}>
                            {title}
                        </TextView>
                    </View>
                    <View style={[styles.buttonView,{alignItems:'flex-end'}]}>
                        {rightView}
                    </View>
                </View>
            </View>
        );
    }
}

export default withNavigation(Page);
