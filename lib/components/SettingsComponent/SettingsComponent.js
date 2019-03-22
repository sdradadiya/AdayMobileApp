Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');







var _PrivacyPolicy=require('../../pages/PrivacyPolicy');var _PrivacyPolicy2=_interopRequireDefault(_PrivacyPolicy);
var _reactNativeRouterFlux=require('react-native-router-flux');
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




SettingsComponent=function(_Component){_inherits(SettingsComponent,_Component);
function SettingsComponent(props){_classCallCheck(this,SettingsComponent);var _this=_possibleConstructorReturn(this,(SettingsComponent.__proto__||Object.getPrototypeOf(SettingsComponent)).call(this,
props));_this.



logout=function(){
_this.props.actions.clearUserData();

_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"LogOut from APP");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","LogOut from APP");
});
_reactNative.AsyncStorage.setItem('email',"",function(){
_reactNative.AsyncStorage.setItem('password',"",function(){
_reactNativeRouterFlux.Actions.reset("home");
});
});
};_index.Tracker.trackScreenView("Setting");return _this;}_createClass(SettingsComponent,[{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.AlertSettings({userId:_this2.props.userId});},style:styles.settingRowContainer},
_react2.default.createElement(_reactNative.View,{style:styles.settingNameContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:require('./../assets/icons/alert.png')}),
_react2.default.createElement(_reactNative.Text,{style:styles.settingName},'Alerts')),

_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./../assets/forward-arrow.png')})),


_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.changePassword({userId:_this2.props.userId});},style:styles.settingRowContainer},
_react2.default.createElement(_reactNative.View,{style:styles.settingNameContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:require('./../assets/login_key.png')}),
_react2.default.createElement(_reactNative.Text,{style:styles.settingName},'Change Password')),

_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./../assets/forward-arrow.png')})),


_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.TermsOfService({});},style:styles.settingRowContainer},
_react2.default.createElement(_reactNative.View,{style:styles.settingNameContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:require('./../assets/termsOfService.png')}),
_react2.default.createElement(_reactNative.Text,{style:styles.settingName},'Terms of Service')),

_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./../assets/forward-arrow.png')})),


_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.PrivacyPolicy({});},style:styles.settingRowContainer},
_react2.default.createElement(_reactNative.View,{style:styles.settingNameContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:require('./../assets/privacyPolicy.png')}),
_react2.default.createElement(_reactNative.Text,{style:styles.settingName},'Privacy Policy')),

_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./../assets/forward-arrow.png')})),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this2.logout();},style:styles.settingRowContainer},
_react2.default.createElement(_reactNative.View,{style:styles.settingNameContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},source:require('./../assets/logOut.png')}),
_react2.default.createElement(_reactNative.Text,{style:styles.settingName},'Log Out')),

_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./../assets/forward-arrow.png')}))));




}}]);return SettingsComponent;}(_react.Component);exports.default=SettingsComponent;


var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
backgroundColor:'white'},

settingRowContainer:{
flexDirection:'row',
justifyContent:'space-between',
borderBottomWidth:1,
borderBottomColor:'#F7F7F7',
paddingHorizontal:20,
paddingVertical:10},

settingNameContainer:{
flexDirection:'row',
alignItems:'center'},

settingName:{
fontSize:17,
fontFamily:"Lato-Regular",
paddingHorizontal:20,
color:'#4A4A4A'}});