Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _this=this;
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactApollo=require('react-apollo');
var _reactNative=require('react-native');











var _reactNativeRouterFlux=require('react-native-router-flux');
var _AboutMeContainer=require('./container/AboutMeContainer');var _AboutMeContainer2=_interopRequireDefault(_AboutMeContainer);
var _AccountContainer=require('./container/AccountContainer');var _AccountContainer2=_interopRequireDefault(_AccountContainer);
var _AlertsSettingsContainer=require('./container/AlertsSettingsContainer');var _AlertsSettingsContainer2=_interopRequireDefault(_AlertsSettingsContainer);
var _Associates=require('./components/OpportunitiesComponent/Associates');var _Associates2=_interopRequireDefault(_Associates);
var _ChangePasswordContainer=require('./container/ChangePasswordContainer');var _ChangePasswordContainer2=_interopRequireDefault(_ChangePasswordContainer);
var _AwardOrderContainer=require('./container/AwardOrderContainer');var _AwardOrderContainer2=_interopRequireDefault(_AwardOrderContainer);
var _EducationHistoryContainer=require('./container/EducationHistoryContainer');var _EducationHistoryContainer2=_interopRequireDefault(_EducationHistoryContainer);
var _EnterRefFromContactsContainer=require('./container/EnterRefFromContactsContainer');var _EnterRefFromContactsContainer2=_interopRequireDefault(_EnterRefFromContactsContainer);
var _EnterRefManuallyContainer=require('./container/EnterRefManuallyContainer');var _EnterRefManuallyContainer2=_interopRequireDefault(_EnterRefManuallyContainer);
var _HomeAddressContainer=require('./container/HomeAddressContainer');var _HomeAddressContainer2=_interopRequireDefault(_HomeAddressContainer);
var _HomeContainer=require('./container/HomeContainer');var _HomeContainer2=_interopRequireDefault(_HomeContainer);
var _GoogleFetchAddress=require('./components/GoogleFetchAddress');var _GoogleFetchAddress2=_interopRequireDefault(_GoogleFetchAddress);
var _LanguagesContainer=require('./container/LanguagesContainer');var _LanguagesContainer2=_interopRequireDefault(_LanguagesContainer);
var _LogInComponent=require('./components/LogInComponent');var _LogInComponent2=_interopRequireDefault(_LogInComponent);
var _MyProfileContainer=require('./container/MyProfileContainer');var _MyProfileContainer2=_interopRequireDefault(_MyProfileContainer);
var _OpportunitiesContainer=require('./container/OpportunitiesContainer');var _OpportunitiesContainer2=_interopRequireDefault(_OpportunitiesContainer);
var _OpportunitiesLocationContainer=require('./container/OpportunitiesLocationContainer');var _OpportunitiesLocationContainer2=_interopRequireDefault(_OpportunitiesLocationContainer);
var _OpportunitiesListingContainer=require('./container/OpportunitiesListingContainer');var _OpportunitiesListingContainer2=_interopRequireDefault(_OpportunitiesListingContainer);
var _PrivacyPolicy=require('./pages/PrivacyPolicy');var _PrivacyPolicy2=_interopRequireDefault(_PrivacyPolicy);
var _ShiftDetailsContainer=require('./container/ShiftDetailsContainer');var _ShiftDetailsContainer2=_interopRequireDefault(_ShiftDetailsContainer);
var _SignUpForgotPassword=require('./components/SignUpForgotPassword');var _SignUpForgotPassword2=_interopRequireDefault(_SignUpForgotPassword);
var _SignUpFormContainer=require('./container/SignUpFormContainer');var _SignUpFormContainer2=_interopRequireDefault(_SignUpFormContainer);
var _TermsOfService=require('./pages/TermsOfService');var _TermsOfService2=_interopRequireDefault(_TermsOfService);
var _TimeOffComponent=require('./components/TimeOffComponent/TimeOffComponent');var _TimeOffComponent2=_interopRequireDefault(_TimeOffComponent);
var _TimeOffRequestComponent=require('./components/TimeOffComponent/TimeOffRequestComponent');var _TimeOffRequestComponent2=_interopRequireDefault(_TimeOffRequestComponent);
var _VerifyPhoneComponent=require('./components/VerifyPhoneComponent');var _VerifyPhoneComponent2=_interopRequireDefault(_VerifyPhoneComponent);
var _WorkHistoryComponent=require('./components/WorkHistoryComponent');var _WorkHistoryComponent2=_interopRequireDefault(_WorkHistoryComponent);
var _EditContactInfoContainer=require('./container/EditContactInfoContainer');var _EditContactInfoContainer2=_interopRequireDefault(_EditContactInfoContainer);


