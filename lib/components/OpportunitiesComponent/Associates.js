Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');









var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactNativeRouterFlux=require('react-native-router-flux');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var









Associates=function(_Component){_inherits(Associates,_Component);

function Associates(props){_classCallCheck(this,Associates);var _this=_possibleConstructorReturn(this,(Associates.__proto__||Object.getPrototypeOf(Associates)).call(this,
props));
_this.state={
isRegisteredUser:true,
isApplied:false};return _this;

}_createClass(Associates,[{key:'onFirstButtonPress',value:function onFirstButtonPress()

{
if(this.state.isRegisteredUser){
this.setState({
isApplied:true});

return;
}
_reactNativeRouterFlux.Actions.SignUp({});
}},{key:'onSecondButtonPress',value:function onSecondButtonPress()

{

}},{key:'getAppliedView',value:function getAppliedView()

{
return(
_react2.default.createElement(_reactNative.View,{style:styles.waitingStyle},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:12,color:'white'}},'APPLIED')));


}},{key:'render',value:function render()

{var _this2=this;
var firstButtonText="SIGN UP TO APPLY";
var secondButtonText="I ALREADY HAVE AN ACCOUNT";

if(this.state.isRegisteredUser&&!this.state.isApplied){
firstButtonText="APPLY";
secondButtonText="EDIT PROFILE";
}

if(this.state.isRegisteredUser&&this.state.isApplied){
firstButtonText="YOU'VE ALREADY APPLIED";
secondButtonText="EDIT PROFILE";
}

return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,backgroundColor:'white'}},
_react2.default.createElement(_reactNative.View,{style:styles.header},
_react2.default.createElement(_reactNative.View,{style:{position:'absolute',top:-64}},
_react2.default.createElement(_reactNative.Image,{
style:{height:210},
source:require('./../assets/temp/building.png')}))),



_react2.default.createElement(_reactNative.View,{style:styles.body},
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.Opportunities({});},style:styles.shadowStyle},
_react2.default.createElement(_reactNative.Image,{
style:[{height:70,width:70,resizeMode:'contain',position:'absolute',top:-25}],
source:require('./../assets/logos/logo1.png')}))),



_react2.default.createElement(_reactNative.View,{style:{marginLeft:10,paddingTop:10}},
_react2.default.createElement(_reactNative.Text,null,'Chao Center'),
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},'1585 Massachusetts Ave, Cambridge 0 mi away'))),


_react2.default.createElement(_reactNative.View,{style:{marginTop:10}},
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',justifyContent:'space-between'}},
_react2.default.createElement(_reactNative.Text,null,'Cashier, Part-Time'),
this.state.isApplied&&this.getAppliedView()),

_react2.default.createElement(_reactNative.Text,{style:{marginTop:10,fontSize:12,color:'#a9a9a9'}},'We have an opening for a part-time CASHIER position. Location: Harvard Law School')),

_react2.default.createElement(_reactNative.View,{style:{marginTop:10}},
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},'Schedule: P/T Schedule, more details upon interview.'),
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},'requirement: No experience required.')),

_react2.default.createElement(_reactNative.View,{style:{marginTop:10}},
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},'If you have a positive attitude and a love for learning, you may be interested in joining our team.')),

_react2.default.createElement(_reactNative.View,{style:{marginTop:10}},
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},'Summary: Performs cashiering duties, including making cash transactions, verifying cash drawer, giving change, counting cash receipts and completing cash reports. may also perform general food service work. maintains sanitation standards in the preparation, service and dining room facilities')),





_react2.default.createElement(_reactNative.View,{style:{justifyContent:"center",alignItems:"center",marginVertical:20}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this2.onFirstButtonPress();},
disabled:this.state.isApplied,
containerStyle:styles.saveButton,
style:{fontSize:14,color:'white'}},
firstButtonText)),


_react2.default.createElement(_reactNative.View,{style:{justifyContent:"center",alignItems:"center"}},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this2.onSecondButtonPress();}},
_react2.default.createElement(_reactNative.Text,{style:{color:'blue',fontSize:12}},secondButtonText))))));





}}]);return Associates;}(_react.Component);exports.default=Associates;


var styles=_reactNative.StyleSheet.create({
body:{
paddingHorizontal:15,
flex:1,
marginTop:150},

shadowStyle:{
height:45,
width:70,
shadowColor:"#000000",
shadowOpacity:0.8,
shadowRadius:2,
shadowOffset:{
height:1,
width:1}},


textStyle:{
fontSize:12,
color:'#a9a9a9'},

saveButton:{
padding:7,
borderRadius:2,
borderColor:'#ddd',
borderBottomWidth:0,
shadowColor:'#000',
backgroundColor:'#0022A1',
shadowOffset:{
width:0,
height:2},

shadowOpacity:0.8,
shadowRadius:2,
elevation:1,
marginLeft:5,
marginRight:5,
marginTop:10,
height:35,
width:200},

waitingStyle:{
paddingHorizontal:10,
paddingVertical:1,
backgroundColor:'red',
borderRadius:20,
marginLeft:50,
width:70}});