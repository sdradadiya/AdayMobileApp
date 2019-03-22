/**
 * Created by Rahkeem on 8/8/2017
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    ScrollView,
} from 'react-native';
//import {Tracker} from "../constants/index";

export default class SignUpManagerUnavailable extends Component {
    constructor(props){
        super(props);
       //Tracker.trackScreenView("SignUp Manager Unavailable");

    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: '#F7F7F7',}}>
            <ScrollView>
            <View style={styles.container}>
                 <View style={{width: 289, alignItems: 'center', marginTop: '5%'}}>
                     <Image style={{width: 186, height: 186, marginBottom: 30}}
                           source={require('./assets/login-unavailable.png')}/>
                     <Text style={styles.emptyMessage}>Join us at www.joinaday.com</Text>
                     <Text style={styles.emptyMessageInstruction}>
                        We're currently developing our manager application. In the meantime, please register through our website!
                     </Text>
                 </View>
            </View>
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 5,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        ...Platform.select({
            ios: {
                paddingTop: 64
            },
            android: {
                paddingTop: 54
            }
        }),
    },
    emptyMessage: {
        marginTop: 10,
        fontSize: 19.0,
        fontFamily: 'Roboto',
        color: 'black',
        textAlign: 'center',
    },
    emptyMessageInstruction: {
        marginTop: 10,
        fontSize: 15.2,
        fontFamily: 'Lato',
        color: '#494949',
        textAlign: 'center',
    },
});
