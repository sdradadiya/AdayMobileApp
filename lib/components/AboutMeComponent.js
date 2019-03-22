Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation UpdateUserInfo($id: Uuid!, $firstName: String!, $lastName: String!, $aboutMeText: String!) {\n     updateUserById(input: {id: $id, userPatch: { firstName: $firstName, lastName: $lastName, aboutMeText: $aboutMeText}}) {\n\t    user{\n\t     \tid\n            firstName\n            lastName\n        \taboutMeText\n\t    }\n  \t }\n  }'],['\n  mutation UpdateUserInfo($id: Uuid!, $firstName: String!, $lastName: String!, $aboutMeText: String!) {\n     updateUserById(input: {id: $id, userPatch: { firstName: $firstName, lastName: $lastName, aboutMeText: $aboutMeText}}) {\n\t    user{\n\t     \tid\n            firstName\n            lastName\n        \taboutMeText\n\t    }\n  \t }\n  }']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _nativeBase=require('native-base');
var _reactNative=require('react-native');














var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactApollo=require('react-apollo');

var _v=require('uuid/v1');var _v2=_interopRequireDefault(_v);
var _reactNativeKeyboardSpacer=require('react-native-keyboard-spacer');var _reactNativeKeyboardSpacer2=_interopRequireDefault(_reactNativeKeyboardSpacer);
var _index=require('../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

AboutMe=function(_Component){_inherits(AboutMe,_Component);

function AboutMe(props){_classCallCheck(this,AboutMe);var _this=_possibleConstructorReturn(this,(AboutMe.__proto__||Object.getPrototypeOf(AboutMe)).call(this,
props));
_this.state={
firstName:"",
lastName:"",
aboutMeText:"",
validationError:false};

_this.onSubmitPress=_this.onSubmitPress.bind(_this);
_index.Tracker.trackScreenView("About Me");return _this;

}_createClass(AboutMe,[{key:'componentWillMount',value:function componentWillMount()

{
this.setState(_extends({},this.state,this.props.aboutMe));
}},{key:'onSubmitPress',value:function onSubmitPress()

{var _this2=this;var _state=
this.state,firstName=_state.firstName,lastName=_state.lastName,aboutMeText=_state.aboutMeText,userEmail=_state.userEmail,avatarUrl=_state.avatarUrl;

if(!firstName||!lastName||!aboutMeText){
this.setState({validationError:true});
return;
}
var userInfo={
id:this.props.store.myProfile.id,
firstName:this.state.firstName,
lastName:this.state.lastName,
aboutMeText:this.state.aboutMeText,
userEmail:this.state.userEmail.toLowerCase(),
avatarUrl:this.state.avatarUrl};


this.props.updateUserInfo({variables:userInfo}).
then(function(response){
console.log('done');
_this2.props.actions.saveAboutMeData(userInfo);
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update User Info");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Update User Info");
});
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
console.log(err);
console.log(id);
});
}},{key:'render',value:function render()

{var _this3=this;
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.ScrollView,null,

_react2.default.createElement(_reactNative.View,{style:{marginTop:30}},
_react2.default.createElement(_reactNative.Text,{style:{color:'#666666',marginTop:12}},'First Name'),
_react2.default.createElement(_reactNative.TextInput,{
style:styles.textInput,
onChangeText:function onChangeText(firstName){return _this3.setState({firstName:firstName});},
value:this.state.firstName}),

_react2.default.createElement(_reactNative.Text,{style:{color:'#666666',marginTop:12}},'Last Name'),
_react2.default.createElement(_reactNative.TextInput,{
style:styles.textInput,
onChangeText:function onChangeText(lastName){return _this3.setState({lastName:lastName});},
value:this.state.lastName}),

_react2.default.createElement(_reactNative.Text,{style:{color:'#666666',marginTop:12}},'About Me (170 Character Limit)'),
_react2.default.createElement(_reactNative.TextInput,{
style:styles.textInput,
onChangeText:function onChangeText(aboutMeText){return _this3.setState({aboutMeText:aboutMeText});},
value:this.state.aboutMeText}),

this.state.validationError&&
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:{color:'red'}},'Please input all fields'))),



_react2.default.createElement(_reactNative.View,{style:{alignItems:'center',marginTop:30}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this3.onSubmitPress();},
containerStyle:styles.saveButton,
style:{color:'white',fontSize:16}},'SAVE')),



_react2.default.createElement(_reactNativeKeyboardSpacer2.default,null))));




}}]);return AboutMe;}(_react.Component);


var styles=_reactNative.StyleSheet.create({

container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:20},

android:{
paddingTop:12}}),{


paddingHorizontal:25}),

multiline:{
borderWidth:1,
borderColor:'#0f0f0f',
flex:1,
fontSize:13,
height:50,
padding:4,
marginBottom:4},

textInput:{
height:40,
borderColor:'gray',
borderWidth:1,
borderRadius:4,
marginTop:10},

saveButton:{
padding:7,
height:35,
width:170,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#0022A1'}});



var updateUserInfo=(0,_reactApollo.gql)(_templateObject);exports.default=











AboutMeComponent=(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(updateUserInfo,{
name:'updateUserInfo'}))(

AboutMe);