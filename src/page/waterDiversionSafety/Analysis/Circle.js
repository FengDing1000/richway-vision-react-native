import React, { PureComponent } from 'react';
import {
    StyleSheet, View,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { TextView } from '@rich/react-native-richway-component';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        backgroundColor: 'transparent',
    },
    content: {
        borderColor: '#96DEE8',
        borderBottomWidth: 1,
        paddingBottom: 5,
        paddingHorizontal: 5,
        marginBottom: 5,
    },
});
export default class Circle extends PureComponent {
    static propTypes = {
        warn: PropTypes.number,
        mount: PropTypes.number,
        name: PropTypes.string,
    }

    static defaultProps = {
        warn: 0,
        mount: 0,
        name: '',
    }

    render() {
        const { warn, mount, name } = this.props;
        return (
          <View style={styles.container}>
              <AnimatedCircularProgress
                  size={130}
                  width={8}
                  backgroundWidth={6}
                  fill={mount === 0 ? 0 : warn * 100 / mount}
                    tintColor="#2196F3"
                    backgroundColor="#9E9E9E"
                    arcSweepAngle={360}
                  rotation={180}
                  lineCap="square"
                >
                  {() => (
                      <View style={{ alignItems: 'center' }}>
                          <TextView style={[styles.text, { fontWeight: 'bold', fontSize: 20 }]}>{warn}</TextView>
                          <View style={styles.content}>
                              <TextView style={[styles.text, { fontSize: 11 }]}>预警站点</TextView>
                            </View>
                          <TextView style={[styles.text, { fontWeight: 'bold', fontSize: 14 }]}>{mount}</TextView>
                          <TextView style={[styles.text, { fontSize: 11 }]}>总站点</TextView>
                        </View>
                    )}
                </AnimatedCircularProgress>
              <TextView style={[styles.text, { fontSize: 11, marginTop: 10 }]}>{name}</TextView>
            </View>
        );
    }
}
