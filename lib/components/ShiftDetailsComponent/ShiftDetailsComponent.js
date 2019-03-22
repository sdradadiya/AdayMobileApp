Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation updateMarket($id: Uuid!, $workerResponse: ResponseStatus!, $employeeDateResponded: Datetime!, $isBooked: Boolean! ) {\n    updateMarketById(input: { id: $id , marketPatch: {workerResponse: $workerResponse, employeeDateResponded: $employeeDateResponded, isBooked: $isBooked }}) {\n\t    market{\n\t      id\n\t      workerResponse\n\t      shiftId\n\t    }\n  \t}\n  }'],['\n  mutation updateMarket($id: Uuid!, $workerResponse: ResponseStatus!, $employeeDateResponded: Datetime!, $isBooked: Boolean! ) {\n    updateMarketById(input: { id: $id , marketPatch: {workerResponse: $workerResponse, employeeDateResponded: $employeeDateResponded, isBooked: $isBooked }}) {\n\t    market{\n\t      id\n\t      workerResponse\n\t      shiftId\n\t    }\n  \t}\n  }']),_templateObject2=_taggedTemplateLiteral(['\n  mutation updateShift($id: Uuid!, $workersInvited: [Uuid], $workersAssigned: [Uuid] ) {\n    updateShiftById(input: { id: $id , shiftPatch: {workersInvited: $workersInvited, workersAssigned: $workersAssigned }}) {\n\t    shift{\n\t      id\n\t      workersAssigned\n\t    }\n  \t}\n  }'],['\n  mutation updateShift($id: Uuid!, $workersInvited: [Uuid], $workersAssigned: [Uuid] ) {\n    updateShiftById(input: { id: $id , shiftPatch: {workersInvited: $workersInvited, workersAssigned: $workersAssigned }}) {\n\t    shift{\n\t      id\n\t      workersAssigned\n\t    }\n  \t}\n  }']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _nativeBase=require('native-base');
var _reactNative=require('react-native');











var _reactNativeSimpleModal=require('react-native-simple-modal');var _reactNativeSimpleModal2=_interopRequireDefault(_reactNativeSimpleModal);
var _reactNativeCommunications=require('react-native-communications');var _reactNativeCommunications2=_interopRequireDefault(_reactNativeCommunications);



var _Header=require('./Header');var _Header2=_interopRequireDefault(_Header);
var _Details=require('./Details');var _Details2=_interopRequireDefault(_Details);
var _Rating=require('./Rating');var _Rating2=_interopRequireDefault(_Rating);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactApollo=require('react-apollo');

var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

