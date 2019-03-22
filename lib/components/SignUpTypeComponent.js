Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');






var _reactNativeRouterFlux=require('react-native-router-flux');


var _styles=require('../styles');var _styles2=_interopRequireDefault(_styles);




var _index=require('../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var












SignUpTypeComponent=function(_Component){_inherits(SignUpTypeComponent,_Component);
function SignUpTypeComponent(props){_classCallCheck(this,SignUpTypeComponent);var _this=_possibleConstructorReturn(this,(SignUpTypeComponent.__proto__||Object.getPrototypeOf(SignUpTypeComponent)).call(this,
props));
_index.Tracker.trackScreenView("SignUp Type");return _this;
}_createClass(SignUpTypeComponent,[{key:'render',value:function render()

{

return(
_react2.default.createElement(_reactNative.View,{style:_styles2.default.flexColCtr(1)},


_react2.default.createElement(_reactNative.Text,{style:{flex:0.15,textAlign:'center'}},
_react2.default.createElement(_br,null),
_react2.default.createElement(_h2,null,' Welcome to Aday! '),
_react2.default.createElement(_br,null),
_react2.default.createElement(_h3,null,' Please choose your account type ')),




_react2.default.createElement(_reactNative.View,{style:_styles2.default.flexColCtr(0.85)},
_react2.default.createElement(_reactNative.TouchableOpacity,{
style:_extends({flex:0.49},_styles2.default.squareCenter95),
onPress:function onPress(){return _reactNativeRouterFlux.Actions.ShiftDetails({});}},

_react2.default.createElement(_reactNative.Image,{
source:require('./assets/team_member_signup_two.png')})),


_react2.default.createElement(_reactNative.View,{style:{flex:0.02}}),

_react2.default.createElement(_reactNative.TouchableOpacity,{
style:_extends({flex:0.49},_styles2.default.squareCenter95),
onPress:function onPress(){return _reactNativeRouterFlux.Actions.ManagerWaiting({text:'GENERAL MANAGER'});}},

_react2.default.createElement(_reactNative.Image,{
source:require('./assets/manager_signup_two.png')})))));







}}]);return SignUpTypeComponent;}(_react.Component);exports.default=SignUpTypeComponent;