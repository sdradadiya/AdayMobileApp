/* @flow */

import React, {Component} from 'react';
import {
    Input,
    Thumbnail
} from 'native-base';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CustomNav from './CustomNav';
//import {Tracker} from "../constants/index";

let { width } = Dimensions.get('window');

/**
 * The signup form for both team members and managers
 * @author Vardan, Robert
 * @todo re-enable validation, currently disabled for testing purposes
 * @todo loading button for server requests: https://mobile.ant.design/components/button/
 * @type {Object}
 */
export default class SignUpFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            zipCode: '',
            validationError: false,
            visibleFieldButton: require('./assets/visibleInputField.png'),
            unVisibleFieldButton: require('./assets/unVisibleInputField.png'),
            isPasswordVisible: false
        };
        this.signUpAction = this.signUpAction.bind(this);
        this.validation = this.validation.bind(this);
       //Tracker.trackScreenView("Sign Up Form");

    }

    onInputFieldChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    changePasswordVisibility() {
        const status = !this.state.isPasswordVisible;
        this.setState({
            isPasswordVisible: status
        });
    }

    signUpAction() {
        //  this.props.actions.loginAction(this.state.email, this.state.password);
    }

    /**
     * @function validation
     * @description This method confirms that all required fields are entered and pushes a new scene to the stack when validated
     * @return {[type]} [description]
     */
    validation() {
        const {
            email,
            password,
            firstName,
            lastName,
            zipCode
        } = this.state;
        let isValid = true;
        if (!email && !password && !firstName && !lastName && !zipCode) {
            isValid = false;
        }
        this.setState({
            validationError: !isValid
        });
        isValid && this.signUpType();
    }

    render() {
        const {
            isPasswordVisible,
            visibleFieldButton,
            unVisibleFieldButton,
            validationError
        } = this.state;


        {
            /**
             * @function _head
             * @description  this is the custom navigation bar for the page
             */
        }

        const _button160 = props => (
            <TouchableOpacity style={{
                    display: 'flex',
                    backgroundColor: '#002DB0',
                    height: 40,
                    width: width / 2,
                    borderRadius: 2,
                    alignSelf: 'center',
                    shadowRadius: 2,
                    shadowColor: '#000000',
                shadowOffset: {
                        width: 1,
                        height: 2,
                },
                    shadowOpacity: 0.5,
                    marginTop: 20,
                    marginBottom: 20
            }} onPress={()=>Actions.SignUpType({})}>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                            fontSize: 16,
                            fontFamily: 'Lato-Regular',
                            color: 'white',
                            fontWeight: 'bold',
                    }}> {props.children} </Text>
                </View>

            </TouchableOpacity>
        )

        return (
            <View style={styles.container}>


                {/*Source: globals*/}
                <StatusBarSpacer />

                <View style={{ backgroundColor: 'white', flex: 64/677 }}>
                    <CustomNav rightBtn='Cancel'  title='Account Signup'/>
                </View>

                <View style={{ backgroundColor: 'white', flex: 625/677 }} >

                    {/* Subheader  for 135/667*/}
                    <View style={styles.pageHeaderLogoContainer}>
                        <Image style={styles.logoImage}
                            source={require('./assets/logos/aday-full-logo.png')}/>
                    </View>

                    {/* Body for 354/667*/}
                    <View style={{ flex:(354/667), maxWidth: width - 20, marginLeft: (width/2 - (width/2 -10)) }}>

                        {/* First Name Input Field */}
                        <View style={styles.inputFieldContainer}>
                            <View style={styles.inputFieldIconContainer}>
                                <Image style={{width: 25, height: 22}} source={require('./assets/First_Name.png')}/>
                            </View>
                            <Input
                                onChangeText={(text) =>  this.onInputFieldChange('firstName', text)}
                                inputColorPlaceholder="rgba(74,74,74,0.5)"
                                placeholderTextColor="rgba(74,74,74,0.5)"
                                placeholder="FIRST NAME"
                                style={{height: 40}}
                            />
                        </View>

                        {/* Last Name Input Field */}
                        <View style={styles.inputFieldContainer}>
                            <View style={styles.inputFieldIconContainer}>
                                <Image style={{width: 25, height: 22}} source={require('./assets/Last_Name.png')}/>
                            </View>
                            <Input
                                onChangeText={(text) =>  this.onInputFieldChange('lastName', text)}
                                inputColorPlaceholder="rgba(74,74,74,0.5)"
                                placeholderTextColor="rgba(74,74,74,0.5)"
                                placeholder="LAST NAME"
                                style={{height: 40}}
                            />
                        </View>

                        {/* Password */}
                        <View style={styles.inputFieldContainer}>
                            <View style={styles.inputFieldIconContainer}>
                                <Image style={{width: 25, height: 25}} source={require('./assets/login_key.png')}/>
                            </View>
                            <Input
                                onChangeText={(text) =>  this.onInputFieldChange('password', text)}
                                inputColorPlaceholder="rgba(74,74,74,0.5)"
                                placeholderTextColor="rgba(74,74,74,0.5)"
                                style={{height: 40}}
                                placeholder="PASSWORD"
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity onPress={() => this.changePasswordVisibility()} style={styles.inputFieldButtonContainer}>
                                <Image style={{width: 25, height: 25}} source={isPasswordVisible ? visibleFieldButton : unVisibleFieldButton}/>
                            </TouchableOpacity>
                        </View>

                        {/* Zip Code Input */}
                        <View style={styles.inputFieldContainer}>
                            <View style={styles.inputFieldIconContainer}>
                                <Image style={{width: 25, height: 25}} source={require('./assets/Icons_Home.png')}/>
                            </View>
                            <Input
                                onChangeText={(text) =>  this.onInputFieldChange('zipCode', text)}
                                inputColorPlaceholder="rgba(74,74,74,0.5)"
                                placeholderTextColor="rgba(74,74,74,0.5)"
                                placeholder="ZIP CODE"
                                style={{height: 40}}
                            />
                        </View>

                        {/* Email Address Input */}
                        <View style={styles.inputFieldContainer}>
                            <View style={styles.inputFieldIconContainer}>
                                <Image style={{width: 25, height: 25}} source={require('./assets/login_email.png')}/>
                            </View>
                            <Input
                                onChangeText={(text) =>  this.onInputFieldChange('email', text)}
                                inputColorPlaceholder="rgba(74,74,74,0.5)"
                                placeholderTextColor="rgba(74,74,74,0.5)"
                                placeholder="EMAIL ADDRESS"
                                style={{height: 40}}
                            />
                        </View>

                        {validationError &&
                            <Text style={styles.validationError}>
                                Please fill all fields above!
                            </Text>
                        }
                    </View>

                    {/* Subheader  for 133/667*/}
                    <View style={{ flex: 180/667 }}>

                        <View style={{ minWidth: width  }} />

                        <View style={styles.footer}>
                            <Text style={ styles.bodyText }>BY USING ADAY YOU AGREE TO THE </Text>
                            <TouchableOpacity onPress={()=>Actions.PrivacyPolicy({})}>
                                <Text style={styles.touchabletext}>PRIVACY POLICY</Text>

                            </TouchableOpacity>
                            <Text style={ styles.bodyText }> AND THE </Text>
                            <TouchableOpacity onPress={()=>Actions.TermsOfService({})}>
                                <Text style={styles.touchabletext}>TERMS OF SERVICE</Text>
                            </TouchableOpacity>
                        </View>

                        <_button160>CREATE ACCOUNT</_button160>

                        <View style={styles.footer}>
                            <Text style={ styles.bodyText }> ALREADY HAVE AN ACCOUNT? </Text>
                            <TouchableOpacity onPress={()=>Actions.Login({})}>
                                <Text style={styles.touchabletext}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: 'stretch',
        width: width,
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        flex: 1
    },
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
    /*
     * For the subheader portion of the page
     */

    pageHeaderLogoContainer: {
        flex: (135 / 667),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        maxWidth: 60,
        resizeMode: 'contain'
    },

    /*
     * Styles related to the input fields
     */
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
        width: 40,
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
    validationError: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red'
    },
    footer: {
        //flexDirection needed as each component otherwise shows up on different lines
        flexDirection: 'row',
        flexWrap: 'wrap',
        //alignItems is needed or else the second row doesn't appear
        alignItems: 'center',
        //justifycontent centers the two rows of the text
        justifyContent: 'center',
        maxWidth: width - 20
    },
    touchabletext: {
        color: '#007AFF',
        fontSize: 12,
        fontFamily: 'Lato-Regular',
    },
    bodyText: {
        fontSize: 12,
        fontFamily: 'Lato-Regular',
        color: '#505050',
        alignSelf: 'center',
        justifyContent: 'center'
    },
});
