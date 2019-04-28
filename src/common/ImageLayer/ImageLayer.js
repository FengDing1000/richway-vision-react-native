import React, {Component} from 'react';
import {
    StyleSheet, BackHandler, Platform, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {FadeAnimation, Dialog} from 'react-native-popup-dialog';
import {inject, observer} from 'mobx-react/index';

const {width} = Dimensions.get(`window`);

@inject([`imageLayer`])
@observer
class Page extends Component {
    static propTypes = {
        imageLayer: PropTypes.object,
    }

    static defaultProps = {
        imageLayer: {},
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (Platform.OS === `android`) {
            BackHandler.addEventListener(`hardwareBackPress`, this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === `android`) {
            BackHandler.removeEventListener(`hardwareBackPress`, this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {imageLayer} = this.props;
        const {visibility} = imageLayer;
        if (visibility) {
            this.close();
            return true;
        }
        return false;
    }

    close = () => {
        const {imageLayer} = this.props;
        imageLayer.hide();
    }

    render() {
        const {imageLayer} = this.props;
        const {visibility, image} = imageLayer;
        return (
            <Dialog
                rounded={false}
                onTouchOutside={this.close}
                onDismiss={() => {
                    imageLayer.setHideView();
                }}
                width={1}
                overlayOpacity={0.6}
                style={{borderRadius: 0}}
                visible={visibility}
                dialogAnimation={new FadeAnimation({
                    toValue: 0, // optional
                    animationDuration: 600, // optional
                    useNativeDriver: true, // optional
                })}
            >
                {image}
            </Dialog>
        );
    }
}

export default Page;
