Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['mutation authenticate($data: AuthenticateInput!){\n        authenticate(input:$data) {\n                jwt\n        }\n    }'],['mutation authenticate($data: AuthenticateInput!){\n        authenticate(input:$data) {\n                jwt\n        }\n    }']),_templateObject2=_taggedTemplateLiteral(['\n  mutation ($os:Os!, $userId: Uuid!, $token:String!, $created:  Datetime){\n  createUserDevice(input: {userDevice: {userId:$userId, os: $os, token:$token, created:$created}})\n    {\n      userDevice{\n        os\n        token\n        userId\n        created\n      }\n    }\n}'],['\n  mutation ($os:Os!, $userId: Uuid!, $token:String!, $created:  Datetime){\n  createUserDevice(input: {userDevice: {userId:$userId, os: $os, token:$token, created:$created}})\n    {\n      userDevice{\n        os\n        token\n        userId\n        created\n      }\n    }\n}']),_templateObject3=_taggedTemplateLiteral(['\n    mutation ($os:Os!, $userId: Uuid!){\n      deleteUserDeviceByUserIdAndOs(input: {userId:$userId, os: $os} )\n        {\n          userDevice{\n            os\n            token\n            userId\n            created\n          }\n        }\n    }'],['\n    mutation ($os:Os!, $userId: Uuid!){\n      deleteUserDeviceByUserIdAndOs(input: {userId:$userId, os: $os} )\n        {\n          userDevice{\n            os\n            token\n            userId\n            created\n          }\n        }\n    }']),_templateObject4=_taggedTemplateLiteral(['query userQuery($email: String!){\n        allUsers(condition: { userEmail: $email }){\n             edges{\n                node{\n                  id\n                }\n            }\n    }\n}'],['query userQuery($email: String!){\n        allUsers(condition: { userEmail: $email }){\n             edges{\n                node{\n                  id\n                }\n            }\n    }\n}']);
var _react=require('react');var React=_interopRequireWildcard(_react);
var _nativeBase=require('native-base');
var _reactNative=require('react-native');















var _CustomNav=require('./CustomNav');var _CustomNav2=_interopRequireDefault(_CustomNav);
var _styles=require('../styles');var _styles2=_interopRequireDefault(_styles);
var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactApollo=require('react-apollo');
var _reactNativeFcm=require('react-native-fcm');var _reactNativeFcm2=_interopRequireDefault(_reactNativeFcm);

var _constants=require('../constants');
var _styles3=require('./assets/styles');var _styles4=_interopRequireDefault(_styles3);
var _ForgotPasswordComponent=require('./ForgotPasswordComponent/ForgotPasswordComponent');var _ForgotPasswordComponent2=_interopRequireDefault(_ForgotPasswordComponent);
var _EmailAddressInput=require('./InputComponents/EmailAddressInput');var _EmailAddressInput2=_interopRequireDefault(_EmailAddressInput);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;





var debug=false;
var tracker1=void 0;var

Login=function(_React$Component){_inherits(Login,_React$Component);
function Login(props){_classCallCheck(this,Login);var _this=_possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this,
props));_this.





















_keyboardDidShow=function(e){
_this.setState({
topMargin:-20});


};_this.

