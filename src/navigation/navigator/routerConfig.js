import { StackViewTransitionConfigs, StackViewStyleInterpolator } from 'react-navigation-stack';

const RouterConfig = {
    headerMode: 'none',
    cardOverlayEnabled: true,
    transitionConfig: () => ({
        transitionSpec: StackViewTransitionConfigs.SlideFromRightIOS,
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
};
export default RouterConfig;
