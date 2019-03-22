/* @flow */
import * as React from 'react';
import { Input } from 'native-base';
import {
    AsyncStorage,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    ScrollView,
    Keyboard,
    Alert
} from 'react-native';
let { width } = Dimensions.get('window');
let _constants = require('../constants');
import CustomNav from './CustomNav';
import { Actions } from 'react-native-router-flux';
import { gql,  graphql } from 'react-apollo';
import FCM, {FCMEvent} from 'react-native-fcm';
import {SERVER_URL} from '../constants';
//import {Tracker} from '../constants';

/**
 * @todo loading button for server requests: https://mobile.ant.design/components/button/
 */
var debug = false;
//let tracker1;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginButtonIcon: require('./assets/Login_Button.png'),
            email: '',
            password: '',
            validationError: false,
            visibleFieldButton: require('./assets/visibleInputField.png'),
            unVisibleFieldButton: require('./assets/unVisibleInputField.png'),
            isPasswordVisible: false,
            forgotPasswordStatus: false,
            loginError: false,
            networkError: false,
            topMargin:40
        };
        this.loginAction = this.loginAction.bind(this);
        this.validation = this.validation.bind(this);
        this.forgotPasswordStatusChange = this.forgotPasswordStatusChange.bind(this);

        //Tracker.trackScreenView("Login");
    }


    _keyboardDidShow = (e) => {
        this.setState({
            topMargin: -20
        })
    }

    _keyboardDidHide =(e)=> {
        this.setState({
            topMargin: 40
        })
    }

     componentWillMount() {
         this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
         this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        AsyncStorage.setItem('token', "", () => { 
            AsyncStorage.getItem('email', (err, email) => { 
                if (email) { // email cached, user should be logged in
                    AsyncStorage.getItem('password', (err, password) => { 
                         this.props.mutate({
                                variables: {
                                    data: {
                                        email: email,
                                        password: password
                                    }
                                }
                            }).then(({ data }) => {
                                if (data.authenticate.jwt){
                                    AsyncStorage.setItem('token', data.authenticate.jwt, () => {
                                        Actions.reset("Account", { email: email });
                                    });
                                }
                            })
                    }).catch((err)=>{
                             Alert.alert('ADay','Your Request Couldn\'t Be Completed. Check Your Internet Connection.');
                    })
                } else {
                  this.setState({loading: false})
                }
            })
        })
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

    changePasswordVisibility() {
        const status = !this.state.isPasswordVisible;
        this.setState({ isPasswordVisible: status });
    }

    loginAction() {
        AsyncStorage.setItem('token', '')
        this.setState({ email: this.state.email.toLowerCase() })
        var email = this.state.email.trim().toLowerCase();
        var password = this.state.password;
        this.props.mutate({
            variables: {
                data: {
                    email: email,
                    password: password
                }
            }
        }).then(({ data }) => {
            if (data.authenticate.jwt) {
                AsyncStorage.setItem('token', data.authenticate.jwt, () => {
                    Actions.reset("Account", { email: email });
                });
                AsyncStorage.setItem('email', email);
                AsyncStorage.setItem('password', password);
                //Tracker.trackEvent(email, "Login In Successfull");
                FCM.on(FCMEvent.RefreshToken, (token) => {
                    // fcm token may not be available on first load, catch it here
                    });
                        // iOS: show permission prompt for the first call. later just check permission in user settings
                // Android: check permission in user settings

                FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));

                FCM.getFCMToken().then(token => {
                    debug && console.warn(token)
                    var body = token
                    debug && console.warn (JSON.stringify(this.props))
                    try{
                    debug && console.warn ("Store")
                    debug && console.warn(this.props.store)
                  }catch(error)
                  {
                    Alert.alert('ADay','Your Request Couldn\'t Be Completed');
                    console.warn (error);
                  }
                /*//These mutations doesn't work for weird error on relation user_device. May be used later, for now the workaround is the call to saveToken
                this.props.deleteUserDeviceByUserIdAndOs( {variables:{
                          userId: '07611cfe-fcd8-423c-878b-551d4e19ec47',//this.props.store.myProfile.id,
                          os: 'ANDROID'}
                  }
                  ).then((response) => {
                      console.warn('done');
                  })
                  .catch((err) => {
                      console.warn(err);
                  });
                  //this.props.store.myProfile.id
                  const now = new Date();
                  this.props.createUserDevice({variables:{
                            userId: '07611cfe-fcd8-423c-878b-551d4e19ec47',
                            os: 'ANDROID',
                            token: token,
                            created: now
                        }}
                    ).then((response) => {
                        console.warn('done');
                    })
                    .catch((err) => {
                        console.warn(err);
                    });
                    console.warn('Sending to ');
                    */
                    var osDevice = Platform.OS ==='ios' ? 'ios' : 'android'
                    try {
                    fetch(SERVER_URL + '/api/test', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        token: token,
                        actionType:  'saveToken',
                        user_email: email,
                        os: osDevice,
                      }),
                    });
                    debug && console.warn ("Request sent")
                  }
                  catch (error)
                  {

                    console.warn (error)
                  }
                    debug && console.warn ("DATABASE UPDATED")        // store fcm token in your server



                //this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
                    // optional, do some component related stuff
                //});

                // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
                // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
                // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification

                FCM.getInitialNotification().then(notif => {
                   console.log(notif)
                });
              })

            } else {
                this.setState({ loginError: true, validationError: false, networkError: false });
            }
        }).catch((error) => {
            Alert.alert('ADay','Your Request Couldn\'t Be Completed. Check Your Internet Connection');
            this.setState({ networkError: true, validationError: false, loginError: false });
            console.log('there was an error sending the query', error);
        });
    }

    forgotPasswordStatusChange() {
        this.setState({ loginError: false });
        this.setState({ networkError: false });
        this.setState({ validationError: false });
        this.setState({ forgotPasswordStatus: !this.state.forgotPasswordStatus })
    }

    validation() {
        const { email, password } = this.state;
        let isValid = true;
        if (!email && !password) {
            isValid = false;
        }
        this.setState({ validationError: !isValid, loginError: false, networkError: false});
        isValid && this.loginAction();
    }

    render() {
        const {
            isPasswordVisible,
            visibleFieldButton,
            unVisibleFieldButton,
            validationError,
            loginError,
            networkError
        } = this.state;

        /**
         * Components Section
         */

         const AdaySplashHeader = () => (
             <View style={styles.homePageHeaderContainer}>
                 <Image style={styles.logoImage}
                     source={require('./assets/logos/aday-full-logo.png')}/>
             </View>
         )

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{flex:1,backgroundColor:'#ffffff'}}>
                    {/*Source: globals*/}
                    {/*<StatusBarSpacer /> flex: 44/667*/}
                    <View style={{ backgroundColor: 'white',paddingTop:(Platform.OS === 'android')?0:(_constants.isIphoneX() ? 40 : 20)}}>
                        <CustomNav rightBtn='Cancel'  title='Sign In'/>
                    </View>
                    <View>
                        <AdaySplashHeader />
                        <View style={{marginTop:this.state.topMargin}}>
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
                                    autoCorrect={false}
                                />
                            </View>
                            {/* Password Field */}
                            <View style={styles.inputFieldContainer}>
                                <View style={styles.inputFieldIconContainer}>
                                    <Image style={{width: 25, height: 25}} source={require('./assets/login_key.png')}/>
                                </View>
                                <Input
                                    onChangeText={(text) =>  this.onInputFieldChange('password', text)}
                                    inputColorPlaceholder="rgba(74,74,74,0.5)"
                                    placeholderTextColor="rgba(74,74,74,0.5)"
                                    placeholder="PASSWORD"
                                    style={{height: 40}}
                                    secureTextEntry={!isPasswordVisible}
                                    autoCorrect={false}
                                />
                                <TouchableOpacity onPress={() => this.changePasswordVisibility()} style={styles.inputFieldButtonContainer}>
                                    <Image style={{width: 25, height: 25}} source={isPasswordVisible ? visibleFieldButton : unVisibleFieldButton}/>
                                </TouchableOpacity>
                            </View>
                            {/* Error Messages */}
                            {validationError &&
                            <Text style={styles.errorMessage}>
                                Please fill all fields above!
                            </Text>}
                            {networkError &&
                            <Text style={styles.errorMessage}>
                                Request Failed. Check Internet Connection.
                            </Text>}
                            {loginError &&
                            <Text style={styles.errorMessage}>
                                Incorrect Username or Password
                            </Text>}
                            <View style={styles.inputFieldContainer}>

                                <TouchableOpacity style={styles.joinButton} onPress={this.validation}>
                                    <Text style={styles.buttonWhiteText}>LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableHighlight underlayColor={'white'}
                                            style={styles.forgotPasswordContainer}
                                            onPress={()=>{

                                                //Tracker.trackScreenView("Forgot Password");
                                                Actions.ForgotPassword({})
                                            }}>
                            <Text style={styles.touchabletext}>FORGOT YOUR PASSWORD?</Text>
                        </TouchableHighlight>
                        {/*<_br/>*/}
                        {/*<View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 5}}>
                            <Text style={styles.touchabletext}>DO NOT HAVE AN ACCOUNT?  </Text>
                            <TouchableOpacity onPress={()=>Actions.SignUp({})}><Text style={styles.touchabletext}>SIGN UP</Text></TouchableOpacity>
                        </View>*/}
                    </View>
                </View>
            </ScrollView>
        );
    };
}