_keyboardDidHide=function(e){
_this.setState({
topMargin:40});


};_this.state={loginButtonIcon:require('./assets/Login_Button.png'),email:'',password:'',validationError:false,visibleFieldButton:require('./assets/visibleInputField.png'),unVisibleFieldButton:require('./assets/unVisibleInputField.png'),isPasswordVisible:false,forgotPasswordStatus:false,loginError:false,networkError:false,topMargin:40};_this.loginAction=_this.loginAction.bind(_this);_this.validation=_this.validation.bind(_this);_this.forgotPasswordStatusChange=_this.forgotPasswordStatusChange.bind(_this);_constants.Tracker.trackScreenView("Login");return _this;}_createClass(Login,[{key:'componentWillMount',value:function componentWillMount()

{var _this2=this;
this.keyboardDidShowListener=_reactNative.Keyboard.addListener('keyboardDidShow',this._keyboardDidShow);
this.keyboardDidHideListener=_reactNative.Keyboard.addListener('keyboardDidHide',this._keyboardDidHide);
_reactNative.AsyncStorage.setItem('token',"",function(){
_reactNative.AsyncStorage.getItem('email',function(err,email){
console.log('email',email);
if(email){
_reactNative.AsyncStorage.getItem('password',function(err,password){
_this2.props.mutate({
variables:{
data:{
email:email,
password:password}}}).


then(function(_ref){var data=_ref.data;
console.log(data);
if(data.authenticate.jwt){
_reactNative.AsyncStorage.setItem('token',data.authenticate.jwt,function(){
console.log(_this2.state.email);
_reactNativeRouterFlux.Actions.reset("Account",{email:email});
});
}
});
}).catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed. Check Your Internet Connection.');
});
}else{
_this2.setState({loading:false});
}
});
});
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
this.keyboardDidShowListener.remove();
this.keyboardDidHideListener.remove();
}},{key:'onInputFieldChange',value:function onInputFieldChange(
name,value){
this.setState(_defineProperty({},
name,value));

}},{key:'changePasswordVisibility',value:function changePasswordVisibility()

{
var status=!this.state.isPasswordVisible;
this.setState({isPasswordVisible:status});
}},{key:'loginAction',value:function loginAction()

{var _this3=this;
_reactNative.AsyncStorage.setItem('token','');
this.setState({email:this.state.email.toLowerCase()});
var email=this.state.email.trim().toLowerCase();
var password=this.state.password;
this.props.mutate({
variables:{
data:{
email:email,
password:password}}}).


then(function(_ref2){var data=_ref2.data;
if(data.authenticate.jwt){
_reactNative.AsyncStorage.setItem('token',data.authenticate.jwt,function(){
console.log(_this3.state.email);
_reactNativeRouterFlux.Actions.reset("Account",{email:email});
});
_reactNative.AsyncStorage.setItem('email',email);
_reactNative.AsyncStorage.setItem('password',password);
_constants.Tracker.trackEvent(email,"Login In Successfull");
_reactNativeFcm2.default.on(_reactNativeFcm.FCMEvent.RefreshToken,function(token){
console.log(token);

});



_reactNativeFcm2.default.requestPermissions().then(function(){return console.log('granted');}).catch(function(){return console.log('notification permission rejected');});

_reactNativeFcm2.default.getFCMToken().then(function(token){
debug&&console.warn(token);
var body=token;
debug&&console.warn(JSON.stringify(_this3.props));
try{
debug&&console.warn("Store");
debug&&console.warn(_this3.props.store);
}catch(error)
{
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
console.warn(error);
}




























var osDevice=_reactNative.Platform.OS==='ios'?'ios':'android';
try{
fetch(_constants.SERVER_URL+'/api/test',{
method:'POST',
headers:{
Accept:'application/json',
'Content-Type':'application/json'},

body:JSON.stringify({
token:token,
actionType:'saveToken',
user_email:email,
os:osDevice})});


debug&&console.warn("Request sent");
}
catch(error)
{

console.warn(error);
}
debug&&console.warn("DATABASE UPDATED");











_reactNativeFcm2.default.getInitialNotification().then(function(notif){
console.log(notif);
});
});

}else{
_this3.setState({loginError:true,validationError:false,networkError:false});
}
}).catch(function(error){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed. Check Your Internet Connection');
_this3.setState({networkError:true,validationError:false,loginError:false});
console.log('there was an error sending the query',error);
});
}},{key:'forgotPasswordStatusChange',value:function forgotPasswordStatusChange()

{
this.setState({loginError:false});
this.setState({networkError:false});
this.setState({validationError:false});
this.setState({forgotPasswordStatus:!this.state.forgotPasswordStatus});
}},{key:'validation',value:function validation()

{var _state=
this.state,email=_state.email,password=_state.password;
var isValid=true;
if(!email&&!password){
isValid=false;
}
this.setState({validationError:!isValid,loginError:false,networkError:false});
isValid&&this.loginAction();
}},{key:'render',value:function render()

{var _this4=this;var _state2=







this.state,isPasswordVisible=_state2.isPasswordVisible,visibleFieldButton=_state2.visibleFieldButton,unVisibleFieldButton=_state2.unVisibleFieldButton,validationError=_state2.validationError,loginError=_state2.loginError,networkError=_state2.networkError;





var AdaySplashHeader=function AdaySplashHeader(){return(
React.createElement(_reactNative.View,{style:styles.homePageHeaderContainer},
React.createElement(_reactNative.Image,{style:styles.logoImage,
source:require('./assets/logos/aday-full-logo.png')})));};



return(
React.createElement(_reactNative.ScrollView,{contentContainerStyle:styles.container},
React.createElement(_reactNative.View,{style:{flex:1,backgroundColor:'#ffffff'}},


React.createElement(_reactNative.View,{style:{backgroundColor:'white',paddingTop:_reactNative.Platform.OS==='android'?0:20}},
React.createElement(_CustomNav2.default,{rightBtn:'Cancel',title:'Sign In'})),

React.createElement(_reactNative.View,null,
React.createElement(AdaySplashHeader,null),
React.createElement(_reactNative.View,{style:{marginTop:this.state.topMargin}},
React.createElement(_reactNative.View,{style:styles.inputFieldContainer},
React.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
React.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./assets/login_email.png')})),

React.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this4.onInputFieldChange('email',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'EMAIL ADDRESS',
style:{height:40},
autoCorrect:false})),



React.createElement(_reactNative.View,{style:styles.inputFieldContainer},
React.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
React.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./assets/login_key.png')})),

React.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this4.onInputFieldChange('password',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'PASSWORD',
style:{height:40},
secureTextEntry:!isPasswordVisible,
autoCorrect:false}),

React.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this4.changePasswordVisibility();},style:styles.inputFieldButtonContainer},
React.createElement(_reactNative.Image,{style:{width:25,height:25},source:isPasswordVisible?visibleFieldButton:unVisibleFieldButton}))),



validationError&&
React.createElement(_reactNative.Text,{style:styles.errorMessage},'Please fill all fields above!'),


networkError&&
React.createElement(_reactNative.Text,{style:styles.errorMessage},'Request Failed. Check Internet Connection.'),


loginError&&
React.createElement(_reactNative.Text,{style:styles.errorMessage},'Incorrect Username or Password'),


React.createElement(_reactNative.View,{style:styles.inputFieldContainer},

React.createElement(_reactNative.TouchableOpacity,{style:styles.joinButton,onPress:this.validation},
React.createElement(_reactNative.Text,{style:styles.buttonWhiteText},'LOGIN'))))),




