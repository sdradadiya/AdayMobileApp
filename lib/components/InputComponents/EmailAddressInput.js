Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);


var _nativeBase=require('native-base');


var _reactNative=require('react-native');









var _InputStyles=require('./InputStyles');var _InputStyles2=_interopRequireDefault(_InputStyles);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var







EmailAddressInput=function(_Component){_inherits(EmailAddressInput,_Component);
function EmailAddressInput(props){_classCallCheck(this,EmailAddressInput);return _possibleConstructorReturn(this,(EmailAddressInput.__proto__||Object.getPrototypeOf(EmailAddressInput)).call(this,
props));
}_createClass(EmailAddressInput,[{key:'render',value:function render()
{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,{style:{
flexDirection:'row',
borderWidth:1,
margin:10,
height:40,
justifyContent:'center',
borderColor:'rgba(74,74,74,0.5)',
borderRadius:6}},

_react2.default.createElement(_reactNative.View,{style:{
backgroundColor:'rgba(153,153,153,0.3)',
width:40,
alignItems:'center',
justifyContent:'center'}},

_react2.default.createElement(_reactNative.Image,{style:{
width:25,
height:25},
source:require('../assets/login_email.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this2.onInputFieldChange('email',text);},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'EMAIL ADDRESS',
style:{height:40}})));



}}]);return EmailAddressInput;}(_react.Component);exports.default=EmailAddressInput;