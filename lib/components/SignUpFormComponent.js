Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);


var _nativeBase=require('native-base');



var _reactNative=require('react-native');











var _reactNativeRouterFlux=require('react-native-router-flux');






var _reactNativeImagePicker=require('react-native-image-picker');var _reactNativeImagePicker2=_interopRequireDefault(_reactNativeImagePicker);
var _styles=require('../styles');var _styles2=_interopRequireDefault(_styles);
var _PrivacyPolicy=require('../pages/PrivacyPolicy');var _PrivacyPolicy2=_interopRequireDefault(_PrivacyPolicy);
var _TermsOfService=require('../pages/TermsOfService');var _TermsOfService2=_interopRequireDefault(_TermsOfService);
var _CustomNav=require('./CustomNav');var _CustomNav2=_interopRequireDefault(_CustomNav);
var _index=require('../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var








SignUpFormComponent=function(_Component){_inherits(SignUpFormComponent,_Component);

function SignUpFormComponent(props){_classCallCheck(this,SignUpFormComponent);var _this=_possibleConstructorReturn(this,(SignUpFormComponent.__proto__||Object.getPrototypeOf(SignUpFormComponent)).call(this,
props));
_this.state={
firstName:'',
lastName:'',
email:'',
password:'',
zipCode:'',
validationError:false,
visibleFieldButton:require('./assets/visibleInputField.png'),
unVisibleFieldButton:require('./assets/unVisibleInputField.png'),
isPasswordVisible:false};

_this.signUpAction=_this.signUpAction.bind(_this);
_this.validation=_this.validation.bind(_this);
_index.Tracker.trackScreenView("Sign Up Form");return _this;

}_createClass(SignUpFormComponent,[{key:'onInputFieldChange',value:function onInputFieldChange(

name,value){
this.setState(_defineProperty({},
name,value));

}},{key:'changePasswordVisibility',value:function changePasswordVisibility()

{
var status=!this.state.isPasswordVisible;
this.setState({
isPasswordVisible:status});

}},{key:'signUpAction',value:function signUpAction()

{

}},{key:'validation',value:function validation()






{var _state=






this.state,email=_state.email,password=_state.password,firstName=_state.firstName,lastName=_state.lastName,zipCode=_state.zipCode;
var isValid=true;
if(!email&&!password&&!firstName&&!lastName&&!zipCode){
isValid=false;
}
this.setState({
validationError:!isValid});

isValid&&this.signUpType();
}},{key:'render',value:function render()

{var _this2=this;var _state2=





this.state,isPasswordVisible=_state2.isPasswordVisible,visibleFieldButton=_state2.visibleFieldButton,unVisibleFieldButton=_state2.unVisibleFieldButton,validationError=_state2.validationError;


{




}

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
marginTop:20,
marginBottom:20},
onPress:function onPress(){return _reactNativeRouterFlux.Actions.SignUpType({});}},

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

_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'white',flex:64/677}},
_react2.default.createElement(_CustomNav2.default,{rightBtn:'Cancel',title:'Account Signup'})),


_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'white',flex:625/677}},


_react2.default.createElement(_reactNative.View,{style:styles.pageHeaderLogoContainer},
_react2.default.createElement(_reactNative.Image,{style:styles.logoImage,
source:require('./assets/logos/aday-full-logo.png')})),



_react2.default.createElement(_reactNative.View,{style:{flex:354/667,maxWidth:width-20,marginLeft:width/2-(width/2-10)}},


_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:25,height:22},source:require('./assets/First_Name.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this2.onInputFieldChange('firstName',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'FIRST NAME',
style:{height:40}})),




_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:25,height:22},source:require('./assets/Last_Name.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this2.onInputFieldChange('lastName',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'LAST NAME',
style:{height:40}})),




_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./assets/login_key.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this2.onInputFieldChange('password',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
style:{height:40},
placeholder:'PASSWORD',
secureTextEntry:!isPasswordVisible}),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this2.changePasswordVisibility();},style:styles.inputFieldButtonContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:isPasswordVisible?visibleFieldButton:unVisibleFieldButton}))),




_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./assets/Icons_Home.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this2.onInputFieldChange('zipCode',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'ZIP CODE',
style:{height:40}})),




_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./assets/login_email.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this2.onInputFieldChange('email',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'EMAIL ADDRESS',
style:{height:40}})),



validationError&&
_react2.default.createElement(_reactNative.Text,{style:styles.validationError},'Please fill all fields above!')),






_react2.default.createElement(_reactNative.View,{style:{flex:180/667}},

_react2.default.createElement(_reactNative.View,{style:{minWidth:width}}),

_react2.default.createElement(_reactNative.View,{style:styles.footer},
_react2.default.createElement(_reactNative.Text,{style:styles.bodyText},'BY USING ADAY YOU AGREE TO THE '),
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.PrivacyPolicy({});}},
_react2.default.createElement(_reactNative.Text,{style:styles.touchabletext},'PRIVACY POLICY')),


_react2.default.createElement(_reactNative.Text,{style:styles.bodyText},' AND THE '),
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.TermsOfService({});}},
_react2.default.createElement(_reactNative.Text,{style:styles.touchabletext},'TERMS OF SERVICE'))),



_react2.default.createElement(_button160,null,'CREATE ACCOUNT'),

_react2.default.createElement(_reactNative.View,{style:styles.footer},
_react2.default.createElement(_reactNative.Text,{style:styles.bodyText},' ALREADY HAVE AN ACCOUNT? '),
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.Login({});}},
_react2.default.createElement(_reactNative.Text,{style:styles.touchabletext},'SIGN IN')))))));








}}]);return SignUpFormComponent;}(_react.Component);exports.default=SignUpFormComponent;


var styles=_reactNative.StyleSheet.create({
container:{
flexDirection:"column",
alignItems:'stretch',
width:width,
alignItems:'center',
backgroundColor:'#F7F7F7',
flex:1},

headerContainer:{
height:44,
width:width,
flexDirection:'row',
backgroundColor:'#F7F7F7',
justifyContent:'space-between',
alignItems:'center',
borderBottomColor:'#B8B8B8',
borderBottomWidth:1,
paddingHorizontal:15},





pageHeaderLogoContainer:{
flex:135/667,
justifyContent:'center',
alignItems:'center'},

logoImage:{
maxWidth:60,
resizeMode:'contain'},





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
fontSize:18,
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
fontSize:12,
fontFamily:'Lato-Regular',
color:'#505050',
alignSelf:'center',
justifyContent:'center'}});