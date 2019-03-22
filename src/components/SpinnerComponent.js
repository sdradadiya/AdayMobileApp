/**
 * Created by Vardan on 2/1/2017.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    ActivityIndicator
} from 'react-native';

let {height, width} = Dimensions.get('window');

export default class SpinnerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0)
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim, {
                toValue: 1,
                duration: 100
            }
        ).start();
    }

    render() {

        return (
            <Animated.View
                style={{opacity: this.state.fadeAnim}}>

                <View style={{
                    flex: 1,
                    height: height,
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "rgba(255,255,255,0.6)",
                    zIndex: 100
                }}>

                    <ActivityIndicator size="large" color="#002DB0" />

                </View>

            </Animated.View>
        );
    };
}

const styles = StyleSheet.create({});
