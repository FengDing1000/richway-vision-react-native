import React, {PureComponent} from 'react';
import {
    View, StyleSheet, TouchableHighlight, BackHandler, Platform,
} from 'react-native';
import {
    Dialog, DialogButton, DialogContent,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import TextView from './TextView';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        borderRadius: 10,
        minHeight: 108,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContent: {
        minHeight: 70,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        height: 38,
        width: '100%',
        borderTopWidth: 0.8,
        borderColor: '#f6f6f6',
        flexDirection: 'row'
    },
    borderView: {
        width: 0.8,
        height: '100%',
        backgroundColor: '#f6f6f6'
    }
});

let effect = null;

class Page extends PureComponent {
    static open = (params) => {
        global.Dialog = true;
        if (!global.layerModal) {
            if (effect.state.defaultAnimationDialog === true) {
                if (effect.state.modal) {
                    return;
                }
                effect.setState({
                    defaultAnimationDialog: false,
                    modal: false,
                });
            } else {
                effect.setState({
                    defaultAnimationDialog: true,
                    text: params.text || '',
                    ok: params.ok || (() => {
                    }),
                    modal: params.modal || false,
                    alert: params.alert || false,
                });
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            defaultAnimationDialog: false,
            text: '',
            ok: () => {
            },
            modal: false,
            alert: false,
        };
        effect = this;
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        effect = null;
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid=()=>{
        this.onTouchOutside();
        return true;
    }

    close = () => {
        global.Dialog = false;
        this.setState({defaultAnimationDialog: false});
    }

    okButton = () => {
        const {ok} = this.state;
        this.setState({defaultAnimationDialog: false}, () => {
            ok();
        });
    }

    onTouchOutside = () => {
        const {modal} = this.state;
        if (!modal) {
            this.close();
        }
    }

    actions = () => {
        const {alert} = this.state;
        if (alert) {
            return [
                <TouchableHighlight
                    style={[{borderBottomRightRadius: 10, borderBottomLeftRadius: 10}, styles.buttons]}
                    underlayColor={'#E9E9E9'}
                    onPress={this.okButton}
                    key="button-1"
                >
                    <View>
                        <TextView style={{color: '#FF9727', fontSize: 12}}>确定</TextView>
                    </View>
                </TouchableHighlight>
            ];
        }
        return [
            <TouchableHighlight
                style={[{borderBottomLeftRadius: 10}, styles.buttons]}
                underlayColor={'#E9E9E9'}
                onPress={this.close}
                key="button-1"
            >
                <View>
                    <TextView style={{color: '#5c5c5c', fontSize: 12}}>取消</TextView>
                </View>
            </TouchableHighlight>,
            <View style={styles.borderView} key='button-border'/>,
            <TouchableHighlight
                style={[{borderBottomRightRadius: 10}, styles.buttons]}
                underlayColor={'#E9E9E9'}
                onPress={this.okButton}
                key="button-2"
            >
                <View>
                    <TextView style={{color: '#FF9727', fontSize: 12}}>确定</TextView>
                </View>
            </TouchableHighlight>
        ];
    }


    render() {
        const {text, defaultAnimationDialog} = this.state;
        const button = this.actions();
        return (
            <Dialog
                onTouchOutside={this.onTouchOutside}
                onDismiss={this.close}
                width={0.65}
                overlayOpacity={0.3}
                style={styles.container}
                dialogAnimation={new ScaleAnimation({
                    toValue: 0, // optional
                    useNativeDriver: true, // optional
                })}
                visible={defaultAnimationDialog}
            >
                <View style={styles.content}>
                    <View style={styles.textContent}>
                        <TextView>{text}</TextView>
                    </View>
                    <View style={styles.bottom}>
                        {this.actions()}
                    </View>
                </View>
            </Dialog>
        );
    }
}

export default Page;
