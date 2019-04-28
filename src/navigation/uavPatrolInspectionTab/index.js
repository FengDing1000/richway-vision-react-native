import { createBottomTabNavigator } from 'react-navigation';
import tabConfig from './tabConfig';
import Home from '$src/page/uavPatrolInspection/Home/Home';
import Analysis from '$src/page/uavPatrolInspection/Analysis/Intelligent';
import Information from '$src/page/uavPatrolInspection/Information/Information';
import Mine from '$src/page/Mine/Mine';

const Tab = createBottomTabNavigator({
    home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
        },
    },
    analysis: {
        screen: Analysis,
        navigationOptions: {
            tabBarLabel: '综合分析',
        },
    },
    information: {
        screen: Information,
        navigationOptions: {
            tabBarLabel: '信息',
        },
    },
    mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
        },
    },
}, tabConfig);

export default Tab;
