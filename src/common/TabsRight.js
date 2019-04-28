import React, {Component} from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonView, TextView} from '@rich/react-native-richway-component/index';
import {inject} from 'mobx-react/index';
import {observer} from 'mobx-react';
import BaseStyle from '$src/css/BaseStyle';

const styles = StyleSheet.create({
    container: {
        width: 45,
        height: `100%`,
        backgroundColor: `#fff`,
        borderRightWidth: 0.8,
        borderColor: BaseStyle.border.borderColor,
    },
    item: {
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`,
    },
    text: {
        fontSize: 11,
        textAlign: `center`,
    },
});

@inject([`tabs`])
@observer
class Page extends Component {
    static propTypes = {
        items: PropTypes.array,
        tabs: PropTypes.object,
        callback: PropTypes.func,
    }

    static defaultProps = {
        items: [
            {icon: `md-apps`, name: `全部`, sttpCd: ``},
        ],
        tabs: {},
        callback: () => {
        },
    }

    componentDidMount() {

    }

    setItem = () => {
        const {items, tabs, callback} = this.props;
        const arr = [];
        items.forEach((item, i) => {
            arr.push(
                <ButtonView
                    disabled={tabs.index === i}
                    activeOpacity={1}
                    key={item.icon}
                    style={[styles.item, (i === items.length - 1 ? {} : BaseStyle.border)]}
                    onPress={() => {
                        tabs.setIndex(i);
                        callback(item.sttpCd);
                    }}
                >
                    <Icon
                        name={item.icon}
                        size={22}
                        color={tabs.index === i ? BaseStyle.themeColor : BaseStyle.textItemColor}
                    />
                    <TextView
                        style={[styles.text, {color: tabs.index === i ? BaseStyle.themeColor : BaseStyle.textItemColor}]}
                    >
                        {item.name}
                    </TextView>
                </ButtonView>,
            );
        });
        return arr;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.setItem()}
            </View>
        );
    }
}

export default Page;
