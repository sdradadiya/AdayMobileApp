Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation updateUserById($id: Uuid!, $homeAddress: Json, $zipCode: String) {\n    updateUserById(input: {id: $id, userPatch: {homeAddress: $homeAddress, zipCode: $zipCode}}) {\n\t    user{\n\t      homeAddress\n\t      zipCode\n\t    }\n  \t}\n  }'],['\n  mutation updateUserById($id: Uuid!, $homeAddress: Json, $zipCode: String) {\n    updateUserById(input: {id: $id, userPatch: {homeAddress: $homeAddress, zipCode: $zipCode}}) {\n\t    user{\n\t      homeAddress\n\t      zipCode\n\t    }\n  \t}\n  }']);


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');














var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactApollo=require('react-apollo');

var _SpinnerComponent=require('./SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _nativeBase=require('native-base');

var _reactNativeKeyboardSpacer=require('react-native-keyboard-spacer');var _reactNativeKeyboardSpacer2=_interopRequireDefault(_reactNativeKeyboardSpacer);
var _index=require('../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

HomeAddress=function(_Component){_inherits(HomeAddress,_Component);
function HomeAddress(props){_classCallCheck(this,HomeAddress);var _this=_possibleConstructorReturn(this,(HomeAddress.__proto__||Object.getPrototypeOf(HomeAddress)).call(this,
props));
_this.state={
homeAddress1:'',
homeAddress2:'',
validationStatus:false,
address:'',
zipCode:'',
isLoading:false};

_this.validation=_this.validation.bind(_this);
_this.saveHomeAddress=_this.saveHomeAddress.bind(_this);
_index.Tracker.trackScreenView("Home Address");return _this;

}_createClass(HomeAddress,[{key:'componentDidMount',value:function componentDidMount()

{
var homeAddress=this.props.homeAddress;
this.setState({
homeAddress1:homeAddress.homeAddress1||'',
homeAddress2:homeAddress.homeAddress2||'',
city:homeAddress.city||'',
state:homeAddress.state||'',
zipCode:homeAddress.zipCode||''});

}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
if(Object.keys(nextProps.state.myProfile.homeAddress).length){
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}
}},{key:'validation',value:function validation()

{
if(this.state.homeAddress1||this.state.homeAddress2){
this.setState({validationStatus:false});
this.saveHomeAddress();
}else{
this.setState({validationStatus:true});
}
}},{key:'saveHomeAddress',value:function saveHomeAddress()

{var _this2=this;
var homeAddress1=this.state.homeAddress1?this.state.homeAddress1:'';
var homeAddress2=this.state.homeAddress2?this.state.homeAddress2:'';
var city=this.state.city;
var state=this.state.state;
var zipCode=this.state.zipCode;
var homeAddress={
homeAddress1:homeAddress1,
homeAddress2:homeAddress2,
city:city,
state:state,
zipCode:zipCode};


var fullAddress={
"home_address":[
{"address_line1":homeAddress1,
"address_line2":homeAddress2,
"state":state,
"city":city}]};


this.setState({isLoading:true});
this.props.updateUserHomeAddress({variables:{id:this.props.state.myProfile.id,homeAddress:JSON.stringify(fullAddress),
zipCode:zipCode}}).
then(function(response){
_this2.setState({isLoading:false});
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update User Home Address");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","LogOut from APP");
});

_this2.props.actions.saveHomeAddress(homeAddress);
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
console.log(err);
});
}},{key:'render',value:function render()

{var _this3=this;var
isLoading=this.state.isLoading;

if(!!isLoading){
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)));


}


return(
_react2.default.createElement(_reactNative.ScrollView,{style:styles.container},
!isLoading&&
_react2.default.createElement(_reactNative.View,null,
this.state.validationStatus&&
_react2.default.createElement(_reactNative.Text,{style:{marginTop:20,color:'red',alignSelf:'center'}},'Please fill address field(s).'),



_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'Address Line 1'),
_react2.default.createElement(_reactNative.View,{style:styles.inputField},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.homeAddress1,
onChangeText:function onChangeText(text){return _this3.setState({homeAddress1:text});},
returnKeyType:'next'})),


_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'Address Line 2'),
_react2.default.createElement(_reactNative.View,{style:styles.inputField},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.homeAddress2,
onChangeText:function onChangeText(text){return _this3.setState({homeAddress2:text});},
returnKeyType:'next'})),



_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'City'),
_react2.default.createElement(_reactNative.View,{style:[styles.inputField,{marginTop:10}]},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.city,
onChangeText:function onChangeText(text){return _this3.setState({city:text});},
returnKeyType:'next'})),


_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'State'),
_react2.default.createElement(_reactNative.View,{style:[styles.inputField,{marginTop:10}]},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.state,
onChangeText:function onChangeText(text){return _this3.setState({state:text});},
returnKeyType:'next'})),


_react2.default.createElement(_reactNative.Text,{style:styles.inputFieldLabel},'ZipCode'),
_react2.default.createElement(_reactNative.View,{style:[styles.inputField,{marginTop:10}]},
_react2.default.createElement(_nativeBase.Input,{
defaultValue:this.state.zipCode,
onChangeText:function onChangeText(text){return _this3.setState({zipCode:text});},
returnKeyType:'next'}))),




!isLoading&&
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this3.validation();},style:styles.saveButtonContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonName},'SAVE')),


_react2.default.createElement(_reactNativeKeyboardSpacer2.default,null)));


}}]);return HomeAddress;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
container:{










flex:1,
flexDirection:'column',
backgroundColor:"#FFFFFF"},

contentContainer:{
marginTop:30},

contentContainerError:{
marginTop:10},

inputFieldContainer:{
borderWidth:1,
marginTop:10,
marginLeft:10,
marginRight:10,
paddingLeft:20,
paddingRight:20,
paddingTop:5,
paddingBottom:5,
height:40,
justifyContent:'center'},

textStyle:{
color:"rgba(74,74,74,0.5)",
fontSize:20,
height:30,

paddingVertical:0,
textDecorationLine:"none"},

fullHomeAddressContainer:{
marginTop:30,
backgroundColor:'rgba(216,216,216,0.2)',
paddingHorizontal:20,
paddingVertical:20},

inputField:{
borderColor:'rgba(74,74,74,0.5)',
borderWidth:1,
height:40,
marginTop:10},

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
textAlign:'center'}});



var updateUserHomeAddress=(0,_reactApollo.gql)(_templateObject);









var HomeAddressComponent=(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(updateUserHomeAddress,{
name:'updateUserHomeAddress'}))(

HomeAddress);exports.default=

HomeAddressComponent;