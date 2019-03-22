import React, {Component}  from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider} from 'react-apollo';
import {
    View,
    AsyncStorage,
    NetInfo
} from 'react-native';
import {Scene, Actions, Router} from 'react-native-router-flux';
import AboutMeComponent from './container/AboutMeContainer';
import AccountComponent from './container/AccountContainer';
import AlertSettings from './container/AlertsSettingsContainer';
import Associates from './components/OpportunitiesComponent/Associates';
import ChangePassword from './container/ChangePasswordContainer';
import AwardOrder from './container/AwardOrderContainer';
import EducationHistoryComponent from './container/EducationHistoryContainer';
import EnterRefFromContacts from './container/EnterRefFromContactsContainer';
import EnterRefManuallyComponent from './container/EnterRefManuallyContainer';
import HomeAddressComponent from './container/HomeAddressContainer';
import HomeComponent from './container/HomeContainer';
import GoogleFetchAddress from './components/GoogleFetchAddress';
import LanguagesComponent from './container/LanguagesContainer';
import LogInComponent from './components/LogInComponent';
import MyProfileReducer from './container/MyProfileContainer';
import OpportunitiesComponent from './container/OpportunitiesContainer';
import OpportunitiesLocation from './container/OpportunitiesLocationContainer';
import OpportunitiesListing from './container/OpportunitiesListingContainer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShiftDetailsComponent from './container/ShiftDetailsContainer';
import SignUpForgotPassword from './components/SignUpForgotPassword';
import SignUpFormComponent from './container/SignUpFormContainer';
import TermsOfService from './pages/TermsOfService';
import TimeOffComponent from './components/TimeOffComponent/TimeOffComponent';
import TimeOffRequestComponent from './components/TimeOffComponent/TimeOffRequestComponent';
import VerifyPhoneComponent from './components/VerifyPhoneComponent';
import WorkHistoryComponent from './components/WorkHistoryComponent';
import EditContactInfoComponent from './container/EditContactInfoContainer';

import {Platform} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import SchedulingOptions from "./components/SchedulingOptionsComponent/SchedulingOptions";
import BumpDetails from "./components/SchedulingOptionsComponent/BumpComponent/BumpDetails";

//****FCM****START
/*
import FCM from "react-native-fcm";
import {registerKilledListener, registerAppListener} from "./Listeners";
import firebaseClient from  "./FirebaseClient";
registerKilledListener();
*/

// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
        //this is a local notification
    }
    if(notif.opened_from_tray){
        //iOS: app is open/resumed because user clicked banner
        //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();

    if(Platform.OS ==='ios'){
        //optional
        //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
        //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        //notif._notificationType is available for iOS platfrom
        switch(notif._notificationType){
            case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
            case NotificationType.NotificationResponse:
                notif.finish();
                break;
            case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
        }
    }
});
//****FCM****END
FCM.on(FCMEvent.RefreshToken, (token) => {
    // fcm token may not be available on first load, catch it here
});

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: "",
            tokenCopyFeedback: "",
            status:true
        }
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        //this.setState({ status: isConnected });
    }

    async componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);

        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                //this.setState({ status: isConnected });
            }
        );
        registerAppListener();
        FCM.getInitialNotification().then(notif => {
            this.setState({
                initNotif: notif
            })
        });

        try{
            let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
        } catch(e){
            console.error(e);
        }

        FCM.getFCMToken().then(token => {
            this.setState({token: token || ""})
        });

        if(Platform.OS === 'ios'){
            FCM.getAPNSToken().then(token => {
                console.log("APNS TOKEN (getFCMToken)", token);
            });
        }
    }

    showLocalNotification() {
        FCM.presentLocalNotification({
            vibrate: 500,
            title: 'Hello',
            body: 'Test Notification',
            big_text: 'i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large',
            priority: "high",
            sound: "bell.mp3",
            large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
            show_in_foreground: true,
            group: 'test',
            number: 10
        });
    }

    scheduleLocalNotification() {
        FCM.scheduleLocalNotification({
            id: 'testnotif',
            fire_date: new Date().getTime()+5000,
            vibrate: 500,
            title: 'Hello',
            body: 'Test Scheduled Notification',
            sub_text: 'sub text',
            priority: "high",
            large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
            show_in_foreground: true,
            picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
            wake_screen: true
        });
    }

    sendRemoteNotification(token) {
        let body;

        if(Platform.OS === 'android'){
            body = {
                "to": token,
                "data":{
                    "custom_notification": {
                        "title": "Simple FCM Client",
                        "body": "This is a notification with only NOTIFICATION.",
                        "sound": "default",
                        "priority": "high",
                        "show_in_foreground": true
                    }
                },
                "priority": 10
            }
        } else {
            body = {
                "to": token,
                "notification":{
                    "title": "Simple FCM Client",
                    "body": "This is a notification with only NOTIFICATION.",
                    "sound": "default"
                },
                "priority": 10
            }
        }

        firebaseClient.send(JSON.stringify(body), "notification");
    }

    sendRemoteData(token) {
        let body = {
            "to": token,
            "data":{
                "title": "Simple FCM Client",
                "body": "This is a notification with only DATA.",
                "sound": "default"
            },
            "priority": "normal"
        }

        firebaseClient.send(JSON.stringify(body), "data");
    }

    sendRemoteNotificationWithData(token) {
        let body = {
            "to": token,
            "notification":{
                "title": "Simple FCM Client",
                "body": "This is a notification with NOTIFICATION and DATA (NOTIF).",
                "sound": "default"
            },
            "data":{
                "hello": "there"
            },
            "priority": "high"
        }
        firebaseClient.send(JSON.stringify(body), "notification-data");
    }

    createClient() {
        // const networkInterface =  createNetworkInterface({ uri: SERVER_URL+'/graphql' })
        // const networkInterface =  createNetworkInterface({ uri: 'https://forward-chess-157313.appspot.com/graphql'});
        const networkInterface =  createNetworkInterface({ uri: 'https://20170919t201545-dot-forward-chess-157313.appspot.com/graphql'});


        networkInterface.use([{
            applyMiddleware(req, next) {
                if (!req.options.headers) {
                    req.options.headers = {};  // Create the header object if needed.
                }
                // get the authentication token from local storage if it exists 292348474
                let token = null
                AsyncStorage.getItem('token', (err, result) => {
                    token = result
                    if(token) {
                        req.options.headers.authorization = `Bearer ${token}`;
                    } else {
                        req.options.headers = {};
                    }
                    next();
                })
            }
        }]);

        return new ApolloClient({
            networkInterface
        })
    }

    render() {
        renderPlaceholder = () => <View />;
        { /* if(this.state.status) { */}
        return (
            <ApolloProvider client={this.createClient()}>
                <Router>
                    <Scene key="root" headerTitleAllowFontScaling = {false}>
                        <Scene key="AboutMe"
                               component={AboutMeComponent}
                               hideNavBar={false}
                               back={true}
                               title="About Me"
                               titleStyle={{color: '#0022A1', fontWeight: 'bold', alignSelf: 'center', marginRight: 50}}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                               backButtonTextStyle={{color: '#007AFF', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="Account"
                               component={AccountComponent}
                               hideNavBar={true}
                               initial={false}
                               title="Account"
                        />
                        {/*<Scene key="AlertSettings"*/}
                        {/*component={AlertSettings}*/}
                        {/*hideNavBar={false}*/}
                        {/*backTitle="BACK"*/}
                        {/*backButtonImage={require('./components/assets/back-arrow.png')}*/}
                        {/*backButtonTextStyle={{color: '#4A4A4A', alignSelf: 'center', padding: 0}}*/}
                        {/*navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}*/}
                        {/*navigationBarTitleImageStyle={{width: 100, height: 32}}*/}
                        {/*initial={false}*/}
                        {/*/>*/}
                        <Scene key="AlertSettings"
                               component={AlertSettings}
                               hideNavBar={false}
                               backTitle="BACK"
                               navigationBarTitleImage={require('./components/assets/logos/aday-logo-header.png')}
                               backButtonImage={require('./components/assets/back-arrow.png')}
                               backButtonTextStyle={{color: '#4A4A4A', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: '#F7F7F7', borderBottomColor: 'lightgray'}}
                               navigationBarTitleImageStyle={{width: 70, height: 20, alignSelf:'center', marginLeft: Platform.OS === 'ios' ? 0 : -35}}
                               initial={false}
                        />
                        <Scene key="Associates"
                               title="Restaurant Associate's"
                               titleStyle={{color: 'white', fontWeight: 'bold'}}
                               component={Associates}
                               navigationBarStyle={{backgroundColor: 'rgba(0,0,0,0)', borderBottomColor: '#F2F2F2'}}
                               backTitle="Back"
                               backButtonTextStyle={{color: 'white', alignSelf: 'center', padding: 0}}
                               hideNavBar={false}
                               initial={false}
                        />
                        <Scene key="changePassword"
                               title={"Change Password"}
                               component={ChangePassword}
                               hideNavBar={false}
                               titleStyle={{alignSelf: 'center', color: '#4A4A4A'}}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/back-arrow.png')}
                               backButtonTextStyle={{color: '#4A4A4A', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: '#F7F7F7', borderBottomColor: 'lightgray'}}
                               navigationBarTitleImageStyle={{width: 100, height: 32}}
                               initial={false}
                        />
                        <Scene key="awardOrder"
                               component={AwardOrder}
                               hideNavBar={false}
                               backButtonImage={require('./components/assets/Icons_Exit.png')}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2', borderBottomWidth:1}}
                               title="Award Order"
                               titleStyle={{color: '#0022A1', alignSelf: 'center'}}
                               renderRightButton={renderPlaceholder}
                               initial={false}
                        />
                        <Scene key="Education"
                               component={EducationHistoryComponent}
                               hideNavBar={false}
                               title="Education History"
                               backTitle="BACK"
                               titleStyle={{color: '#0022A1', fontWeight: 'bold', alignSelf: 'center', marginRight: 50}}
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                               backButtonTextStyle={{color: '#007AFF', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="AddReferenceManually"
                               component={EnterRefManuallyComponent}
                               hideNavBar={false}
                               backTitle="BACK"
                               title="References"
                               titleStyle={{color: '#0022A1', fontWeight: 'bold', alignSelf: 'center', marginRight: 50}}
                               backButtonTextStyle={{color: '#007AFF', alignSelf: 'center', padding: 0}}
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                        />
                        <Scene key="AddReferenceFromContacts"
                               component={EnterRefFromContacts}
                               hideNavBar={false}
                               backTitle="BACK"
                               title="References"
                               titleStyle={{color: '#0022A1', fontWeight: 'bold', alignSelf: 'center', marginRight: 50}}
                               backButtonTextStyle={{color: '#4A4A4A', alignSelf: 'center', padding: 0}}
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="googleFetchAddress"
                               component={GoogleFetchAddress}
                               hideNavBar={false}
                               backTitle="BACK"
                               titleStyle={{color: '#0022A1', fontWeight: 'bold'}}
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                               backButtonTextStyle={{color: '#007AFF', alignSelf: 'center', padding: 0}}
                               rightButtonIconStyle={{width:20, height:20}}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="HomeAddress"
                               component={HomeAddressComponent}
                               hideNavBar={false}
                               backTitle="BACK"
                               title="Address"
                               titleStyle={{color: '#0022A1', fontWeight: 'bold', alignSelf: 'center', marginRight: 50}}
                               backButtonTextStyle={{color: '#4A4A4A', alignSelf: 'center', padding: 0}}
                               backButtonImage={require('./components/assets/back-arrow.png')}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="home"
                               component={HomeComponent}
                               hideNavBar
                               initial={true}
                        />
                        <Scene key="Languages"
                               component={LanguagesComponent}
                               hideNavBar={false}
                               initial={false}
                               title="Languages"
                               titleStyle={{color: '#0022A1', fontWeight: 'bold', alignSelf: 'center', marginRight: 50}}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                               backButtonTextStyle={{color: '#007AFF', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="Login"
                               component={LogInComponent}
                               hideNavBar={true}
                               initial={false}
                        />
                        <Scene key="ForgotPassword"
                               component={SignUpForgotPassword}
                               hideNavBar={true}
                               initial={false}
                        />
                        <Scene key="MyProfile"
                               component={MyProfileReducer}
                               hideNavBar={false}
                               initial={false}
                               title="My Profile"
                               titleStyle={{color: '#0022A1', fontWeight: 'bold', alignSelf: 'center', marginRight: 50}}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                               backButtonTextStyle={{color: '#007AFF', alignSelf: 'center', padding: 0}}
                               onBack = {() => Actions.Account({tab: "PROFILE"})}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="Opportunities"
                               component={OpportunitiesComponent}
                               hideNavBar
                               initial={false}
                        />
                        <Scene key="OpportunitiesLocation"
                               component={OpportunitiesLocation}
                               hideNavBar
                               initial={false}
                        />
                        <Scene key="OpportunitiesListing"
                               titleStyle={{color: 'white', fontWeight: 'bold'}}
                               component={OpportunitiesListing}
                               navigationBarStyle={{backgroundColor: 'rgba(0,0,0,0.4)', borderBottomColor: '#F2F2F2'}}
                               backTitle="Back"
                               backButtonTextStyle={{color: 'white', alignSelf: 'center', padding: 0}}
                               hideNavBar={false}
                               initial={false}
                        />
                        <Scene key="PrivacyPolicy"
                               component={PrivacyPolicy}
                               hideNavBar={false}
                               titleStyle={{alignSelf: 'center', color: '#4A4A4A'}}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/back-arrow.png')}
                               backButtonTextStyle={{color: '#4A4A4A', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: '#F7F7F7', borderBottomColor: 'lightgray'}}
                               navigationBarTitleImageStyle={{width: 100, height: 32}}
                               title="Privacy Policy"
                               initial={false}
                        />
                        <Scene key="SignUpForm"
                               component={SignUpFormComponent}
                               hideNavBar={true}
                               initial={false}
                        />
                        <Scene key="ShiftDetails"
                               component={ShiftDetailsComponent}
                               hideNavBar={true}
                               initial={false}
                               title="Shift Details"
                               titleStyle={{color: 'white', fontWeight: 'bold'}}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/chevron-white.png')}
                               backButtonTextStyle={{color: 'white', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent'}}
                               onBack={()=> AsyncStorage.getItem('email', (err, emailResult) => { Actions.Account({email: emailResult })})}
                        />
                        <Scene key="ShiftRating"
                               component={ShiftDetailsComponent}
                               title="Shift Rating"
                               hideNavBar={false}
                               initial={false}
                               renderBackButton={()=>(null)}
                               titleStyle={{color: 'white', fontWeight: 'bold'}}
                               navigationBarStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent'}}
                        />
                        <Scene key="ShiftMap"
                               component={ShiftDetailsComponent}
                               hideNavBar={false}
                               initial={false}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/chevron-white.png')}
                               backButtonTextStyle={{color: 'white', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent'}}
                        />
                        <Scene key="TermsOfService"
                               component={TermsOfService}
                               hideNavBar={false}
                               backTitle="BACK"
                               titleStyle={{alignSelf: 'center', color: '#4A4A4A'}}
                               backButtonImage={require('./components/assets/back-arrow.png')}
                               backButtonTextStyle={{color: '#4A4A4A', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: '#F7F7F7', borderBottomColor: 'lightgray'}}
                               title="Terms of Service"
                               navigationBarTitleImageStyle={{width: 100, height: 32}}
                               initial={false}
                        />

                        <Scene key="SchedulingOptions"
                               component={SchedulingOptions}
                               hideNavBar={false}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                               backButtonTextStyle={{color: 'rgb(0,124,250)', alignSelf: 'center'}}
                               navigationBarStyle={{backgroundColor: 'rgb(250,250,250)', borderBottomColor: '#F2F2F2'}}
                               title="Scheduling Options"
                               titleStyle={{color: 'rgb(0,38,157)', alignSelf: 'center'}}
                               navigationBarTitleImageStyle={{width: 100, height: 32}}
                               renderRightButton={renderPlaceholder}
                               initial={false}
                        />

                        <Scene key="BumpDetails"
                               component={BumpDetails}
                               hideNavBar={false}
                               backButtonImage={require('./components/assets/cross.png')}
                               navigationBarStyle={{backgroundColor: 'rgb(250,250,250)', borderBottomColor: '#F2F2F2',borderBottomWidth:1}}
                               title="Shift Assignment"
                               titleStyle={{color: 'rgb(0,38,157)'}}
                               navigationBarTitleImageStyle={{width: 100, height: 32}}
                               initial={false}
                        />

                        <Scene key="TimeOff"
                               component={TimeOffComponent}
                               hideNavBar={false}
                               initial={false}
                               title="Time Off"
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="TimeOffRequest"
                               component={TimeOffRequestComponent}
                               hideNavBar={false}
                               initial={false}
                               title="Time Off Request"
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="VerifyPhone"
                               component={VerifyPhoneComponent}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2', borderBottomWidth :4}}
                               hideNavBar={true}
                        />
                        <Scene key="work"
                               component={WorkHistoryComponent}
                               hideNavBar={false}
                               title="Work History"
                               rightButtonIconStyle={{width:20, height:20}}
                               titleStyle={{color: '#0022A1', fontWeight: 'bold', alignSelf: 'center', marginRight: 50}}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                               backButtonTextStyle={{color: '#007AFF', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                        <Scene key="EditContactInfo"
                               component={EditContactInfoComponent}
                               hideNavBar={false}
                               title="Contact Info"
                               rightButtonIconStyle={{width:20, height:20}}
                               titleStyle={{color: '#0022A1', fontWeight: 'bold', alignSelf: 'center', marginRight: 50}}
                               backTitle="BACK"
                               backButtonImage={require('./components/assets/chevron-blue.png')}
                               backButtonTextStyle={{color: '#007AFF', alignSelf: 'center', padding: 0}}
                               navigationBarStyle={{backgroundColor: 'white', borderBottomColor: '#F2F2F2'}}
                        />
                    </Scene>
                </Router>
            </ApolloProvider>
        );

        {/* } else {
          Alert.alert('ADay','No Internet Connection \nPlease check your Internet connection. ');
          return null;
      } */}
    }
};