React.createElement(_reactNative.View,{style:styles.footer},
React.createElement(_reactNative.TouchableHighlight,{underlayColor:'white',
style:styles.forgotPasswordContainer,
onPress:function onPress(){

_constants.Tracker.trackScreenView("Forgot Password");
_reactNativeRouterFlux.Actions.ForgotPassword({});
}},
React.createElement(_reactNative.Text,{style:styles.touchabletext},'FORGOT YOUR PASSWORD?'))))));










}}]);return Login;}(React.Component);


var authenticate=(0,_reactApollo.gql)(_templateObject);






var createUserDevice=(0,_reactApollo.gql)(_templateObject2);













var deleteUserDeviceByUserIdAndOs=(0,_reactApollo.gql)(_templateObject3);












var userQuery=(0,_reactApollo.gql)(_templateObject4);











var LoginComponent=(0,_reactApollo.graphql)(authenticate)(Login);exports.default=














LoginComponent;

var styles=_reactNative.StyleSheet.create({

container:{
flexDirection:"column",
alignItems:'stretch',
alignItems:'center',
backgroundColor:'#F7F7F7',
flex:1},

pageHeaderLogoContainer:{
height:200,
justifyContent:'center',
alignItems:'center'},

logoImage:{
width:110,
height:132,
resizeMode:'contain'},



inputFieldContainer:{
flexDirection:'row',
borderWidth:1,
maxWidth:width-20,
margin:10,
height:40,
justifyContent:'center',
alignSelf:'center',
borderColor:'rgba(74,74,74,0.5)',
borderRadius:6},

inputFieldIconContainer:{
backgroundColor:'rgba(153,153,153,0.3)',
width:40,
alignItems:'center',
justifyContent:'center'},

inputFieldButtonContainer:{
borderWidth:1,
borderColor:'rgba(74,74,74,0.5)',
borderRadius:6,
margin:5,
padding:2,
alignItems:'center',
justifyContent:'center'},

errorMessage:{
textAlign:'center',
paddingTop:10,
paddingBottom:10,
fontSize:17,
color:'red'},

forgotPasswordContainer:{
maxWidth:200,
marginTop:5,
flexDirection:'column',
justifyContent:'center',
alignSelf:'center'},

forgotPassword:{
color:"#4990E2",
fontSize:12,
flexDirection:'row',
justifyContent:'center',
alignSelf:'center',
fontWeight:'bold'},

doNotHaveAnAccount:{
fontSize:12,
flexDirection:'row',
justifyContent:'center',
alignSelf:'center',
fontWeight:'bold'},

forgotPasswordUntouchableText:{
color:"#232323",
fontSize:12,
fontWeight:'bold'},

joinButton:{
display:'flex',
backgroundColor:'#002DB0',
height:40,
width:width/2,
borderRadius:5,
justifyContent:'center',
alignItems:'center',
shadowRadius:4,
shadowColor:'#000000',
shadowOffset:{
width:1,
height:2},

shadowOpacity:0.5},

buttonWhiteText:{
fontSize:16,
fontFamily:'Lato-Regular',
color:'white',
fontWeight:'bold'},

footer:{

flexDirection:'row',
flexWrap:'wrap',

alignItems:'center',

justifyContent:'center',
marginHorizontal:20,
maxWidth:width},

touchabletext:{
color:'#007AFF',
fontSize:12,
fontFamily:'Lato-Regular'},

bodyText:{
fontSize:12,
fontFamily:'Lato-Regular',
color:'#505050',
alignSelf:'center',
justifyContent:'center'},










homePageHeaderContainer:{
paddingVertical:30,
justifyContent:'center',
alignItems:'center'},

logoImage:{
width:90,
height:108,
resizeMode:'contain'}});