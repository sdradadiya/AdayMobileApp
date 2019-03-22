Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n    mutation createUserLanguage($id: Uuid!, $userId: Uuid!, $languageName: String!) {\n        createUserLanguage(input: {userLanguage: {id: $id, userId: $userId, languageName: $languageName}}) {\n            userLanguage {\n                id\n                userId\n                languageName\n            }\n        }\n    }'],['\n    mutation createUserLanguage($id: Uuid!, $userId: Uuid!, $languageName: String!) {\n        createUserLanguage(input: {userLanguage: {id: $id, userId: $userId, languageName: $languageName}}) {\n            userLanguage {\n                id\n                userId\n                languageName\n            }\n        }\n    }']),_templateObject2=_taggedTemplateLiteral(['\n    mutation updateUserLanguageById($id: Uuid!, $userId: Uuid!, $languageName: String!) {\n        updateUserLanguageById(input: {id: $id, userLanguagePatch: {userId: $userId, languageName: $languageName}}) {\n            userLanguage {\n                id\n                userId\n                languageName\n            }\n        }\n    }'],['\n    mutation updateUserLanguageById($id: Uuid!, $userId: Uuid!, $languageName: String!) {\n        updateUserLanguageById(input: {id: $id, userLanguagePatch: {userId: $userId, languageName: $languageName}}) {\n            userLanguage {\n                id\n                userId\n                languageName\n            }\n        }\n    }']),_templateObject3=_taggedTemplateLiteral(['\n    mutation deleteUserLanguageById($id: Uuid!) {\n        deleteUserLanguageById(input: {id: $id}) {\n            userLanguage {\n               id\n               userId\n               languageName\n            }\n        }\n    }'],['\n    mutation deleteUserLanguageById($id: Uuid!) {\n        deleteUserLanguageById(input: {id: $id}) {\n            userLanguage {\n               id\n               userId\n               languageName\n            }\n        }\n    }']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _nativeBase=require('native-base');
var _reactNative=require('react-native');











var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactApollo=require('react-apollo');
var _v=require('uuid/v1');var _v2=_interopRequireDefault(_v);
var _SpinnerComponent=require('./SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _reactNativeKeyboardSpacer=require('react-native-keyboard-spacer');var _reactNativeKeyboardSpacer2=_interopRequireDefault(_reactNativeKeyboardSpacer);
var _index=require('../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Languages=function(_Component){_inherits(Languages,_Component);

function Languages(props){_classCallCheck(this,Languages);var _this=_possibleConstructorReturn(this,(Languages.__proto__||Object.getPrototypeOf(Languages)).call(this,
props));
_this.state={
id:"",
languageName:"",
validationError:false,
isLoading:false};

_this.onSaveButton=_this.onSaveButton.bind(_this);
_this.onDeleteButton=_this.onDeleteButton.bind(_this);
_index.Tracker.trackScreenView("Opportunities Filter");return _this;
}_createClass(Languages,[{key:'componentWillMount',value:function componentWillMount()

{
if(this.props.language){
this.setState(_extends({},this.props.language));
}
}},{key:'onSaveButton',value:function onSaveButton()

{
if(this.state.languageName===""){
this.setState({validationError:true});
return;
}

var action=this.state.id?"updateUserLanguageById":"createUserLanguage";
var id=this.state.id?this.state.id:(0,_v2.default)();
var language={
id:id,
languageName:this.state.languageName,
userId:this.props.store.myProfile.id};

this.setState({isLoading:true});
this.props[action]({variables:language}).
then(function(response){
console.log('done');
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update User Language");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Update User Language");
});
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
console.log(err);
console.log(id);
});
}},{key:'onDeleteButton',value:function onDeleteButton()

{
if(this.state.id){
this.setState({isLoading:true});
this.props.deleteUserLanguageById({variables:{id:this.state.id}}).
then(function(response){
console.log('done');
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Delete User Language");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Delete User Language");
});
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
console.log(err);
console.log(id);
});
}
}},{key:'render',value:function render()

{var _this2=this;
if(this.state.isLoading){
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)));


}
return(
_react2.default.createElement(_reactNative.ScrollView,{style:styles.container},
_react2.default.createElement(_reactNative.View,{style:{marginTop:30}},
_react2.default.createElement(_reactNative.Text,null,'Language'),
_react2.default.createElement(_reactNative.TextInput,{
style:styles.textInput,
onChangeText:function onChangeText(languageName){return _this2.setState({languageName:languageName});},
value:this.state.languageName})),


this.state.validationError&&
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:{color:'red'}},'Please input all fields')),


_react2.default.createElement(_reactNative.View,{style:{alignItems:'center',marginTop:30}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this2.onSaveButton();},
containerStyle:styles.saveButton,
style:{color:'white',fontSize:15}},'SAVE')),



_react2.default.createElement(_reactNative.View,{style:{alignItems:'center',marginTop:10}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this2.onDeleteButton();},
containerStyle:styles.deleteButton,
style:{color:'white',fontSize:15}},'DELETE LANGUAGE')),



_react2.default.createElement(_reactNativeKeyboardSpacer2.default,null)));


}}]);return Languages;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
container:{










flex:1,
flexDirection:'column',
backgroundColor:"#FFFFFF"},

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
backgroundColor:'#0022A1'},

deleteButton:{
padding:7,
height:35,
width:170,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#E33821'}});




var createUserLanguage=(0,_reactApollo.gql)(_templateObject);










var updateUserLanguageById=(0,_reactApollo.gql)(_templateObject2);










var deleteUserLanguageById=(0,_reactApollo.gql)(_templateObject3);











var LanguagesComponent=(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(createUserLanguage,{
name:'createUserLanguage'}),

(0,_reactApollo.graphql)(updateUserLanguageById,{
name:'updateUserLanguageById'}),

(0,_reactApollo.graphql)(deleteUserLanguageById,{
name:'deleteUserLanguageById'}))(

Languages);exports.default=

LanguagesComponent;