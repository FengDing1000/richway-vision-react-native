import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';


const TabConfig = {
    backBehavior: 'none',
    lazy: true,
    tabBarOptions: {
        // 给IOS每个tab加点击后的背景色
        activeTintColor: '#108EE9',
        inactiveTintColor: '#919191',
        showIcon: true,
        showLabel: true,
        style: {
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
            height: 42,
        },
        labelStyle: {
            fontSize: 9,
        },
    },
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch (routeName) {
            case 'home':
                iconName = 'ios-home';
                break;
            case 'analysis':
                iconName = 'ios-navigate';
                break;
            case 'information':
                iconName = 'ios-clipboard';
                break;
            case 'mine':
                iconName = 'ios-settings';
                break;
            default:
                break;
            }

            return <Icon name={iconName} size={19} color={tintColor} />;
        },
    }),
};

export default TabConfig;
