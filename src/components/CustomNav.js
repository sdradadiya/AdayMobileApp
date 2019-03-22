/* @flow */

import React, {
    Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

let {width} = Dimensions.get('window');

// Type checking using Flow
type CustomNavProps = {
    rightBtn: string,
    title: string,
    leftBtn: string,
};

/**
 * Custom navigation bar used primarily on the sign up and sign in forms
 * @author Rahkeem
 * @todo testing on Android due to different status bar heights
 * @type {Object}
 */
export default class CustomNav extends Component {
    constructor(props: CustomNavProps) {
        super(props);
    }

    render() {
        return (
            <View style={styles.headerContainer}>

                <TouchableOpacity onPress={()=>Actions.home({})} style={{ flex: 1, width: width/3 }}>
                    <Text style={{color: '#0079FE', fontWeight: '600', fontSize: 15}}>{this.props.rightBtn}</Text>
                </TouchableOpacity>

                <View style={{ flex: 1, width: width/3 }}>
                    <Text style={{color: '#0022A1', fontWeight: '600', fontSize: 15, alignSelf: 'center' }}>{this.props.title}</Text>
                </View>

                <TouchableOpacity onPress={()=>Actions.home({})} style={{ flex: 1, justifyContent: 'flex-end', width: width/3 }}>
                    <Text style={{color: '#0079FE', fontWeight: '600', fontSize: 15, textAlign: 'right'}}>{this.props.leftBtn}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    props: CustomNavProps
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 44, // standard ios height - width 96 of the left component
        width: width,
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#B8B8B8',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
    },
});
