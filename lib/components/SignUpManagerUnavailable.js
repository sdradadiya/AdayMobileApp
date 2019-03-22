Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');







var _reactNativeRouterFlux=require('react-native-router-flux');
var _index=require('../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

SignUpManagerUnavailable=function(_Component){_inherits(SignUpManagerUnavailable,_Component);
function SignUpManagerUnavailable(props){_classCallCheck(this,SignUpManagerUnavailable);var _this=_possibleConstructorReturn(this,(SignUpManagerUnavailable.__proto__||Object.getPrototypeOf(SignUpManagerUnavailable)).call(this,
props));
_index.Tracker.trackScreenView("SignUp Manager Unavailable");return _this;

}_createClass(SignUpManagerUnavailable,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,backgroundColor:'#F7F7F7'}},
_react2.default.createElement(_reactNative.ScrollView,null,
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.View,{style:{width:289,alignItems:'center',marginTop:'5%'}},
_react2.default.createElement(_reactNative.Image,{style:{width:186,height:186,marginBottom:30},
source:require('./assets/login-unavailable.png')}),
_react2.default.createElement(_reactNative.Text,{style:styles.emptyMessage},'Join us at www.joinaday.com'),
_react2.default.createElement(_reactNative.Text,{style:styles.emptyMessageInstruction},'We\'re currently developing our manager application. In the meantime, please register through our website!'))))));







}}]);return SignUpManagerUnavailable;}(_react.Component);exports.default=SignUpManagerUnavailable;


var styles=_reactNative.StyleSheet.create({
container:_extends({
flex:1,
marginTop:10,
paddingHorizontal:5,
paddingBottom:10,
alignItems:'center',
backgroundColor:'#F7F7F7'},
_reactNative.Platform.select({
ios:{
paddingTop:64},

android:{
paddingTop:54}})),



emptyMessage:{
marginTop:10,
fontSize:19.0,
fontFamily:'Roboto',
color:'black',
textAlign:'center'},

emptyMessageInstruction:{
marginTop:10,
fontSize:15.2,
fontFamily:'Lato',
color:'#494949',
textAlign:'center'}});