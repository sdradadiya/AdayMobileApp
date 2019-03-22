/**
 * Created by Vardan on 6/27/2017.
 */
import React, {
    Component
} from 'react';
import {
    AsyncStorage,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import {Tracker} from "../../constants/index";
/*
 * Consider: https://react-native-training.github.io/react-native-elements/API/lists/
 */

export default class SettingsComponent extends Component {
    constructor(props){
        super(props);
       //Tracker.trackScreenView("Setting");
    }

    logout = () => {
        this.props.actions.clearUserData()

        AsyncStorage.getItem('email').then((value)=>{
           //Tracker.trackEvent(value, "LogOut from APP");
        }).catch((err)=>{
           //Tracker.trackEvent("Not Define", "LogOut from APP");
        })
        AsyncStorage.setItem('email', "", () => {
            AsyncStorage.setItem('password', "", () => {
               Actions.reset("home")
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => Actions.AlertSettings({userId: this.props.userId})} style={styles.settingRowContainer}>
                    <View style={styles.settingNameContainer}>
                        <Image style={{width: 20, height: 20}} source={require('./../assets/icons/alert.png')}/>
                        <Text style={styles.settingName}>Alerts</Text>
                    </View>
                    <Image style={{width: 25, height: 25}} source={require('./../assets/forward-arrow.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.changePassword({userId: this.props.userId})} style={styles.settingRowContainer}>
                    <View style={styles.settingNameContainer}>
                        <Image style={{width: 20, height: 20}} source={require('./../assets/login_key.png')}/>
                        <Text style={styles.settingName}>Change Password</Text>
                    </View>
                    <Image style={{width: 25, height: 25}} source={require('./../assets/forward-arrow.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.TermsOfService({})}  style={styles.settingRowContainer}>
                    <View style={styles.settingNameContainer}>
                        <Image style={{width: 20, height: 20}} source={require('./../assets/termsOfService.png')}/>
                        <Text style={styles.settingName}>Terms of Service</Text>
                    </View>
                    <Image style={{width: 25, height: 25}} source={require('./../assets/forward-arrow.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.PrivacyPolicy({})}  style={styles.settingRowContainer}>
                    <View style={styles.settingNameContainer}>
                        <Image style={{width: 20, height: 20}} source={require('./../assets/privacyPolicy.png')}/>
                        <Text style={styles.settingName}>Privacy Policy</Text>
                    </View>
                    <Image style={{width: 25, height: 25}} source={require('./../assets/forward-arrow.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.logout()} style={styles.settingRowContainer}>
                    <View style={styles.settingNameContainer}>
                        <Image style={{width: 20, height: 20}} source={require('./../assets/logOut.png')}/>
                        <Text style={styles.settingName}>Log Out</Text>
                    </View>
                    <Image style={{width: 25, height: 25}} source={require('./../assets/forward-arrow.png')}/>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    settingRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F7F7F7',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    settingNameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    settingName: {
        fontSize: 17,
        fontFamily: "Lato-Regular",
        paddingHorizontal: 20,
        color: '#4A4A4A'
    }
});
