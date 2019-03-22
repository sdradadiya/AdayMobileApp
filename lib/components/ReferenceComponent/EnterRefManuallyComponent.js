Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation createUserReference($id: Uuid!, $userId: Uuid!, $firstName: String!, $lastName: String!, $referencePhoneNumber: String!, $referenceEmailAddress: String!, $relationship: String!) {\n    createUserReference(input: {userReference: { id: $id , userId: $userId, firstName: $firstName, lastName: $lastName, referencePhoneNumber: $referencePhoneNumber, referenceEmailAddress: $referenceEmailAddress, relationship: $relationship}}) {\n\t    userReference{\n\t      id\n\t      userId\n          firstName\n          lastName\n\t    }\n  \t}\n  }'],['\n  mutation createUserReference($id: Uuid!, $userId: Uuid!, $firstName: String!, $lastName: String!, $referencePhoneNumber: String!, $referenceEmailAddress: String!, $relationship: String!) {\n    createUserReference(input: {userReference: { id: $id , userId: $userId, firstName: $firstName, lastName: $lastName, referencePhoneNumber: $referencePhoneNumber, referenceEmailAddress: $referenceEmailAddress, relationship: $relationship}}) {\n\t    userReference{\n\t      id\n\t      userId\n          firstName\n          lastName\n\t    }\n  \t}\n  }']),_templateObject2=_taggedTemplateLiteral(['\n  mutation updateUserReferenceById($id: Uuid!, $userId: Uuid, $firstName: String, $lastName: String, $referencePhoneNumber: String, $referenceEmailAddress: String, $relationship: String) {\n    updateUserReferenceById(input: {id: $id, userReferencePatch: { id: $id , userId: $userId, firstName: $firstName, lastName: $lastName, referencePhoneNumber: $referencePhoneNumber, referenceEmailAddress: $referenceEmailAddress, relationship: $relationship}}) {\n\t    userReference{\n\t      id\n\t      userId\n          firstName\n          lastName\n\t    }\n  \t}\n  }'],['\n  mutation updateUserReferenceById($id: Uuid!, $userId: Uuid, $firstName: String, $lastName: String, $referencePhoneNumber: String, $referenceEmailAddress: String, $relationship: String) {\n    updateUserReferenceById(input: {id: $id, userReferencePatch: { id: $id , userId: $userId, firstName: $firstName, lastName: $lastName, referencePhoneNumber: $referencePhoneNumber, referenceEmailAddress: $referenceEmailAddress, relationship: $relationship}}) {\n\t    userReference{\n\t      id\n\t      userId\n          firstName\n          lastName\n\t    }\n  \t}\n  }']),_templateObject3=_taggedTemplateLiteral(['\n  mutation deleteUserReferenceById($id: Uuid!) {\n    deleteUserReferenceById(input: {id: $id}) {\n\t    userReference{\n\t      id\n\t      userId\n          firstName\n          lastName\n\t    }\n  \t}\n  }'],['\n  mutation deleteUserReferenceById($id: Uuid!) {\n    deleteUserReferenceById(input: {id: $id}) {\n\t    userReference{\n\t      id\n\t      userId\n          firstName\n          lastName\n\t    }\n  \t}\n  }']);

var _nativeBase=require('native-base');







var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');












var _reactNativeRouterFlux=require('react-native-router-flux');


var _reactApollo=require('react-apollo');













var _reactNativeEasyGrid=require('react-native-easy-grid');




var _v=require('uuid/v1');var _v2=_interopRequireDefault(_v);
var _reactNativeKeyboardSpacer=require('react-native-keyboard-spacer');var _reactNativeKeyboardSpacer2=_interopRequireDefault(_reactNativeKeyboardSpacer);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var







