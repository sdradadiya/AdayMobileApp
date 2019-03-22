Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation updateUserById($id: Uuid!, $userPhoneNumber: String, $userEmail: String, $userPhoneConfirmed: Boolean) {\n    updateUserById(input: {id: $id, userPatch: {userPhoneNumber: $userPhoneNumber, userEmail: $userEmail, userPhoneConfirmed: $userPhoneConfirmed}}) {\n\t    user{\n\t      id\n\t      userPhoneNumber,\n\t      userEmail,\n\t      userPhoneConfirmed\n\t    }\n  \t}\n  }'],['\n  mutation updateUserById($id: Uuid!, $userPhoneNumber: String, $userEmail: String, $userPhoneConfirmed: Boolean) {\n    updateUserById(input: {id: $id, userPatch: {userPhoneNumber: $userPhoneNumber, userEmail: $userEmail, userPhoneConfirmed: $userPhoneConfirmed}}) {\n\t    user{\n\t      id\n\t      userPhoneNumber,\n\t      userEmail,\n\t      userPhoneConfirmed\n\t    }\n  \t}\n  }']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _nativeBase=require('native-base');
var _reactNative=require('react-native');









var _reactApollo=require('react-apollo');

var _reactNativeRouterFlux=require('react-native-router-flux');

var _reactNativeEasyGrid=require('react-native-easy-grid');
var _SpinnerComponent=require('./SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _reactNativeKeyboardSpacer=require('react-native-keyboard-spacer');var _reactNativeKeyboardSpacer2=_interopRequireDefault(_reactNativeKeyboardSpacer);
var _index=require('../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

EditContactInfo=function(_Component){_inherits(EditContactInfo,_Component);
function EditContactInfo(props){_classCallCheck(this,EditContactInfo);var _this=_possibleConstructorReturn(this,(EditContactInfo.__proto__||Object.getPrototypeOf(EditContactInfo)).call(this,
props));
_this.state={
phoneNumber:"",
email:'',
error:"",
id:'',
originalPhoneNumber:""};

_this.onSavePressed=_this.onSavePressed.bind(_this);
_index.Tracker.trackScreenView("Edit Contact Info");return _this;

}_createClass(EditContactInfo,[{key:'componentDidMount',value:function componentDidMount()

{
this.setState({
phoneNumber:this.props.contactInfo.phoneNumber,
originalPhoneNumber:this.props.contactInfo.phoneNumber,
email:this.props.contactInfo.email,
id:this.props.id,
isLoading:false});

}},{key:'onSavePressed',value:function onSavePressed()

{var _this2=this;
if(!this.state.phoneNumber||!this.state.email){
this.setState({error:"All Fields are Required!"});
return;
}
var contactInfo={
phoneNumber:this.state.phoneNumber,
email:this.state.email};

this.setState({isLoading:true});
var phoneChanged=this.state.originalPhoneNumber!=this.state.phoneNumber;
var verified=this.props.contactInfo.verified&&!phoneChanged;
this.props.updateUserContactInfo({variables:{id:this.state.id,userPhoneNumber:this.state.phoneNumber,
userEmail:this.state.email.trim().toLowerCase(),userPhoneConfirmed:verified}}).
then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update User Contact Info");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Update User Contact Info");
});
_this2.props.actions.updateContactInfo(contactInfo);
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
_this2.setState({isLoading:false});
console.log(err);
});

}},{key:'render',value:function render()

{var _this3=this;var
isLoading=this.state.isLoading;
return(
_react2.default.createElement(_reactNative.ScrollView,{style:styles.container},
isLoading&&
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)),


!isLoading&&
_react2.default.createElement(_reactNativeEasyGrid.Grid,{style:styles.contentContainer},
_react2.default.createElement(_reactNative.ScrollView,null,
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


_react2.default.createElement(_reactNative.Text,{style:styles.errorText},this.state.error),
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this3.onSavePressed();},style:styles.saveButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonName},'SAVE')))),




_react2.default.createElement(_reactNativeKeyboardSpacer2.default,null)));


}}]);return EditContactInfo;}(_react.Component);


var styles=_reactNative.StyleSheet.create({

container:{












flex:1,
flexDirection:'column',
backgroundColor:"#FFFFFF"},

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

buttonName:{
color:'white',
fontWeight:'bold',
textAlign:'center'},

errorText:{
color:'red',
textAlign:'center',
fontWeight:'bold'}});



var updateUserContactInfo=(0,_reactApollo.gql)(_templateObject);











var EditContactInfoComponent=(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(updateUserContactInfo,{
name:'updateUserContactInfo'}))(

EditContactInfo);exports.default=


EditContactInfoComponent;