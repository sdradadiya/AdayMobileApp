/**
 * Created by Vardan on 6/27/2017.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    Button,
    Dimensions,
    Alert,AsyncStorage
} from 'react-native';
import {Input} from 'native-base';
import {gql, graphql, compose} from 'react-apollo';
import {Actions} from 'react-native-router-flux';
let { width} = Dimensions.get('window');
//import {Tracker} from "../../constants/index";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            isOldPasswordVisible: true,
            isNewPasswordVisible: false,
            visibleFieldButton: require('./../assets/visibleInputField.png'),
            unVisibleFieldButton: require('./../assets/unVisibleInputField.png'),
            errorMessageText: "",
            passwordReset: false, 
        };
        this.onInputFieldChange = this.onInputFieldChange.bind(this);
        this.changePasswordVisibility = this.changePasswordVisibility.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.validation = this.validation.bind(this);
       //Tracker.trackScreenView("Change Password");

    }

    onInputFieldChange(name, value) {
        this.setState({[name]: value});
    }

    changePasswordVisibility(name) {
        const stateName = 'is' + name + 'Visible';
        const status = !this.state[stateName];
        this.setState({[stateName]: status});
    }
    validation() {
        let errorMessage = "";
        if(this.state.newPassword != this.state.newPasswordTwo){
            errorMessage = "New Passwords Do Not Match.";
        }
        if(!this.state.oldPassword || !this.state.newPassword){
            errorMessage = "Please Fill Out All Above Fields.";
        }
        errorMessage ? this.setState({errorMessageText: errorMessage}) : this.updatePassword();
    }

    updatePassword() {
        const update = {
            id: this.props.userId,
            password: this.state.newPassword,
        };
        this.props.updatePassword({variables: update})
            .then((response) => {
                AsyncStorage.getItem('email').then((value)=>{
                   //Tracker.trackEvent(value, "Update User Password");
                }).catch((err)=>{
                   //Tracker.trackEvent("Not Define", "Update User Password");
                })
                this.setState({passwordReset: true})
            })
            .catch((err) => {
                Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                this.setState({errorMessageText: "Did not save new password"})
            });
        
    }

    render() {
        let { errorMessageText, passwordReset, isNewPasswordVisible, isNewPasswordTwoVisible, isOldPasswordVisible, unVisibleFieldButton, visibleFieldButton } = this.state

        return (
            <View style={styles.container}>
                  { !passwordReset &&
                    <View>
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputFieldIconContainer}>
                            <Image style={{width: 20, height: 20}} source={require('./../assets/login_key.png')}/>
                        </View>
                        <Input
                            onChangeText={(text) =>  this.onInputFieldChange('oldPassword', text)}
                            inputColorPlaceholder="rgba(74,74,74,0.5)"
                            placeholderTextColor="rgba(74,74,74,0.5)"
                            placeholder="OLD PASSWORD"
                            secureTextEntry={!isOldPasswordVisible}
                        />
                        <TouchableOpacity onPress={() => this.changePasswordVisibility('OldPassword')} style={styles.inputFieldButtonContainer}>
                            <Image style={{width: 20, height: 20}} source={isOldPasswordVisible ? visibleFieldButton : unVisibleFieldButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputFieldIconContainer}>
                            <Image style={{width: 20, height: 20}} source={require('./../assets/login_key.png')}/>
                        </View>
                        <Input
                            onChangeText={(text) =>  this.onInputFieldChange('newPassword', text)}
                            inputColorPlaceholder="rgba(74,74,74,0.5)"
                            placeholderTextColor="rgba(74,74,74,0.5)"
                            placeholder="NEW PASSWORD"
                            secureTextEntry={!isNewPasswordVisible}
                        />
                        <TouchableOpacity onPress={() => this.changePasswordVisibility('NewPassword')} style={styles.inputFieldButtonContainer}>
                            <Image style={{width: 20, height: 20}} source={isNewPasswordVisible ? visibleFieldButton : unVisibleFieldButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.inputFieldIconContainer}>
                            <Image style={{width: 20, height: 20}} source={require('./../assets/login_key.png')}/>
                        </View>
                        <Input
                            onChangeText={(text) =>  this.onInputFieldChange('newPasswordTwo', text)}
                            inputColorPlaceholder="rgba(74,74,74,0.5)"
                            placeholderTextColor="rgba(74,74,74,0.5)"
                            placeholder="RE-ENTER NEW PASSWORD"
                            secureTextEntry={!isNewPasswordTwoVisible}
                        />
                        <TouchableOpacity onPress={() => this.changePasswordVisibility('NewPasswordTwo')} style={styles.inputFieldButtonContainer}>
                            <Image style={{width: 20, height: 20}} source={isNewPasswordVisible ? visibleFieldButton : unVisibleFieldButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.errorMessageTextContainer}>
                        {!!errorMessageText &&
                        <Text style={styles.errorMessageText}>
                            {errorMessageText}
                        </Text>
                        }

                    </View>
                  
                        <View style={styles.updateButtonContainer}>
                            <Button title="UPDATE" onPress={this.validation} style={styles.updateButton}/>
                        </View>
                 </View>
                }
                { passwordReset &&
                     <View>
                         <Text style={styles.successMessageText}>
                            Password Reset Successful. You will use this new password next time you log in.
                        </Text>
                        <Button title="GO BACK" style={[styles.updateButton,{marginTop: 20}]} onPress={() => Actions.pop()} />
                     </View>
                }
            </View>


        );
    }
}

const updatePassword = gql`
  mutation updatePassword($id: Uuid!, $password: String! ) {
    updatePassword(input: { id: $id , password: $password }) {
        boolean
    }
  }`

export default compose(
    graphql(updatePassword, {
        name: 'updatePassword'
    })
)(ChangePassword);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                paddingTop: 64
            },
            android: {
                paddingTop: 54
            }
        }),
        paddingHorizontal: 5
    },
    inputFieldContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        margin: 10,
        height: 40,
        justifyContent: 'center',
        borderColor: 'rgba(74,74,74,0.5)',
        borderRadius: 6
    },
    inputFieldIconContainer: {
        backgroundColor: 'rgba(153,153,153,0.3)',
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputFieldButtonContainer: {
        borderWidth: 1,
        borderColor: 'rgba(74,74,74,0.5)',
        borderRadius: 6,
        margin: 5,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorMessageTextContainer: {
        marginTop: 10,
        justifyContent: 'center'
    },
    errorMessageText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    successMessageText: {
        color: 'blue',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    updateButtonContainer: {
        alignSelf: 'center',
        margin: 20,
        width: width / 2
    },
    updateButton: {
        backgroundColor: '#0022A1',
        marginTop: 20
    }
});