const authenticate = gql `mutation authenticate($data: AuthenticateInput!){
        authenticate(input:$data) {
                jwt
        }
    }`

//these mutations doesn't work for weird error on relation user_device. May be used later, for now the workaround is the call to saveToken
const createUserDevice = gql `
  mutation ($os:Os!, $userId: Uuid!, $token:String!, $created:  Datetime){
  createUserDevice(input: {userDevice: {userId:$userId, os: $os, token:$token, created:$created}})
    {
      userDevice{
        os
        token
        userId
        created
      }
    }
}`


const deleteUserDeviceByUserIdAndOs = gql`
    mutation ($os:Os!, $userId: Uuid!){
      deleteUserDeviceByUserIdAndOs(input: {userId:$userId, os: $os} )
        {
          userDevice{
            os
            token
            userId
            created
          }
        }
    }`

const userQuery = gql `query userQuery($email: String!){
        allUsers(condition: { userEmail: $email }){
             edges{
                node{
                  id
                }
            }
    }
}`



const LoginComponent = graphql(authenticate)(Login)
/*
const LoginComponent = compose (
  graphql(authenticate, {
    name: 'authenticate'
  }),
  graphql (createUserDevice, {
    name: 'createUserDevice'
  }),
  graphql (deleteUserDeviceByUserIdAndOs, {
    name: 'deleteUserDeviceByUserIdAndOs'
  })
) (Login);
*/

