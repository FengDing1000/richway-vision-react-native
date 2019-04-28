import React, {Component} from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {ButtonView, TextView} from '@rich/react-native-richway-component';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseStyle from '$src/css/BaseStyle';

const styles = StyleSheet.create({
    container: {
        width: `100%`,
        height: 43,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        paddingHorizontal: 10,
        backgroundColor: `#fff`,
    },
    right: {
        flexDirection: `row`,
        alignItems: `center`,
    },
    icon: {
        width: 20,
        height: 20,
        borderRadius: 20,
        justifyContent: `center`,
        alignItems: `center`,
        marginRight: 8,
    },
});

class Page extends Component {
    static propTypes = {
        name: PropTypes.string,
        onPress: PropTypes.func,
        color: PropTypes.string,
        title: PropTypes.string,
    }

    static defaultProps = {
        name: ``,
        onPress: () => {
        },
        color: ``,
        title: ``,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const {
            color, onPress, name, title,
        } = this.props;
        return (
            <ButtonView
                style={[styles.container, BaseStyle.border]}
                onPress={onPress}
            >
                <View style={styles.right}>
                    <View style={[styles.icon, {backgroundColor: color}]}>
                        <Icon name={name} size={10} color="white"/>
                    </View>
                    <TextView>{title}</TextView>
                </View>
                <Icon name="ios-arrow-forward" size={20} color={BaseStyle.textItemColor}/>
            </ButtonView>
        );
    }
}

export default Page;