EnterRefManually=function(_Component){_inherits(EnterRefManually,_Component);

function EnterRefManually(props){_classCallCheck(this,EnterRefManually);var _this=_possibleConstructorReturn(this,(EnterRefManually.__proto__||Object.getPrototypeOf(EnterRefManually)).call(this,
props));
_this.state={
firstName:"",
lastName:"",
phoneNumber:"",
email:'',
relationship:'',
id:'',
error:""};

_this.onSavePressed=_this.onSavePressed.bind(_this);
_this.onDeletePressed=_this.onDeletePressed.bind(_this);
_index.Tracker.trackScreenView("Enter Reference Manually");return _this;

}_createClass(EnterRefManually,[{key:'componentWillMount',value:function componentWillMount()

{
var data=this.props.data;
if(data){
this.setState({
firstName:data.firstName,
lastName:data.lastName,
phoneNumber:data.referencePhoneNumber,
email:data.referenceEmailAddress,
relationship:data.relationship,
id:data.id});

}
}},{key:'onSavePressed',value:function onSavePressed()

{var _this2=this;
if(!this.state.firstName||!this.state.lastName||!this.state.phoneNumber||!this.state.email||!this.state.relationship){
this.setState({
error:"All Fields Above Are Required!"});

return;
}
var id=this.state.id;
var actionName='updateReferenceData';
var mutationName='updateUserReference';
if(!this.state.id){
id=(0,_v2.default)();
actionName='saveReferenceData';
mutationName='createUserReference';
}
var reference={
id:id,
firstName:this.state.firstName,
lastName:this.state.lastName,
referencePhoneNumber:this.state.phoneNumber,
referenceEmailAddress:this.state.email,
relationship:this.state.relationship,
userId:this.props.store.myProfile.id};

this.props[mutationName]({
variables:reference}).

then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update or Create Reference Data");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Update or Create Reference Data");
});

_this2.props.actions[actionName](reference);
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
});
}},{key:'onDeletePressed',value:function onDeletePressed()

{
if(this.state.id){
this.props.deleteUserReference({
variables:{
id:this.state.id}}).


then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Delete Reference Data");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Delete Reference Data");
});

_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
});
}
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}},{key:'render',value:function render()


{var _this3=this;
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNativeEasyGrid.Grid,{style:styles.contentContainer},
_react2.default.createElement(_reactNative.ScrollView,null,
_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'First Name'),
_react2.default.createElement(_reactNative.View,{style:[styles.inputField,{marginTop:10}]},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.firstName,
onChangeText:function onChangeText(text){return _this3.setState({firstName:text});},
returnKeyType:'next'})),


_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'Last Name'),
_react2.default.createElement(_reactNative.View,{style:[styles.inputField,{marginTop:10}]},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.lastName,
onChangeText:function onChangeText(text){return _this3.setState({lastName:text});},
returnKeyType:'next'})),


_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'Phone Number'),
_react2.default.createElement(_reactNative.View,{style:[styles.inputField,{marginTop:10}]},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.phoneNumber,
onChangeText:function onChangeText(text){return _this3.setState({phoneNumber:text});},
returnKeyType:'next'})),


_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'Email Address'),
_react2.default.createElement(_reactNative.View,{style:[styles.inputField,{marginTop:10}]},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.email,
onChangeText:function onChangeText(text){return _this3.setState({email:text});},
returnKeyType:'next'})),


_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'Relationship'),
_react2.default.createElement(_reactNative.View,{style:[styles.inputField,{marginTop:10}]},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.relationship,
onChangeText:function onChangeText(text){return _this3.setState({relationship:text});},
returnKeyType:'next'})),


_react2.default.createElement(_reactNative.Text,{style:styles.errorText},this.state.error),
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this3.onSavePressed();},style:styles.saveButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonName},'SAVE')),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this3.onDeletePressed();},style:styles.deleteButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonName},'DELETE REFERENCE')),

_react2.default.createElement(_reactNativeKeyboardSpacer2.default,null)))));




}}]);return EnterRefManually;}(_react.Component);


var styles=_reactNative.StyleSheet.create({

container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:64},

android:{
paddingTop:24}}),{


flexDirection:'column',
paddingLeft:5,
paddingRight:5}),

contentContainer:{
paddingHorizontal:20,
justifyContent:'center'},

inputField:{
borderColor:'rgba(74,74,74,0.5)',
borderWidth:1,
height:40},

inputFieldLabel:{
paddingTop:10,
color:'#666666',
fontFamily:'Roboto'},

saveButtonContainer:{
backgroundColor:'#0022A1',
padding:10,
width:width*0.6,
marginLeft:width*0.2-15,
marginTop:30},

deleteButtonContainer:{
backgroundColor:'#E33821',
padding:10,
width:width*0.6,
marginLeft:width*0.2-15,
marginVertical:10},

buttonName:{
color:'white',
fontWeight:'bold',
textAlign:'center'},

errorText:{
color:'red',
textAlign:'center',
fontWeight:'bold'}});



var createUserReference=(0,_reactApollo.gql)(_templateObject);










var updateUserReference=(0,_reactApollo.gql)(_templateObject2);










var deleteUserReference=(0,_reactApollo.gql)(_templateObject3);











var EnterRefManuallyComponent=(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(createUserReference,{
name:'createUserReference'}),

(0,_reactApollo.graphql)(updateUserReference,{
name:'updateUserReference'}),

(0,_reactApollo.graphql)(deleteUserReference,{
name:'deleteUserReference'}))(

EnterRefManually);exports.default=

EnterRefManuallyComponent;