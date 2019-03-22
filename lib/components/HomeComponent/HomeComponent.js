


'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['mutation authenticate($data: AuthenticateInput!){\n        authenticate(input:$data) {\n                jwt\n        }\n    }'],['mutation authenticate($data: AuthenticateInput!){\n        authenticate(input:$data) {\n                jwt\n        }\n    }']);

var _react=require('react');var React=_interopRequireWildcard(_react);
var _reactNative=require('react-native');













var _constants=require('../../constants');
var _reactNativeRouterFlux=require('react-native-router-flux');


var _reactApollo=require('react-apollo');




var _reactNativeLoopedCarousel=require('react-native-looped-carousel');var _reactNativeLoopedCarousel2=_interopRequireDefault(_reactNativeLoopedCarousel);

var _SpinnerComponent=require('../SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _calendar=require('./assets/calendar.json');var _calendar2=_interopRequireDefault(_calendar);
var _badge=require('./assets/badge.json');var _badge2=_interopRequireDefault(_badge);

var _reactNativeFcm=require('react-native-fcm');var _reactNativeFcm2=_interopRequireDefault(_reactNativeFcm);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),windowHeight=_Dimensions$get.height,width=_Dimensions$get.width;








var debug=false;var
Home=function(_React$Component){_inherits(Home,_React$Component);
function Home(props){_classCallCheck(this,Home);var _this=_possibleConstructorReturn(this,(Home.__proto__||Object.getPrototypeOf(Home)).call(this,
props));
_this.state={
modalVisible:false,
loading:true};return _this;

}_createClass(Home,[{key:'openModal',value:function openModal()

{
this.setState({modalVisible:true});
}},{key:'closeModal',value:function closeModal()

{
this.setState({modalVisible:false});
}},{key:'componentWillMount',value:function componentWillMount()

{var _this2=this;
_reactNative.AsyncStorage.setItem('token',"",function(){
_reactNative.AsyncStorage.getItem('email',function(err,email){
console.log('email',email);
if(email){
_reactNative.AsyncStorage.getItem('password',function(err,password){
if(password){
_this2.props.mutate({
variables:{
data:{
email:email,
password:password}}}).


then(function(_ref){var data=_ref.data;
if(data.authenticate.jwt){
_reactNative.AsyncStorage.setItem('token',data.authenticate.jwt,function(){
console.log(_this2.state.email);
_reactNativeRouterFlux.Actions.reset("Account",{email:email});
_constants.Tracker.trackScreenView("All Shift");
_constants.Tracker.trackEvent(email,"Login In Successfull");
_reactNativeFcm2.default.on(_reactNativeFcm.FCMEvent.RefreshToken,function(token){
console.log(token);

});



_reactNativeFcm2.default.requestPermissions().then(function(){return console.log('granted');}).catch(function(){return console.log('notification permission rejected');});

_reactNativeFcm2.default.getFCMToken().then(function(token){
debug&&console.warn(token);
var body=token;
debug&&console.warn(JSON.stringify(_this2.props));
try{
debug&&console.warn("Store");
debug&&console.warn(_this2.props.store);
}catch(error)
{
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

});
}else{
_this2.setState({loading:false});
}
}).catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
});
}else{
_this2.setState({loading:false});
}
});
}else{
_this2.setState({loading:false});
}
});
});
}},{key:'render',value:function render()


{var _this3=this;





if(this.state.loading){
return(
React.createElement(_reactNative.View,{style:{flex:1,position:'absolute',zIndex:100}},
React.createElement(_SpinnerComponent2.default,null)));


}

var AdaySplashHeader=function AdaySplashHeader(){return(
React.createElement(_reactNative.View,{style:styles.homePageHeaderContainer},
React.createElement(_reactNative.Image,{style:styles.logoImage,
source:require('./../assets/logos/aday-full-logo.png')})));};









var JoinAdayButtonTemp=function JoinAdayButtonTemp(){return(
React.createElement(_reactNative.TouchableOpacity,{style:styles.joinButton,onPress:function onPress(){return _this3.openModal();}},
React.createElement(_reactNative.Text,{style:styles.buttonWhiteText},'JOIN ADAY')));};



var SignInButton=function SignInButton(){return(
React.createElement(_reactNative.TouchableOpacity,{style:styles.signButton,onPress:function onPress(){return _reactNativeRouterFlux.Actions.Login({});}},
React.createElement(_reactNative.Text,{style:styles.buttonBlueText},'SIGN IN')));};









return(
React.createElement(_reactNative.View,{style:styles.homePageContainer},
React.createElement(AdaySplashHeader,null),
React.createElement(_reactNativeLoopedCarousel2.default,{delay:10000,style:styles.carouselContainer,autoplay:true,bullets:true,bulletStyle:styles.carouselBulletStyle,chosenBulletStyle:styles.carouselChosenBulletStyle,bulletsContainerStyle:styles.carouselBulletsContainerStyle},
React.createElement(_reactNative.View,{style:styles.container},
React.createElement(_reactNative.Image,{resizeMode:'contain',style:{flex:2,width:"60%"},source:require('./assets/manage-schedule.png')}),
React.createElement(_reactNative.Text,{style:styles.bodyText},'Manage your schedule and pick up extra shifts from your workplace')),

React.createElement(_reactNative.View,{style:styles.container},
React.createElement(_reactNative.Image,{resizeMode:'contain',style:{flex:2,width:"60%"},source:require('./assets/climb-ladder.png')}),
React.createElement(_reactNative.Text,{style:styles.bodyText},'Build your career through training opportunities at premium employers')),

React.createElement(_reactNative.View,{style:styles.container},
React.createElement(_reactNative.Image,{resizeMode:'contain',style:{flex:2,width:"60%"},source:require('./assets/preferences.png')}),
React.createElement(_reactNative.Text,{style:styles.bodyText},'Enter your scheduling preferences and influence when, where, and how you earn'))),



React.createElement(_reactNative.View,{style:styles.footerContainer},

React.createElement(_reactNative.View,{style:{flexDirection:'row'}},
React.createElement(_reactNative.View,{style:{flex:0.06}}),
React.createElement(JoinAdayButtonTemp,null),
React.createElement(_reactNative.View,{style:{flex:0.03}}),
React.createElement(SignInButton,null),
React.createElement(_reactNative.View,{style:{flex:0.06}}))),






React.createElement(_reactNative.Modal,{animationType:"slide",transparent:false,visible:this.state.modalVisible,onRequestClose:function onRequestClose(){return _this3.closeModal();}},
React.createElement(_reactNative.View,{style:{marginTop:22}},
React.createElement(_br,null),
React.createElement(_reactNative.Text,{style:{color:'#000',alignSelf:'center',fontSize:24,fontFamily:'RobotoCondensed-Regular'}},'Invitation Only'),
React.createElement(_reactNative.View,{style:{height:200,justifyContent:'center',alignItems:'center'}},
React.createElement(_reactNative.Image,{
style:{width:150,height:150,resizeMode:'contain'},
source:{uri:'https://s3.us-east-2.amazonaws.com/aday-mail-alerts/invitation-envelope.png'}})),


React.createElement(_reactNative.Text,{style:{color:'#595959',alignSelf:'center',fontSize:16,fontFamily:'Lato-Regular'}},'Currently, sign-ups are by invitation only'),
React.createElement(_reactNative.Text,{style:{color:'#595959',alignSelf:'center',fontSize:16,fontFamily:'Lato-Regular'}},'Contact your HR rep for sign-up information'),
React.createElement(_br,null),
React.createElement(_reactNative.Button,{onPress:function onPress(){return _this3.closeModal();},title:'GO BACK'})))));




}}]);return Home;}(React.Component);
var authenticate=(0,_reactApollo.gql)(_templateObject);






var HomeComponent=(0,_reactApollo.graphql)(authenticate)(Home);exports.default=
HomeComponent;

var styles=_reactNative.StyleSheet.create({



homePageContainer:{
flex:1,
flexDirection:'column',
backgroundColor:"#FFFFFF"},

container:{
flex:1,
flexDirection:"column",
justifyContent:'center',
alignItems:'center',
backgroundColor:'#FFFFFF'},

footerContainer:{
flex:0.75,
flexDirection:'column',
justifyContent:'center',
alignItems:'center',
backgroundColor:"#ECEFF1"},

bodyText:{
width:"80%",
marginTop:20,
marginBottom:50,
fontSize:16,
fontFamily:'Lato-Regular',
color:'#4A4A4A',
textAlign:'center'},






animation:{
width:width-width*0.6,



justifyContent:'center',
alignItems:'center'},

carouselContainer:{
width:width*.95,
flex:2,
alignSelf:'center',
justifyContent:'flex-start',
padding:0},

carouselBulletStyle:{
backgroundColor:'grey',
borderColor:'transparent'},

carouselChosenBulletStyle:{
backgroundColor:'black',
borderColor:'transparent'},

carouselBulletsContainerStyle:{
marginTop:10},









homePageHeaderContainer:{
paddingTop:40,
paddingBottom:20,
justifyContent:'center',
alignItems:'center'},

logoImage:{
paddingTop:10,
width:90,
height:108,
resizeMode:'contain'},





joinButton:{
display:'flex',
backgroundColor:'#002DB0',
height:75,
borderRadius:5,
flex:0.41,
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






signButton:{
display:'flex',
backgroundColor:'#FFF',
height:75,
borderRadius:5,
flex:0.41,
justifyContent:'center',
alignItems:'center',
borderColor:'#002DB0',
borderWidth:1,
shadowRadius:4,
shadowColor:'#000000',
shadowOffset:{
width:1,
height:2},

shadowOpacity:0.5},

buttonBlueText:{
fontSize:16,
fontFamily:'Lato-Regular',
color:'#002DB0',
fontWeight:'bold'},





opportunitiesButton:{
backgroundColor:'#00A863',
width:width*.88,
height:45,
paddingVertical:5,
margin:5,
justifyContent:'center',
alignItems:'center',
borderRadius:5,
shadowRadius:4,
shadowColor:'#000000',
shadowOffset:{
width:1,
height:2},

shadowOpacity:0.5}});