Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _nativeBase=require('native-base');







var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');













var _reactNativeRouterFlux=require('react-native-router-flux');


var _reactNativeEasyGrid=require('react-native-easy-grid');




var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var







EnterRefFromContacts=function(_Component){_inherits(EnterRefFromContacts,_Component);

function EnterRefFromContacts(props){_classCallCheck(this,EnterRefFromContacts);var _this=_possibleConstructorReturn(this,(EnterRefFromContacts.__proto__||Object.getPrototypeOf(EnterRefFromContacts)).call(this,
props));
_this.state={
firstName:"",
lastName:"",
phoneNumber:"",
error:""};

_this.saveContacts=_this.saveContacts.bind(_this);
_index.Tracker.trackScreenView("Enter Reference From Contacts");return _this;

}_createClass(EnterRefFromContacts,[{key:'componentDidMount',value:function componentDidMount()

{
_reactNativeRouterFlux.Actions.BrowseContacts({
saveContacts:this.saveContacts});

}},{key:'saveContacts',value:function saveContacts(

contacts){
var references=[];
for(var i=0;i<contacts.length;i++){
var contact=contacts[i];
references.push({
id:contact.contactID,
firstName:contact.name,
phoneNumber:contact.phoneNumber[0].number});

}
this.props.actions.saveReferenceData(references);
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}},{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.View,{style:styles.container}));



}}]);return EnterRefFromContacts;}(_react.Component);exports.default=EnterRefFromContacts;


var styles=_reactNative.StyleSheet.create({

container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:64},

android:{
paddingTop:54}}),{


flexDirection:'column',
paddingLeft:5,
paddingRight:5})});