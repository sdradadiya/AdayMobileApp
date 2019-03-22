Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _nativeBase=require('native-base');
var _reactNative=require('react-native');












var _styles=require('../assets/styles');var _styles2=_interopRequireDefault(_styles);
var _reactNativeKeyboardSpacer=require('react-native-keyboard-spacer');var _reactNativeKeyboardSpacer2=_interopRequireDefault(_reactNativeKeyboardSpacer);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=

_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

ForgotPasswordComponent=function(_Component){_inherits(ForgotPasswordComponent,_Component);
function ForgotPasswordComponent(props){_classCallCheck(this,ForgotPasswordComponent);var _this=_possibleConstructorReturn(this,(ForgotPasswordComponent.__proto__||Object.getPrototypeOf(ForgotPasswordComponent)).call(this,
props));
_this.state={
fadeAnim:new _reactNative.Animated.Value(0),
phoneNumber:'',
validationError:false};


_this.temporaryPassword=_this.temporaryPassword.bind(_this);
_this.validation=_this.validation.bind(_this);
_this.closeTemporaryPassword=_this.closeTemporaryPassword.bind(_this);
_index.Tracker.trackScreenView("Forgot Password");return _this;
}_createClass(ForgotPasswordComponent,[{key:'componentDidMount',value:function componentDidMount()

{
_reactNative.Animated.timing(
this.state.fadeAnim,{
toValue:1,
duration:100}).

start();
}},{key:'validation',value:function validation()

{
this.state.phoneNumber?this.temporaryPassword():this.setState({validationError:true});
}},{key:'temporaryPassword',value:function temporaryPassword()

{
this.props.actions.temporaryPassword(this.state.phoneNumber);
this.props.forgotPasswordStatusChange();
}},{key:'closeTemporaryPassword',value:function closeTemporaryPassword()

{
this.props.forgotPasswordStatusChange();
}},{key:'render',value:function render()


{var _this2=this;
return(
_react2.default.createElement(_reactNative.ScrollView,null,
_react2.default.createElement(_reactNative.Animated.View,{
style:{opacity:this.state.fadeAnim}},

_react2.default.createElement(_reactNative.View,{style:componentStyle.pageContainer},
_react2.default.createElement(_reactNative.View,{style:componentStyle.pageHeaderContainer}),


_react2.default.createElement(_reactNative.View,{style:{marginLeft:10,marginTop:30}},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:this.closeTemporaryPassword},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:25,height:25},
source:require('../assets/Icons_Exit.png')}))),



_react2.default.createElement(_reactNative.View,{style:componentStyle.contentPart},

this.state.validationError&&
_react2.default.createElement(_reactNative.Text,{style:componentStyle.validationError},'Must enter phone number.'),




_react2.default.createElement(_nativeBase.List,{style:this.state.validationError?_styles2.default.contentContainerError:_styles2.default.contentContainer},

_react2.default.createElement(_reactNative.View,{style:componentStyle.inputField},
_react2.default.createElement(_reactNative.View,{style:componentStyle.center},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:30,height:30},
source:require('../assets/mobile_phone.png')})),


_react2.default.createElement(_reactNative.View,{style:{flex:1}},
_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this2.setState({phoneNumber:text});},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholder:'(_ _ _) _ _ _ - _ _ _ _',
secureTextEntry:true,
keyboardType:'numeric'}))),




_react2.default.createElement(_reactNative.View,{style:componentStyle.buttonContainer},
_react2.default.createElement(_nativeBase.Button,{block:true,style:_styles2.default.buttonStyle,
onPress:this.validation},
_react2.default.createElement(_reactNative.Text,{style:componentStyle.buttonName},'SEND TEMPORARY PASSWORD'))),


_react2.default.createElement(_reactNative.View,{style:componentStyle.textContainer},
_react2.default.createElement(_reactNative.Text,{style:componentStyle.textPart},'Your temporary password will be sent to your mobile phone number')))))),






_react2.default.createElement(_reactNativeKeyboardSpacer2.default,null)));



}}]);return ForgotPasswordComponent;}(_react.Component);exports.default=ForgotPasswordComponent;


var componentStyle=_reactNative.StyleSheet.create({
pageContainer:{
flex:1,
height:height,
width:width,
flexDirection:'column'},

pageHeaderContainer:{
flex:1,
backgroundColor:"rgba(255,255,255,0.7)"},

contentPart:{
flex:1.6,
backgroundColor:"white",
flexDirection:"column",
justifyContent:'center',
alignItems:'flex-start'},

contentContainer:{
marginTop:30,
flex:1,
flexDirection:"column",
justifyContent:'center',
alignItems:'center',
alignSelf:'flex-start'},

contentContainerError:{
marginTop:10,
flex:1,
flexDirection:"column",
justifyContent:'center',
alignItems:'center',
alignSelf:'flex-start'},

inputFieldContainer:{
height:60,
borderWidth:1,
marginTop:10,
marginLeft:10,
marginRight:10,
paddingLeft:20,
paddingRight:20,
paddingTop:0,
paddingBottom:0},

buttonContainer:{
marginTop:20,
flex:2},

buttonStyle:{
flex:1,
width:width-20,
maxHeight:80,
minHeight:80,
marginLeft:10,
marginRight:10,
backgroundColor:'transparent',
paddingHorizontal:0},

buttonName:{
color:'white',
fontSize:20},

buttonBackground:{
paddingHorizontal:20,
flex:1,
width:null,
height:null,
resizeMode:'cover',
flexDirection:'column',
justifyContent:'center',
alignItems:'center',
alignSelf:'flex-end'},

textContainer:{
flex:2},

bottomClearPart:{
flex:2},

inputField:{
flexDirection:'row',
borderWidth:1,
height:40,
marginHorizontal:10,
paddingLeft:10},

textPart:{
flex:1,
textAlign:'center',
fontSize:18,
color:'#4A4A4A'},

validationError:{
marginLeft:10,
textAlign:'center',
flex:.1,
paddingTop:30,
fontSize:18,
color:'red'},

center:{
justifyContent:'center',
alignItems:'center'}});