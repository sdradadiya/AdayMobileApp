Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);


var _nativeBase=require('native-base');






var _reactNative=require('react-native');




















var _reactNativeRouterFlux=require('react-native-router-flux');


var _styles=require('./assets/styles');var _styles2=_interopRequireDefault(_styles);
var _styles3=require('../styles');var _styles4=_interopRequireDefault(_styles3);
var _CustomNav=require('./CustomNav');var _CustomNav2=_interopRequireDefault(_CustomNav);
var _EmailAddressInput=require('./InputComponents/EmailAddressInput');var _EmailAddressInput2=_interopRequireDefault(_EmailAddressInput);
var _reactNativeKeyboardSpacer=require('react-native-keyboard-spacer');var _reactNativeKeyboardSpacer2=_interopRequireDefault(_reactNativeKeyboardSpacer);
var _constants=require('../constants');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var





ForgotPwdComponent=function(_Component){_inherits(ForgotPwdComponent,_Component);
function ForgotPwdComponent(props){_classCallCheck(this,ForgotPwdComponent);var _this=_possibleConstructorReturn(this,(ForgotPwdComponent.__proto__||Object.getPrototypeOf(ForgotPwdComponent)).call(this,
props));_this.












_keyboardDidShow=function(e){
var height=e.endCoordinates.height;
_this.setState({
bottomMargin:-height,
topMargin:-80});


};_this.

_keyboardDidHide=function(e){

_this.setState({
bottomMargin:0,
topMargin:0});




};_this.state={email:'',validationError:false,modalVisible:false,emailNotFound:false,requestFailed:false,bottomMargin:0,topMargin:0};_this.sendPasswordReset=_this.sendPasswordReset.bind(_this);_this.validation=_this.validation.bind(_this);return _this;}_createClass(ForgotPwdComponent,[{key:'componentWillMount',value:function componentWillMount()
{
this.keyboardDidShowListener=_reactNative.Keyboard.addListener('keyboardDidShow',this._keyboardDidShow);
this.keyboardDidHideListener=_reactNative.Keyboard.addListener('keyboardDidHide',this._keyboardDidHide);
}},{key:'componentWillUnmount',value:function componentWillUnmount()
{
this.keyboardDidShowListener.remove();
this.keyboardDidHideListener.remove();
}},{key:'onInputFieldChange',value:function onInputFieldChange(

name,value){
this.setState(_defineProperty({},
name,value));

}},{key:'setModalVisible',value:function setModalVisible(

visible){
this.setState({
modalVisible:visible});

}},{key:'sendPasswordReset',value:function sendPasswordReset(

email){var _this2=this;
fetch('https://20170808t142850-dot-forward-chess-157313.appspot.com/api/password',{
method:'POST',
headers:{
Accept:'application/json',
'Content-Type':'application/json'},

body:JSON.stringify({
email:email})}).

then(function(response){
console.log(response);
_reactNative.AsyncStorage.getItem('email').then(function(value){
_constants.Tracker.trackEvent(value,"Password Reset");
}).catch(function(err){
_constants.Tracker.trackEvent("Not Define","Password Reset");
});

if(response.status==500){
_this2.setState({
emailNotFound:true});

}else if(response.status==200){
_constants.Tracker.trackScreenView("Home");
_constants.Tracker.trackEvent(email,"Forgot Password Successfull");
_this2.setModalVisible(true);
}
}).catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
_this2.setState({
requestFailed:true});

});
}},{key:'validation',value:function validation()

{var

email=
this.state.email;

var isValid=true;

if(!email){
isValid=false;
}else{
var lowerCaseEmail=email.toLowerCase();
this.sendPasswordReset(lowerCaseEmail);
}

this.setState({
validationError:!isValid,
emailNotFound:false});


}},{key:'render',value:function render()

{var _this3=this;var _state=




this.state,validationError=_state.validationError,emailNotFound=_state.emailNotFound,requestFailed=_state.requestFailed;

var _button160=function _button160(props){return(
_react2.default.createElement(_reactNative.TouchableOpacity,{style:{
display:'flex',
backgroundColor:'#002DB0',
height:40,
width:width/2,
borderRadius:2,
alignSelf:'center',
shadowRadius:2,
shadowColor:'#000000',
shadowOffset:{
width:1,
height:2},

shadowOpacity:0.5,
marginTop:15,
marginBottom:20},
onPress:_this3.validation},

_react2.default.createElement(_reactNative.View,{style:{
flex:1,
justifyContent:'center',
alignItems:'center'}},

_react2.default.createElement(_reactNative.Text,{style:{
fontSize:16,
fontFamily:'Lato-Regular',
color:'white',
fontWeight:'bold'}},' ',
props.children,' '))));};





return(
_react2.default.createElement(_reactNative.View,{style:styles.container},


_react2.default.createElement(StatusBarSpacer,null),

_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'white',flex:70/667}},
_react2.default.createElement(_CustomNav2.default,{rightBtn:'Back',title:'Reset'})),

_react2.default.createElement(_reactNative.ScrollView,null,

_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'white',flex:453/667}},


_react2.default.createElement(_reactNative.View,{style:{minWidth:width}}),

_react2.default.createElement(_br,null),
_react2.default.createElement(_reactNative.Text,{style:{color:'#000',alignSelf:'center',fontSize:20,fontFamily:'RobotoCondensed-Regular'}},' NEED TO RESET YOUR PASSWORD? '),
_react2.default.createElement(_reactNative.Text,{style:{color:'#595959',alignSelf:'center',fontSize:14,fontFamily:'Lato-Regular'}},'No problem. We\'ll send a new password by email.'),

_react2.default.createElement(_reactNative.View,{style:styles.pageHeaderLogoContainer},
_react2.default.createElement(_reactNative.Image,{style:styles.logoImage,
source:{uri:'https://s3.us-east-2.amazonaws.com/aday-mail-alerts/password-lost.png'}})),



_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./assets/login_email.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this3.onInputFieldChange('email',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'EMAIL ADDRESS',
style:{height:40}})),



