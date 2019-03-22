Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation updatePassword($id: Uuid!, $password: String! ) {\n    updatePassword(input: { id: $id , password: $password }) {\n        boolean\n    }\n  }'],['\n  mutation updatePassword($id: Uuid!, $password: String! ) {\n    updatePassword(input: { id: $id , password: $password }) {\n        boolean\n    }\n  }']);


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');










var _nativeBase=require('native-base');
var _reactApollo=require('react-apollo');
var _reactNativeRouterFlux=require('react-native-router-flux');

var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

ChangePassword=function(_Component){_inherits(ChangePassword,_Component);
function ChangePassword(props){_classCallCheck(this,ChangePassword);var _this=_possibleConstructorReturn(this,(ChangePassword.__proto__||Object.getPrototypeOf(ChangePassword)).call(this,
props));
_this.state={
oldPassword:'',
newPassword:'',
isOldPasswordVisible:true,
isNewPasswordVisible:false,
visibleFieldButton:require('./../assets/visibleInputField.png'),
unVisibleFieldButton:require('./../assets/unVisibleInputField.png'),
errorMessageText:"",
passwordReset:false};

_this.onInputFieldChange=_this.onInputFieldChange.bind(_this);
_this.changePasswordVisibility=_this.changePasswordVisibility.bind(_this);
_this.updatePassword=_this.updatePassword.bind(_this);
_this.validation=_this.validation.bind(_this);
_index.Tracker.trackScreenView("Change Password");return _this;

}_createClass(ChangePassword,[{key:'onInputFieldChange',value:function onInputFieldChange(

name,value){
this.setState(_defineProperty({},name,value));
}},{key:'changePasswordVisibility',value:function changePasswordVisibility(

name){
var stateName='is'+name+'Visible';
var status=!this.state[stateName];
this.setState(_defineProperty({},stateName,status));
}},{key:'validation',value:function validation()
{
var errorMessage="";
if(this.state.newPassword!=this.state.newPasswordTwo){
errorMessage="New Passwords Do Not Match.";
}
if(!this.state.oldPassword||!this.state.newPassword){
errorMessage="Please Fill Out All Above Fields.";
}
errorMessage?this.setState({errorMessageText:errorMessage}):this.updatePassword();
}},{key:'updatePassword',value:function updatePassword()

{var _this2=this;
var update={
id:this.props.userId,
password:this.state.newPassword};

this.props.updatePassword({variables:update}).
then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update User Password");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Update User Password");
});
_this2.setState({passwordReset:true});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
_this2.setState({errorMessageText:"Did not save new password"});
console.log(err);
console.log(id);
});

}},{key:'render',value:function render()

{var _this3=this;var _state=
this.state,errorMessageText=_state.errorMessageText,passwordReset=_state.passwordReset,isNewPasswordVisible=_state.isNewPasswordVisible,isNewPasswordTwoVisible=_state.isNewPasswordTwoVisible,isOldPasswordVisible=_state.isOldPasswordVisible,unVisibleFieldButton=_state.unVisibleFieldButton,visibleFieldButton=_state.visibleFieldButton;

return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
!passwordReset&&
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:require('./../assets/login_key.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this3.onInputFieldChange('oldPassword',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'OLD PASSWORD',
secureTextEntry:!isOldPasswordVisible}),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this3.changePasswordVisibility('OldPassword');},style:styles.inputFieldButtonContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:isOldPasswordVisible?visibleFieldButton:unVisibleFieldButton}))),


_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:require('./../assets/login_key.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this3.onInputFieldChange('newPassword',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'NEW PASSWORD',
secureTextEntry:!isNewPasswordVisible}),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this3.changePasswordVisibility('NewPassword');},style:styles.inputFieldButtonContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:isNewPasswordVisible?visibleFieldButton:unVisibleFieldButton}))),


_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:require('./../assets/login_key.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this3.onInputFieldChange('newPasswordTwo',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'RE-ENTER NEW PASSWORD',
secureTextEntry:!isNewPasswordTwoVisible}),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this3.changePasswordVisibility('NewPasswordTwo');},style:styles.inputFieldButtonContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:isNewPasswordVisible?visibleFieldButton:unVisibleFieldButton}))),


_react2.default.createElement(_reactNative.View,{style:styles.errorMessageTextContainer},
!!errorMessageText&&
_react2.default.createElement(_reactNative.Text,{style:styles.errorMessageText},
errorMessageText)),





_react2.default.createElement(_reactNative.View,{style:styles.updateButtonContainer},
_react2.default.createElement(_reactNative.Button,{title:'UPDATE',onPress:this.validation,style:styles.updateButton}))),



passwordReset&&
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.successMessageText},'Password Reset Successful. You will use this new password next time you log in.'),


_react2.default.createElement(_reactNative.Button,{title:'GO BACK',style:[styles.updateButton,{marginTop:20}],onPress:function onPress(){return _reactNativeRouterFlux.Actions.pop();}}))));






}}]);return ChangePassword;}(_react.Component);


var updatePassword=(0,_reactApollo.gql)(_templateObject);exports.default=






(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(updatePassword,{
name:'updatePassword'}))(

ChangePassword);


var styles=_reactNative.StyleSheet.create({
container:_extends({
flex:1,
backgroundColor:'white'},
_reactNative.Platform.select({
ios:{
paddingTop:64},

android:{
paddingTop:54}}),{


paddingHorizontal:5}),

inputFieldContainer:{
flexDirection:'row',
borderWidth:1,
margin:10,
height:40,
justifyContent:'center',
borderColor:'rgba(74,74,74,0.5)',
borderRadius:6},

inputFieldIconContainer:{
backgroundColor:'rgba(153,153,153,0.3)',
width:30,
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

errorMessageTextContainer:{
marginTop:10,
justifyContent:'center'},

errorMessageText:{
color:'black',
textAlign:'center',
fontWeight:'bold'},

successMessageText:{
color:'blue',
textAlign:'center',
fontWeight:'bold'},

updateButtonContainer:{
alignSelf:'center',
margin:20,
width:width/2},

updateButton:{
backgroundColor:'#0022A1',
marginTop:20}});