var _reactNativeFcm=require('react-native-fcm');var _reactNativeFcm2=_interopRequireDefault(_reactNativeFcm);
var _constants=require('./constants');
var _FontAwesome=require('react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _moment=require('moment/moment');var _moment2=_interopRequireDefault(_moment);
var _SchedulingOptions=require('./components/SchedulingOptionsComponent/SchedulingOptions');var _SchedulingOptions2=_interopRequireDefault(_SchedulingOptions);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}










_reactNativeFcm2.default.on(_reactNativeFcm.FCMEvent.Notification,function _callee(notif){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:

if(notif.local_notification){

}
if(notif.opened_from_tray){


}if(!(


_reactNative.Platform.OS==='ios')){_context.next=12;break;}_context.t0=




notif._notificationType;_context.next=_context.t0===
_reactNativeFcm.NotificationType.Remote?6:_context.t0===


_reactNativeFcm.NotificationType.NotificationResponse?8:_context.t0===


_reactNativeFcm.NotificationType.WillPresent?10:12;break;case 6:notif.finish(_reactNativeFcm.RemoteNotificationResult.NewData);return _context.abrupt('break',12);case 8:notif.finish();return _context.abrupt('break',12);case 10:
notif.finish(_reactNativeFcm.WillPresentNotificationResult.All);return _context.abrupt('break',12);case 12:case'end':return _context.stop();}}},null,_this);});





_reactNativeFcm2.default.on(_reactNativeFcm.FCMEvent.RefreshToken,function(token){
console.log(token);

});var

