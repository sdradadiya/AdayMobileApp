Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactApollo=require('react-apollo');
var _reactNative=require('react-native');








var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactNativeModal=require('react-native-modal');var _reactNativeModal2=_interopRequireDefault(_reactNativeModal);
var _TimeOffQueries=require('./TimeOffQueries');

var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var uuidv4=require('uuid/v4');var

TimeOffRequestsDetails=function(_Component){_inherits(TimeOffRequestsDetails,_Component);
function TimeOffRequestsDetails(props){_classCallCheck(this,TimeOffRequestsDetails);var _this=_possibleConstructorReturn(this,(TimeOffRequestsDetails.__proto__||Object.getPrototypeOf(TimeOffRequestsDetails)).call(this,
props));
_this.state={
detailsPopup:false,
confirmDeletePopup:false};

_this.detailsPopupChange=_this.detailsPopupChange.bind(_this);
_this.confirmDeletePopupChange=_this.confirmDeletePopupChange.bind(_this);
_this.deleteRequest=_this.deleteRequest.bind(_this);
_index.Tracker.trackScreenView("TimeOff Request Deatil");return _this;

}_createClass(TimeOffRequestsDetails,[{key:'detailsPopupChange',value:function detailsPopupChange()
{
this.setState({detailsPopup:!this.state.detailsPopup});
}},{key:'confirmDeletePopupChange',value:function confirmDeletePopupChange()
{
this.setState({confirmDeletePopup:!this.state.confirmDeletePopup});
}},{key:'deleteRequest',value:function deleteRequest()
{
var data={"data":{"clientMutationId":uuidv4(),
"id":this.props.details.id}};
this.props.mutate({variables:data,refetchQueries:[{query:_TimeOffQueries.userTimeOffRequestQuery,
variables:{requestorId:this.props.userId}}]}).
then(function(res){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Delete TimeOffRequest");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Delete TimeOffRequest");
});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
});
this.confirmDeletePopupChange();
this.detailsPopupChange();
}},{key:'generateMessage',value:function generateMessage(
details){
switch(details.decisionStatus){
case"PENDING":
return'Submitted: '+(0,_moment2.default)(details.submissionDate).format('MMMM Do');
case'APPROVED':
if(details.minutesPaid>0){
return'Approved - Paid Minutes: '+details.minutesPaid;
}else{
return'Approved - Unpaid';
}
case'DENIED':
return'Denied';
default:
return'Past';}

}},{key:'render',value:function render()
{
var details=this.props.details;
var oneDate=null;
var timeRange="(12:00 AM - 11:59pm)";
if(details.startDate==details.endDate){
oneDate=(0,_moment2.default)(details.endDate).format('MMMM Do, YYYY');
}else{
oneDate=(0,_moment2.default)(details.startDate).format('MMMM Do')+" to "+(0,_moment2.default)(details.endDate).format('MMMM Do, YYYY');
}
var submissionDay=details.submissionDate?(0,_moment2.default)(details.submissionDate).format('MMMM Do'):"N/A";
return(
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.preferenceContainer,onPress:this.detailsPopupChange},
_react2.default.createElement(_reactNative.View,{style:styles.preferenceTopContainer},
_react2.default.createElement(_reactNative.View,{style:{marginRight:20}},
_react2.default.createElement(_reactNative.Image,{
style:{width:40,height:40},
source:details.requestType=='sick'?
require('../PreferencesComponent/assets/Travel Suitcase by Capitalists.png'):
require('../PreferencesComponent/assets/Travel Suitcase by Capitalists.png')})),



_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceName},'Time Off Request'),


_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},
oneDate))),




_react2.default.createElement(_reactNative.Text,{style:styles.supplementalText},
this.generateMessage(details)),


_react2.default.createElement(_reactNativeModal2.default,{isVisible:this.state.detailsPopup},
this.state.confirmDeletePopup?
_react2.default.createElement(_reactNative.View,{style:styles.miniModal},
_react2.default.createElement(_reactNative.Text,{style:styles.detailText},'Are you sure?'),


_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:this.deleteRequest,style:styles.deleteButton},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Confirm')),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:this.confirmDeletePopupChange,style:styles.closeButton},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Cancel'))):



