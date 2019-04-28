import React, {PureComponent} from 'react';
import {
    View, StyleSheet, ActivityIndicator,
} from 'react-native';
import {
    Dialog, DialogButton, DialogContent,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import TextView from './TextView';
import BaseStyle from "../css/BaseStyle";


const styles = StyleSheet.create({
    content: {
        borderRadius: 10,
        width: 100,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000073'
    },
});

let effect = null;

class Page extends PureComponent {
    static open = () => {
		global.layerModal=true;
        effect.setState({
            defaultAnimationDialog: true,
        });
    }

    static close = () => {
		global.layerModal=false;
        effect.setState({
            defaultAnimationDialog: false,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            defaultAnimationDialog: false,
        };
        effect = this;
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        effect = null;
    }

    render() {
        const {defaultAnimationDialog} = this.state;
        return (
            <Dialog
                overlayOpacity={0}
                dialogStyle={styles.content}
                visible={defaultAnimationDialog}
            >
                <ActivityIndicator color="white"/>
                <TextView style={{color: 'white', marginTop: 10}}>正在加载...</TextView>
            </Dialog>
        );
    }
}

export default Page;