validationError&&
_react2.default.createElement(_reactNative.Text,{style:styles.validationError},'Please Enter Your Email Address'),



emailNotFound&&
_react2.default.createElement(_reactNative.Text,{style:styles.validationError},'Email Not Found.'),



requestFailed&&
_react2.default.createElement(_reactNative.Text,{style:styles.validationError},'There was an error resetting password.'),





_react2.default.createElement(_reactNative.View,{style:{marginTop:2}},
_react2.default.createElement(_reactNative.Modal,{
animationType:"slide",
transparent:false,
visible:this.state.modalVisible,
onRequestClose:function onRequestClose(){
_this3.setModalVisible(!_this3.state.modalVisible);
_reactNativeRouterFlux.Actions.home({});
}},

_react2.default.createElement(_reactNative.View,{style:{marginTop:2}},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_br,null),
_react2.default.createElement(_reactNative.Text,{style:{color:'#000',alignSelf:'center',fontSize:24,fontFamily:'Roboto'}},' We\'ve Sent You An Email '),

_react2.default.createElement(_reactNative.View,{style:styles.pageHeaderLogoContainer},
_react2.default.createElement(_reactNative.Image,{style:styles.logoImage,
source:{uri:'https://s3.us-east-2.amazonaws.com/aday-mail-alerts/invitation-envelope.png'}})),


_react2.default.createElement(_reactNative.Text,{style:{color:'#595959',alignSelf:'center',fontSize:16,fontFamily:'Lato-Regular'}},'Click the "reset password" button in your email:'),
_react2.default.createElement(_reactNative.Text,{style:{color:'#595959',alignSelf:'center',fontSize:16,fontFamily:'Lato-Regular'}},this.state.email),
_react2.default.createElement(_br,null),

_react2.default.createElement(_reactNative.TouchableHighlight,{style:styles.resetEmailButton,onPress:function onPress(){
_this3.setModalVisible(!_this3.state.modalVisible);
_reactNativeRouterFlux.Actions.home({});
}},
_react2.default.createElement(_reactNative.View,{style:{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'RETURN HOME'))))))),







_react2.default.createElement(_reactNative.View,{style:{height:100}},
_react2.default.createElement(_button160,null,'RESET MY PASSWORD'))),


_react2.default.createElement(_reactNativeKeyboardSpacer2.default,null))));






}}]);return ForgotPwdComponent;}(_react.Component);exports.default=ForgotPwdComponent;


var styles=_reactNative.StyleSheet.create({
container:{
marginTop:-5,
flexDirection:"column",

alignItems:'center',
backgroundColor:'#FAFAFA',
flex:1},

pageHeaderLogoContainer:{
justifyContent:'center',
alignItems:'center'},

logoImage:{
width:150,
height:150,
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

validationError:{
textAlign:'center',
paddingTop:5,
fontFamily:'Lato-Regular',
fontSize:14,
color:'red'},

footer:{

flexDirection:'row',
flexWrap:'wrap',

alignItems:'center',

justifyContent:'center',
maxWidth:width-20},

touchabletext:{
color:'#007AFF',
fontSize:12,
fontFamily:'Lato-Regular'},

bodyText:{
fontSize:14,
fontFamily:'Lato-Regular',
color:'#505050',
alignSelf:'center',
justifyContent:'center'},

resetEmailButton:{
display:'flex',
backgroundColor:'#00A863',
height:40,
width:width/2,
borderRadius:2,
alignSelf:'center',
shadowRadius:2,
shadowColor:'#000000',
shadowOffset:{
width:1,
height:2},

shadowOpacity:0.5,
marginTop:10,
marginBottom:10},

buttonText:{
fontSize:16,
fontFamily:'Lato-Regular',
color:'white',
fontWeight:'bold'}});