export default LoginComponent

const styles = StyleSheet.create({

    container: {
        flexDirection: "column",
        alignItems: 'stretch',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        flex: 1
    },
    pageHeaderLogoContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
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
    errorMessage: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom:10,
        fontSize: 17,
        color: 'red'
    },
    forgotPasswordContainer: {
        maxWidth: 200,
        marginTop: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    forgotPassword: {
        color: "#4990E2",
        fontSize: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    doNotHaveAnAccount: {
        fontSize: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    forgotPasswordUntouchableText: {
        color: "#232323",
        fontSize: 12,
        fontWeight: 'bold'
    },
    joinButton: {
        display: 'flex',
        backgroundColor: '#002DB0',
        height: 40,
        width: width / 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
    buttonWhiteText: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: 'white',
        fontWeight: 'bold',
    },
    footer: {
        //flexDirection needed as each component otherwise shows up on different lines
        flexDirection: 'row',
        flexWrap: 'wrap',
        //alignItems is needed or else the second row doesn't appear
        alignItems: 'center',
        //justifycontent centers the two rows of the text
        justifyContent: 'center',
        marginHorizontal: 20,
        maxWidth: width
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


    /**
     * Stylings for all components
     */

    /*
     * AdaySplashHeader Stylings
     */
     homePageHeaderContainer: {
         paddingVertical: 30,
         justifyContent: 'center',
         alignItems: 'center',
     },
     logoImage: {
         width: 90,
         height: 108,
         resizeMode: 'cover'
     },
});
