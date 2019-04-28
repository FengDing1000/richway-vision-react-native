import React, {PureComponent} from 'react';
import {
    TouchableOpacity,
} from 'react-native';

export default class ButtonView extends PureComponent {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                {...this.props}
            >{
                this.props.children
            }
            </TouchableOpacity>
        );
    }
}