App=function(_Component){_inherits(App,_Component);

function App(props){_classCallCheck(this,App);var _this2=_possibleConstructorReturn(this,(App.__proto__||Object.getPrototypeOf(App)).call(this,
props));_this2.












handleConnectionChange=function(isConnected){

console.log('is connected: '+_this2.state.status);
};_this2.state={token:"",tokenCopyFeedback:"",status:true};return _this2;}_createClass(App,[{key:'componentWillUnmount',value:function componentWillUnmount(){_reactNative.NetInfo.isConnected.removeEventListener('change',this.handleConnectionChange);}},{key:'componentDidMount',value:function componentDidMount(){var _this3=this;var result;return regeneratorRuntime.async(function componentDidMount$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:


_reactNative.NetInfo.isConnected.addEventListener('change',this.handleConnectionChange);

_reactNative.NetInfo.isConnected.fetch().done(
function(isConnected){

});

registerAppListener();
_reactNativeFcm2.default.getInitialNotification().then(function(notif){
_this3.setState({
initNotif:notif});

});_context2.prev=4;_context2.next=7;return regeneratorRuntime.awrap(


_reactNativeFcm2.default.requestPermissions({badge:false,sound:true,alert:true}));case 7:result=_context2.sent;_context2.next=13;break;case 10:_context2.prev=10;_context2.t0=_context2['catch'](4);

console.error(_context2.t0);case 13:


_reactNativeFcm2.default.getFCMToken().then(function(token){
console.log("TOKEN (getFCMToken)",token);
_this3.setState({token:token||""});
});

if(_reactNative.Platform.OS==='ios'){
_reactNativeFcm2.default.getAPNSToken().then(function(token){
console.log("APNS TOKEN (getFCMToken)",token);
});
}case 15:case'end':return _context2.stop();}}},null,this,[[4,10]]);}},{key:'showLocalNotification',value:function showLocalNotification()


{
_reactNativeFcm2.default.presentLocalNotification({
vibrate:500,
title:'Hello',
body:'Test Notification',
big_text:'i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large',
priority:"high",
sound:"bell.mp3",
large_icon:"https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
show_in_foreground:true,
group:'test',
number:10});

}},{key:'scheduleLocalNotification',value:function scheduleLocalNotification()

{
_reactNativeFcm2.default.scheduleLocalNotification({
id:'testnotif',
fire_date:new Date().getTime()+5000,
vibrate:500,
title:'Hello',
body:'Test Scheduled Notification',
sub_text:'sub text',
priority:"high",
large_icon:"https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
show_in_foreground:true,
picture:'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png',
wake_screen:true});

}},{key:'sendRemoteNotification',value:function sendRemoteNotification(

token){
var body=void 0;

if(_reactNative.Platform.OS==='android'){
body={
"to":token,
"data":{
"custom_notification":{
"title":"Simple FCM Client",
"body":"This is a notification with only NOTIFICATION.",
"sound":"default",
"priority":"high",
"show_in_foreground":true}},


"priority":10};

}else{
body={
"to":token,
"notification":{
"title":"Simple FCM Client",
"body":"This is a notification with only NOTIFICATION.",
"sound":"default"},

"priority":10};

}

firebaseClient.send(JSON.stringify(body),"notification");
}},{key:'sendRemoteData',value:function sendRemoteData(

token){
var body={
"to":token,
"data":{
"title":"Simple FCM Client",
"body":"This is a notification with only DATA.",
"sound":"default"},

"priority":"normal"};


firebaseClient.send(JSON.stringify(body),"data");
}},{key:'sendRemoteNotificationWithData',value:function sendRemoteNotificationWithData(

token){
var body={
"to":token,
"notification":{
"title":"Simple FCM Client",
"body":"This is a notification with NOTIFICATION and DATA (NOTIF).",
"sound":"default"},

"data":{
"hello":"there"},

"priority":"high"};

firebaseClient.send(JSON.stringify(body),"notification-data");
}},{key:'createClient',value:function createClient()

{

networkInterface=(0,_reactApollo.createNetworkInterface)({uri:'https://20170919t201545-dot-forward-chess-157313.appspot.com/graphql'});


networkInterface.use([{
applyMiddleware:function applyMiddleware(req,next){
if(!req.options.headers){
req.options.headers={};
}

var token=null;
_reactNative.AsyncStorage.getItem('token',function(err,result){
token=result;
if(token){
req.options.headers.authorization='Bearer '+token;
}else{
req.options.headers={};
}
next();
});
}}]);


return new _reactApollo.ApolloClient({
networkInterface:networkInterface});

}},{key:'render',value:function render()

{
{}
return(
_react2.default.createElement(_reactApollo.ApolloProvider,{client:this.createClient()},
_react2.default.createElement(_reactNativeRouterFlux.Router,null,
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'root'},
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'AboutMe',
component:_AboutMeContainer2.default,
hideNavBar:false,
back:true,
title:'About Me',
titleStyle:{color:'#0022A1',fontWeight:'bold',alignSelf:'center',marginRight:50},
backTitle:'BACK',
backButtonImage:require('./components/assets/chevron-blue.png'),
backButtonTextStyle:{color:'#007AFF',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Account',
component:_AccountContainer2.default,
hideNavBar:true,
initial:false,
title:'Account'}),











_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'AlertSettings',
component:_AlertsSettingsContainer2.default,
hideNavBar:false,
backTitle:'BACK',
navigationBarTitleImage:require('./components/assets/logos/aday-logo-header.png'),
backButtonImage:require('./components/assets/back-arrow.png'),
backButtonTextStyle:{color:'#4A4A4A',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'#F7F7F7',borderBottomColor:'lightgray'},
navigationBarTitleImageStyle:{width:70,height:20,alignSelf:'center',marginLeft:_reactNative.Platform.OS==='ios'?0:-35},
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Associates',
title:'Restaurant Associate\'s',
titleStyle:{color:'white',fontWeight:'bold'},
component:_Associates2.default,
navigationBarStyle:{backgroundColor:'rgba(0,0,0,0)',borderBottomColor:'#F2F2F2'},
backTitle:'Back',
backButtonTextStyle:{color:'white',alignSelf:'center',padding:0},
hideNavBar:false,
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'changePassword',
component:_ChangePasswordContainer2.default,
hideNavBar:false,
backTitle:'BACK',
backButtonImage:require('./components/assets/back-arrow.png'),
backButtonTextStyle:{color:'#4A4A4A',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'},
navigationBarTitleImageStyle:{width:100,height:32},
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'awardOrder',
component:_AwardOrderContainer2.default,
hideNavBar:false,
backButtonImage:require('./components/assets/Icons_Exit.png'),
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2',borderBottomWidth:1},
title:'Award Order',
titleStyle:{color:'#0022A1'},
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Education',
component:_EducationHistoryContainer2.default,
hideNavBar:false,
title:'Education History',
backTitle:'BACK',
titleStyle:{color:'#0022A1',fontWeight:'bold',alignSelf:'center',marginRight:50},
backButtonImage:require('./components/assets/chevron-blue.png'),
backButtonTextStyle:{color:'#007AFF',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'AddReferenceManually',
component:_EnterRefManuallyContainer2.default,
hideNavBar:false,
backTitle:'BACK',
title:'References',
titleStyle:{color:'#0022A1',fontWeight:'bold',alignSelf:'center',marginRight:50},
backButtonTextStyle:{color:'#007AFF',alignSelf:'center',padding:0},
backButtonImage:require('./components/assets/chevron-blue.png')}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'AddReferenceFromContacts',
component:_EnterRefFromContactsContainer2.default,
hideNavBar:false,
backTitle:'BACK',
title:'References',
titleStyle:{color:'#0022A1',fontWeight:'bold',alignSelf:'center',marginRight:50},
backButtonTextStyle:{color:'#4A4A4A',alignSelf:'center',padding:0},
backButtonImage:require('./components/assets/chevron-blue.png'),
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'googleFetchAddress',
component:_GoogleFetchAddress2.default,
hideNavBar:false,
backTitle:'BACK',
titleStyle:{color:'#0022A1',fontWeight:'bold'},
backButtonImage:require('./components/assets/chevron-blue.png'),
backButtonTextStyle:{color:'#007AFF',alignSelf:'center',padding:0},
rightButtonIconStyle:{width:20,height:20},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'HomeAddress',
component:_HomeAddressContainer2.default,
hideNavBar:false,
backTitle:'BACK',
title:'Address',
titleStyle:{color:'#0022A1',fontWeight:'bold',alignSelf:'center',marginRight:50},
backButtonTextStyle:{color:'#4A4A4A',alignSelf:'center',padding:0},
backButtonImage:require('./components/assets/back-arrow.png'),
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'home',
component:_HomeContainer2.default,
hideNavBar:true,
initial:true}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Languages',
component:_LanguagesContainer2.default,
hideNavBar:false,
initial:false,
title:'Languages',
titleStyle:{color:'#0022A1',fontWeight:'bold',alignSelf:'center',marginRight:50},
backTitle:'BACK',
backButtonImage:require('./components/assets/chevron-blue.png'),
backButtonTextStyle:{color:'#007AFF',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Login',
component:_LogInComponent2.default,
hideNavBar:true,
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'ForgotPassword',
component:_SignUpForgotPassword2.default,
hideNavBar:true,
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'MyProfile',
component:_MyProfileContainer2.default,
hideNavBar:false,
initial:false,
title:'My Profile',
titleStyle:{color:'#0022A1',fontWeight:'bold',alignSelf:'center',marginRight:50},
backTitle:'BACK',
backButtonImage:require('./components/assets/chevron-blue.png'),
backButtonTextStyle:{color:'#007AFF',alignSelf:'center',padding:0},
onBack:function onBack(){return _reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Opportunities',
component:_OpportunitiesContainer2.default,
hideNavBar:true,
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'OpportunitiesLocation',
component:_OpportunitiesLocationContainer2.default,
hideNavBar:true,
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'OpportunitiesListing',
titleStyle:{color:'white',fontWeight:'bold'},
component:_OpportunitiesListingContainer2.default,
navigationBarStyle:{backgroundColor:'rgba(0,0,0,0.4)',borderBottomColor:'#F2F2F2'},
backTitle:'Back',
backButtonTextStyle:{color:'white',alignSelf:'center',padding:0},
hideNavBar:false,
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'PrivacyPolicy',
component:_PrivacyPolicy2.default,
hideNavBar:false,
backTitle:'BACK',
backButtonImage:require('./components/assets/back-arrow.png'),
backButtonTextStyle:{color:'#4A4A4A',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'},
navigationBarTitleImageStyle:{width:100,height:32},
title:'Privacy Policy',
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'SignUpForm',
component:_SignUpFormContainer2.default,
hideNavBar:true,
initial:false}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'ShiftDetails',
component:_ShiftDetailsContainer2.default,
hideNavBar:true,
initial:false,
title:'Shift Details',
titleStyle:{color:'white',fontWeight:'bold'},
backTitle:'BACK',
backButtonImage:require('./components/assets/chevron-white.png'),
backButtonTextStyle:{color:'white',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'transparent',borderBottomColor:'transparent'},
onBack:function onBack(){return _reactNative.AsyncStorage.getItem('email',function(err,emailResult){_reactNativeRouterFlux.Actions.Account({email:emailResult});});}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'ShiftRating',
component:_ShiftDetailsContainer2.default,
title:'Shift Rating',
hideNavBar:false,
initial:false,
renderBackButton:function renderBackButton(){return null;},
titleStyle:{color:'white',fontWeight:'bold'},
navigationBarStyle:{backgroundColor:'transparent',borderBottomColor:'transparent'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'ShiftMap',
component:_ShiftDetailsContainer2.default,
hideNavBar:false,
initial:false,
backTitle:'BACK',
backButtonImage:require('./components/assets/chevron-white.png'),
backButtonTextStyle:{color:'white',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'transparent',borderBottomColor:'transparent'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'TermsOfService',
component:_TermsOfService2.default,
hideNavBar:false,
backTitle:'BACK',
backButtonImage:require('./components/assets/back-arrow.png'),
backButtonTextStyle:{color:'#4A4A4A',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'},
title:'Terms of Service',
navigationBarTitleImageStyle:{width:100,height:32},
initial:false}),


_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'SchedulingOptions',
component:_SchedulingOptions2.default,
hideNavBar:false,
backTitle:'BACK',
backButtonImage:require('./components/assets/chevron-blue.png'),
backButtonTextStyle:{color:'rgb(0,124,250)',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'rgb(250,250,250)',borderBottomColor:'#F2F2F2'},
title:'Scheduling Options',
titleStyle:{color:'rgb(0,38,157)'},
navigationBarTitleImageStyle:{width:100,height:32},
initial:false}),


_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'TimeOff',
component:_TimeOffComponent2.default,
hideNavBar:false,
initial:false,
title:'Time Off',
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'TimeOffRequest',
component:_TimeOffRequestComponent2.default,
hideNavBar:false,
initial:false,
title:'Time Off Request',
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'VerifyPhone',
component:_VerifyPhoneComponent2.default,
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2',borderBottomWidth:4},
hideNavBar:true}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'work',
component:_WorkHistoryComponent2.default,
hideNavBar:false,
title:'Work History',
rightButtonIconStyle:{width:20,height:20},
titleStyle:{color:'#0022A1',fontWeight:'bold',alignSelf:'center',marginRight:50},
backTitle:'BACK',
backButtonImage:require('./components/assets/chevron-blue.png'),
backButtonTextStyle:{color:'#007AFF',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}}),

_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'EditContactInfo',
component:_EditContactInfoContainer2.default,
hideNavBar:false,
title:'Contact Info',
rightButtonIconStyle:{width:20,height:20},
titleStyle:{color:'#0022A1',fontWeight:'bold',alignSelf:'center',marginRight:50},
backTitle:'BACK',
backButtonImage:require('./components/assets/chevron-blue.png'),
backButtonTextStyle:{color:'#007AFF',alignSelf:'center',padding:0},
navigationBarStyle:{backgroundColor:'white',borderBottomColor:'#F2F2F2'}})))));






{


}
}}]);return App;}(_react.Component);exports.default=App;
