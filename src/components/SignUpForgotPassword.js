import React, {Component} from 'react';
import {
    Row,
    List,
    ListItem,
    Input,
    Thumbnail
} from 'native-base';
import {
    TouchableHighlight,
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal,
    ScrollView,
    Keyboard,
    Alert,
    AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CustomNav from './CustomNav';
import KeyboardSpacer from 'react-native-keyboard-spacer';
//import {Tracker} from '../constants';

let {width} = Dimensions.get('window');
/**
 * @todo add https://www.lottiefiles.com/294-delete-slash
 * @todo Password reset
 * @type {Object}
 */
export default class ForgotPwdComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            validationError: false,
            modalVisible: false,
            emailNotFound: false,
            requestFailed: false,
            bottomMargin:0,
            topMargin:0,
        };
        this.sendPasswordReset = this.sendPasswordReset.bind(this);
        this.validation = this.validation.bind(this);
    }
    _keyboardDidShow = (e) => {
        const height=e.endCoordinates.height;
        this.setState({
            bottomMargin: -height,
            topMargin:-80,
        })
    }

    _keyboardDidHide =(e)=> {
        this.setState({
            bottomMargin: 0,
            topMargin:0,
        })
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onInputFieldChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    sendPasswordReset(email) {
        fetch('https://forward-chess-157313.appspot.com/api/password', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email
          }),
        }).then((response) => { 
            console.log(response)
            AsyncStorage.getItem('email').then((value)=>{
               //Tracker.trackEvent(value, "Password Reset");
            }).catch((err)=>{
               //Tracker.trackEvent("Not Define", "Password Reset");
            })

            if (response.status == 500) {
                this.setState({
                    emailNotFound: true
                });
            } else if (response.status == 200) {
               //Tracker.trackScreenView("Home");
               //Tracker.trackEvent(email, "Forgot Password Successfull");
                this.setModalVisible(true) 
            }
        }).catch((err) => {
            Alert.alert('ADay','Your Request Couldn\'t Be Completed');
            this.setState({
                requestFailed: true
            });
        });
    }

    validation() {
        const {
            email,
        } = this.state;

        let isValid = true;

        if (!email) {
            isValid = false;
        } else {
            var lowerCaseEmail = email.toLowerCase()
            this.sendPasswordReset(lowerCaseEmail)
        }

        this.setState({
            validationError: !isValid,
             emailNotFound: false
        });

    }

    render() {
        const {
            validationError,
            emailNotFound,
            requestFailed
        } = this.state;

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
                marginTop: 15,
                marginBottom: 20
            }} onPress={this.validation}>

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

                <View style={{ backgroundColor: 'white', flex: 70/667 }}>
                    <CustomNav rightBtn='Back'  title='Reset'/>
                </View>
                <ScrollView>

                <View style={{ backgroundColor: 'white', flex: 453/667}}>

                    {/*Stub for better solution...*/}
                    <View style={{ minWidth: width  }} />

                    <_br />
                    <Text style={{color: '#000', alignSelf: 'center', fontSize: 20, fontFamily: 'RobotoCondensed-Regular' }}> NEED TO RESET YOUR PASSWORD? </Text>
                    <Text style={{color: '#595959', alignSelf: 'center', fontSize: 14, fontFamily: 'Lato-Regular' }}>No problem. We'll send a new password by email.</Text>

                    <View style={styles.pageHeaderLogoContainer}>
                        <Image style={styles.logoImage}
                            source={{uri: 'https://s3.us-east-2.amazonaws.com/aday-mail-alerts/password-lost.png'}}/>
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
                            Please Enter Your Email Address
                        </Text>
                    }
                    {emailNotFound &&
                        <Text style={styles.validationError}>
                            Email Not Found.
                        </Text>
                    }
                    { requestFailed && 
                        <Text style={styles.validationError}>
                            There was an error resetting password.
                        </Text>
                    }

                    {/* Beginning of code for the module*/}
                    <View style={{marginTop: 2}}>
                        <Modal
                            animationType={"slide"}
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                Actions.home({});
                            }}>

                            <View style={{marginTop: 2}}>
                                <View>
                                    <_br />
                                    <Text style={{color: '#000', alignSelf: 'center', fontSize: 24, fontFamily: 'Roboto' }}> We've Sent You An Email </Text>

                                    <View style={styles.pageHeaderLogoContainer}>
                                        <Image style={styles.logoImage}
                                            source={{uri: 'https://s3.us-east-2.amazonaws.com/aday-mail-alerts/invitation-envelope.png'}}/>
                                    </View>

                                    <Text style={{color: '#595959', alignSelf: 'center', fontSize: 16, fontFamily: 'Lato-Regular' }}>Click the "reset password" button in your email:</Text>
                                    <Text style={{color: '#595959', alignSelf: 'center', fontSize: 16, fontFamily: 'Lato-Regular' }}>{this.state.email}</Text>
                                    <_br />

                                    <TouchableHighlight style={styles.resetEmailButton} onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        Actions.home({});
                                    }}>
                                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={styles.buttonText}>RETURN HOME</Text>
                                        </View>
                                    </TouchableHighlight>

                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={{height: 100}}> 
                    <_button160>RESET MY PASSWORD</_button160>
                    </View>
                </View>
                    <KeyboardSpacer/>
                </ScrollView>
                {/* Stub until better solution found to make sure background is white */}
                {/*<View style={{ backgroundColor: 'white', flex: 140/667, width: width}} />*/}
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        marginTop: -5,
        flexDirection: "column",
        // alignItems: 'stretch',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        flex: 1
    },
    pageHeaderLogoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    //Create global style, shared with SignUpFormComponent.js
    inputFieldContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        maxWidth: width - 20,
        margin: 10,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
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
        paddingTop: 5,
        fontFamily: 'Lato-Regular',
        fontSize: 14,
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
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        color: '#505050',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    resetEmailButton: {
        display: 'flex',
        backgroundColor: '#00A863',
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
        marginTop: 10,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: 'white',
        fontWeight: 'bold',
    }
});