ShiftDetailsComponent=function(_Component){_inherits(ShiftDetailsComponent,_Component);

function ShiftDetailsComponent(props){_classCallCheck(this,ShiftDetailsComponent);var _this=_possibleConstructorReturn(this,(ShiftDetailsComponent.__proto__||Object.getPrototypeOf(ShiftDetailsComponent)).call(this,
props));_this.































































makeCall=function(){
var shiftDetails=_this.props.state.schedules[_this.props.shiftId];
var phoneNumber=shiftDetails.workplaceByWorkplaceId.workplacePhoneNumber;
if(phoneNumber){
_reactNativeCommunications2.default.phonecall(phoneNumber,false);
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Phone call");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Phone call");
});

}else{
alert('Workplace Phone number not available');
}
};_this.state={showDetails:true,showMap:false,showModal:false,isLoading:false,error:null};_index.Tracker.trackScreenView("Shift Details");return _this;}_createClass(ShiftDetailsComponent,[{key:'componentDidMount',value:function componentDidMount(){var showDetails=this.props.buttonType==='INFO'?!(shiftDetails.type==='CLOCKED IN'||shiftDetails.type=='PAST SHIFT'):this.props.showDetails;var showMap=this.props.showMap;this.setState({showDetails:showDetails,showMap:showMap});}},{key:'showModal',value:function showModal(){var _this2=this;return _react2.default.createElement(_reactNativeSimpleModal2.default,{offset:200,open:this.state.showModal,overlayBackground:'rgba(0, 0, 0, 0.4)',modalDidOpen:function modalDidOpen(){return undefined;},modalDidClose:function modalDidClose(){return _this2.setState({showModal:false});},containerStyle:styles.modalContainer,modalStyle:styles.modalContentContainer},_react2.default.createElement(_reactNative.View,null,_react2.default.createElement(_reactNative.View,{style:styles.modalContent},_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',style:{width:140,height:140},source:require('../assets/profile-icons/contact-info.png')}),_react2.default.createElement(_reactNative.Text,{style:styles.modalText},'The workplace has requested you call to cancel this shift'),_react2.default.createElement(_reactNative.View,null,_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this2.makeCall();},style:styles.modalButtonContainer},_react2.default.createElement(_reactNative.Text,{style:styles.modalButtonName},'CALL NOW')))),_react2.default.createElement(_reactNative.View,{style:styles.modalFooterContainer},_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this2.setState({showModal:false});}},_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',style:{width:50,height:50,borderWidth:0},source:require('../assets/profile-icons/close-button-modal.png')})))));}},{key:'declineShift',value:function declineShift()

{var _this3=this;
this.setState({isLoading:true});
this.props.updateShiftUser({variables:{id:this.props.marketId,workerResponse:'NONE',isPending:false,employeeDateResponded:(0,_moment2.default)().format(),isBooked:false}}).
then(function(){
var worker=_this3.props.worker;
var invited=_this3.props.workersInvited?
_this3.props.workersInvited.filter(function(x){return x!==worker;}):
null;
var assigned=_this3.props.workersAssigned.filter(function(x){return x!==worker;});
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Decline Shift");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Decline Shift");
});

_reactNativeRouterFlux.Actions.pop();






}).catch(function(err){
_this3.setState({isLoading:false,error:'Error Occurred, Check your internet connection and refresh shifts by clicking on logo at the top of the screen.'});
_reactNativeRouterFlux.Actions.pop();
});
}},{key:'acceptShift',value:function acceptShift()
{var _this4=this;
this.setState({isLoading:true,showModal:false});
var shiftData={};

if(this.state.isFromPhoneTree==true){
shiftData={id:this.props.marketId,workerResponse:'YES',employeeDateResponded:(0,_moment2.default)().format(),isBooked:false};
}else{
shiftData={id:this.props.marketId,workerResponse:'YES',isPending:true,employeeDateResponded:(0,_moment2.default)().format(),isBooked:false};
}

this.props.updateShiftUser({variables:shiftData}).
then(function(){
var worker=_this4.props.worker;
var invited=_this4.props.workersInvited?
_this4.props.workersInvited.filter(function(x){return x!==worker;}):
null;

var newAssigned=[];
_this4.props.workersAssigned.map(function(user){
newAssigned.push(user);
});
newAssigned.push(worker);
if(_this4.props.isFromPhoneTree==true){
_this4.props.updateShift({variables:{id:_this4.props.shiftId,workersInvited:invited,workersAssigned:newAssigned}}).
then(function(){
_this4.setState({isLoading:false});
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update Shift");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Update Shift");
});

_reactNativeRouterFlux.Actions.pop();
}).
catch(function(err){
_reactNative.Alert.alert('Aday','Your Request Couldn\'t Be Completed');
});
}else{
_reactNativeRouterFlux.Actions.pop();
}
}).catch(function(err){
_reactNative.Alert.alert('Your Bid Was Not Placed','Shift has been filled or deleted. Refresh shifts by clicking on logo at the top of the screen.');
_this4.setState({isLoading:false});
_reactNativeRouterFlux.Actions.pop();
});
}},{key:'render',value:function render()
{var _this5=this;var _state=
this.state,showDetails=_state.showDetails,showMap=_state.showMap;
var shiftDetails=this.props.state.schedules[this.props.shiftId];
if(this.state.error)alert(this.state.error);

return(
_react2.default.createElement(_reactNative.View,{style:{flex:1}},
this.showModal(),
_react2.default.createElement(_reactNative.ScrollView,{style:styles.container},
!showMap&&
_react2.default.createElement(_Header2.default,{
positionName:this.props.positionName,
brandName:this.props.brandName,
workplaceName:this.props.workplaceName,
workplaceImageUrl:shiftDetails.workplaceByWorkplaceId.workplaceImageUrl}),


!showMap&&
_react2.default.createElement(_reactNative.View,{style:{flex:1}},
showDetails&&_react2.default.createElement(_Details2.default,{shiftDetails:shiftDetails,marketId:this.props.marketId,worker:this.props.worker,workersInvited:this.props.workersInvited,
clockOutDate:this.props.clockOutDate,
clockInDate:this.props.clockInDate,
locationCoor:this.props.locationCoor,
address:this.props.addressJson,
arrayShift:this.props.arrayShift,
zipCode:this.props.zipCode,
payment:this.props.payment,
workersAssigned:this.props.workersAssigned,shiftId:this.props.shiftId,status:this.props.status,
openModal:function openModal(){return _this5.setState({showModal:true});},
isLoading:this.state.isLoading,
declineShift:function declineShift(){return _this5.declineShift();},
acceptShift:function acceptShift(){return _this5.acceptShift();}}),

!showDetails&&_react2.default.createElement(_Rating2.default,{actions:this.props.action,shiftId:this.props.shiftId,shiftDetails:shiftDetails,marketId:this.props.marketId,
worker:this.props.worker,workersInvited:this.props.workersInvited,workersAssigned:this.props.workersAssigned})))));





}}]);return ShiftDetailsComponent;}(_react.Component);


var updateShiftUser=(0,_reactApollo.gql)(_templateObject);










var updateShift=(0,_reactApollo.gql)(_templateObject2);exports.default=










(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(updateShiftUser,{
name:'updateShiftUser'}),

(0,_reactApollo.graphql)(updateShift,{
name:'updateShift'}))(

ShiftDetailsComponent);

var styles=_reactNative.StyleSheet.create({
container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:0},

android:{
paddingTop:0}})),



modalContainer:{
justifyContent:'flex-start',
alignItems:'center',
zIndex:100},

modalContentContainer:{
marginTop:110,
width:width*0.8,
padding:0,
borderRadius:5,
backgroundColor:'transparent'},

modalContent:{
paddingTop:15,
paddingBottom:25,
paddingHorizontal:20,
borderRadius:5,
borderColor:'rgb(153,153,153)',
justifyContent:'center',
alignItems:'center',
backgroundColor:'white'},

modalText:{
color:'#888',
textAlign:'center',
paddingVertical:15,
width:width*0.715,
fontSize:15},

modalButtonContainer:{
backgroundColor:'#00A863',
padding:10,
width:width*0.55,
marginVertical:5,
shadowOffset:{height:2,width:1},
shadowOpacity:0.4,
borderRadius:2},

modalButtonName:{
color:'white',
fontWeight:'bold',
textAlign:'center',
fontSize:16,
fontFamily:'RobotoCondensed-Regular'},

modalFooterContainer:{
backgroundColor:'transparent',
justifyContent:'center',
alignItems:'center',
marginTop:10}});