import React, {Component} from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import globalStyles from '../styles';
//import {Tracker} from "../constants/index";

/**
 * @description manager and team members (i.e. employeers) have different applications. This screen
 * is used to disambiguate the two types of users; hence, the name "SignUpTypeComponent"
 *
 * URLs available for the images contained on this worksheet:
 * Team Member Signup: https://s3.us-east-2.amazonaws.com/aday-mail-alerts/team_member_signup_two.png
 * Manager Signup: https://s3.us-east-2.amazonaws.com/aday-mail-alerts/manager_signup_two.png
 *ˆˆˆ
 *  @author Rahkeem
 */

export default class SignUpTypeComponent extends Component {
    constructor(props){
        super(props);
       //Tracker.trackScreenView("SignUp Type");
    }

    render() {

        return (
            <View style = {globalStyles.flexColCtr(1)}>

                {/* Start of Title Text*/}
                <Text style={{ flex: 0.15, textAlign: 'center'}}>
                    <_br />
                    <_h2> Welcome to Aday! </_h2>
                    <_br />
                    <_h3> Please choose your account type </_h3>
                </Text>
                {/* End of Title Text*/}

                {/* Start of Account Type Buttons*/}
                <View style = {globalStyles.flexColCtr(0.85)}>
                    <TouchableOpacity
                        style = {Object.assign( {flex: 0.49}, globalStyles.squareCenter95)}
                        onPress = {()=>Actions.ShiftDetails({})
                        }>
                        <Image
                            source={require('./assets/team_member_signup_two.png')}/>
                    </TouchableOpacity>

                    <View style={{ flex: 0.02 }} />

                    <TouchableOpacity
                        style = {Object.assign( {flex: 0.49}, globalStyles.squareCenter95 )}
                        onPress={()=>Actions.ManagerWaiting({text:'GENERAL MANAGER'})
                        }>
                        <Image
                            source={require('./assets/manager_signup_two.png')}
                        />
                     </TouchableOpacity>
                 </View>
                 {/* End of Account Type Buttons*/}

             </View>
        );
    };
}
