Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactApollo=require('react-apollo');
var _reactNative=require('react-native');








var _reactNativeRouterFlux=require('react-native-router-flux');
var _TimeOffRequestDetails=require('./TimeOffRequestDetails');var _TimeOffRequestDetails2=_interopRequireDefault(_TimeOffRequestDetails);
var _TimeOffQueries=require('./TimeOffQueries');
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

TimeOffComponent=function(_Component){_inherits(TimeOffComponent,_Component);
function TimeOffComponent(props){_classCallCheck(this,TimeOffComponent);var _this=_possibleConstructorReturn(this,(TimeOffComponent.__proto__||Object.getPrototypeOf(TimeOffComponent)).call(this,
props));
_index.Tracker.trackScreenView("Time Off");return _this;

}_createClass(TimeOffComponent,[{key:'isEmpty',value:function isEmpty(












obj){
for(var x in obj){return false;}
return true;
}},{key:'render',value:function render()
{var _this2=this;
if(this.props.data.error){
console.log(this.props.data.error.message);
return _react2.default.createElement(_reactNative.Text,null,'Error! ',this.props.data.error.message);
}
if(this.props.data.loading){
return _react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.Text,null,' Loading... '));

}
var data=this.props.data.allTimeOffRequests.edges;
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,backgroundColor:'#F7F7F7'}},
_react2.default.createElement(_reactNative.ScrollView,null,
_react2.default.createElement(_reactNative.View,{style:styles.container},
this.isEmpty(data)&&
_react2.default.createElement(_reactNative.View,{style:{width:289,alignItems:'center',marginTop:'25%'}},
_react2.default.createElement(_reactNative.Image,{style:{width:186,height:186},
source:require('../assets/no_requests.png')}),
_react2.default.createElement(_reactNative.Text,{style:styles.emptyMessage},'You currently have no time off requests entered.'),
_react2.default.createElement(_reactNative.Text,{style:styles.emptyMessageInstruction},'Press the plus button on the top right to enter a time off request.')),




data.map(function(value,index){return(
_react2.default.createElement(_TimeOffRequestDetails2.default,{details:value.node,key:index,userId:_this2.props.userId}));})))));







}}]);return TimeOffComponent;}(_react.Component);TimeOffComponent.renderRightButton=function(props){return _react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.TimeOffRequest({userId:props.userId});}},_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',style:{width:30,height:30,marginRight:10},source:require('./../assets/profile-icons/plus-button.png')}));};


var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
marginTop:10,
paddingHorizontal:5,
paddingBottom:10,
alignItems:'center',
backgroundColor:'#F7F7F7'},


preferenceContainer:{
width:"96%",
marginTop:5,
justifyContent:'space-between',
paddingHorizontal:0,
paddingVertical:5,
borderRadius:10,
elevation:2,
backgroundColor:'white'},

preferenceTopContainer:{
flexDirection:'row',
borderBottomWidth:1,
paddingBottom:10,
paddingLeft:15,
borderBottomColor:'#C9C9C9'},

preferenceName:{
fontSize:16,
paddingHorizontal:20,
color:'#0022A1'},

preferenceDescription:{
fontSize:12,
paddingHorizontal:20,
color:'#4A4A4A'},

emptyMessage:{
marginTop:10,
opacity:0.6,
color:'#4A4A4A',
fontFamily:'Lato',
fontSize:16,
fontWeight:'bold',
lineHeight:19,
textAlign:'center'},

emptyMessageInstruction:{
marginTop:10,
opacity:0.6,
color:'#4A4A4A',
fontFamily:'Lato',
fontSize:16,
lineHeight:19,
textAlign:'center'}});exports.default=



(0,_reactApollo.graphql)(_TimeOffQueries.userTimeOffRequestQuery,{
options:function options(ownProps){
return{
variables:{
requestorId:ownProps.userId}};


}})(TimeOffComponent);