_react2.default.createElement(_reactNative.View,{style:styles.detailsContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.headerText},'Request Details'),


_react2.default.createElement(_reactNative.Text,{style:styles.detailText,numberOfLines:7},
_react2.default.createElement(_reactNative.Text,{style:{fontWeight:'bold'}},'Time Range: '),
oneDate,' ',timeRange,' ',"\n",
_react2.default.createElement(_reactNative.Text,{style:{fontWeight:'bold'}},'Submitted: '),
submissionDay,' ',"\n",
_react2.default.createElement(_reactNative.Text,{style:{fontWeight:'bold'}},'Paid Minutes: '),
details.minutesPaid,' ',"\n",
_react2.default.createElement(_reactNative.Text,{style:{fontWeight:'bold'}},'Status: '),
details.decisionStatus,' ',"\n",
_react2.default.createElement(_reactNative.Text,{style:{fontWeight:'bold'}},'Request Type: '),
details.requestType,' ',"\n",
_react2.default.createElement(_reactNative.Text,{style:{fontWeight:'bold'}},'Pay Date: '),
details.payDate?details.payDate:"N/A",' ',"\n",
_react2.default.createElement(_reactNative.Text,{style:{fontWeight:'bold'}},'Notes: ')),

_react2.default.createElement(_reactNative.View,{style:styles.notesContainer},
_react2.default.createElement(_reactNative.ScrollView,null,
_react2.default.createElement(_reactNative.Text,{style:styles.detailText},
details.notes?details.notes:""))),



(0,_moment2.default)(details.startDate).isBefore((0,_moment2.default)().format())?
_react2.default.createElement(_reactNative.Text,null,' Time off request has past. '):
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:this.confirmDeletePopupChange,style:styles.deleteButton},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Delete Request')),


_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:this.detailsPopupChange,style:styles.closeButton},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Back'))))));






}}]);return TimeOffRequestsDetails;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
detailsContainer:_extends({
flex:1,
paddingTop:25,
paddingHorizontal:5,
alignItems:'center',
backgroundColor:'#F7F7F7'},
_reactNative.Platform.select({
ios:{
marginTop:64},

android:{
marginTop:54}}),{


borderRadius:12,
marginBottom:45}),

miniModal:{
flex:1,
paddingTop:30,
alignItems:'center',
backgroundColor:'#F7F7F7',
marginTop:'55%',
marginHorizontal:'5%',
borderRadius:12,
marginBottom:'50%'},

notesContainer:{
flex:1,
alignItems:'flex-start',
marginLeft:10,
marginBottom:9},

preferenceContainer:{
width:"96%",
marginBottom:10,
justifyContent:'space-between',
paddingHorizontal:0,
paddingVertical:5,
borderRadius:10,
elevation:2,
backgroundColor:'white',
shadowRadius:2,
shadowColor:'#999',
shadowOffset:{
width:1,
height:2},

shadowOpacity:0.5},

preferenceTopContainer:{
flexDirection:'row',
borderBottomWidth:1,
paddingBottom:10,
paddingLeft:15,
borderBottomColor:'#C9C9C9'},

headerText:{
fontSize:24,
paddingHorizontal:20,
color:'#0022A1',
textAlign:'center'},

detailText:{
fontSize:18,
lineHeight:30,
paddingHorizontal:20,
paddingVertical:4,
color:'#000000',
textAlign:'justify'},

preferenceName:{
fontSize:16,
color:'#0022A1'},

preferenceDescription:{
fontSize:12,
color:'#4A4A4A'},

supplementalText:{
fontSize:12,
marginLeft:15,
color:'#4A4A4A'},

closeButton:{
marginTop:10,
padding:7,
height:40,
width:200,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#0022A1',
alignItems:'center',
marginBottom:25},

deleteButton:{
marginTop:15,
padding:7,
height:40,
width:200,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#d80202',
alignItems:'center'},

buttonText:{
color:'white',
fontSize:16,
fontWeight:'bold'}});exports.default=



(0,_reactApollo.graphql)(_TimeOffQueries.deleteTimeOffRequestMutation)(TimeOffRequestsDetails);