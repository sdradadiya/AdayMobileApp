Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n query UserNotification( $userId: Uuid! ){\n  allUserNotifications(condition: { userId: $userId }){\n      edges{\n        node{\n            id\n            userId\n            email\n            push\n            text\n            call\n            action\n            isSnoozed\n            snoozingStartTime\n            snoozingEndTime\n        }\n    }\n  }\n}'],['\n query UserNotification( $userId: Uuid! ){\n  allUserNotifications(condition: { userId: $userId }){\n      edges{\n        node{\n            id\n            userId\n            email\n            push\n            text\n            call\n            action\n            isSnoozed\n            snoozingStartTime\n            snoozingEndTime\n        }\n    }\n  }\n}']),_templateObject2=_taggedTemplateLiteral(['\n    mutation updateUserNotificationById($id: Uuid!, $userNotificationPatch: UserNotificationPatch!) {\n        updateUserNotificationById(input:{id: $id, userNotificationPatch: $userNotificationPatch}) {\n            userNotification {\n                id\n                userId\n                email\n                push\n                text\n                call\n                action\n                isSnoozed\n                snoozingStartTime\n                snoozingEndTime\n            }\n        }\n    }'],['\n    mutation updateUserNotificationById($id: Uuid!, $userNotificationPatch: UserNotificationPatch!) {\n        updateUserNotificationById(input:{id: $id, userNotificationPatch: $userNotificationPatch}) {\n            userNotification {\n                id\n                userId\n                email\n                push\n                text\n                call\n                action\n                isSnoozed\n                snoozingStartTime\n                snoozingEndTime\n            }\n        }\n    }']),_templateObject3=_taggedTemplateLiteral(['\n    mutation createUserNotification($id: Uuid!, $userId: Uuid!, $email: Boolean!, $push: Boolean! $text: Boolean, $call: Boolean!, $action: String!) {\n        createUserNotification(input: { userNotification: {id: $id, userId: $userId, action: $action, email: $email, push: $push, text: $text, call: $call}}) {\n            userNotification {\n                id\n            }\n        }\n    }'],['\n    mutation createUserNotification($id: Uuid!, $userId: Uuid!, $email: Boolean!, $push: Boolean! $text: Boolean, $call: Boolean!, $action: String!) {\n        createUserNotification(input: { userNotification: {id: $id, userId: $userId, action: $action, email: $email, push: $push, text: $text, call: $call}}) {\n            userNotification {\n                id\n            }\n        }\n    }']);


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');











var _reactApollo=require('react-apollo');









var _reactNativeDatepicker=require('react-native-datepicker');var _reactNativeDatepicker2=_interopRequireDefault(_reactNativeDatepicker);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _SpinnerComponent=require('./../SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _nativeBase=require('native-base');
var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactNativeCheckbox=require('react-native-checkbox');var _reactNativeCheckbox2=_interopRequireDefault(_reactNativeCheckbox);

var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

AlertSettings=function(_Component){_inherits(AlertSettings,_Component);
function AlertSettings(props){_classCallCheck(this,AlertSettings);var _this=_possibleConstructorReturn(this,(AlertSettings.__proto__||Object.getPrototypeOf(AlertSettings)).call(this,
props));_this.




































































































































































































executeActions=function(action){

_this.props.updateUserNotificationById({
variables:action}).

then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update User Notification");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Update User Notification");
});

console.log("TEST");
console.log(response);
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
console.log(err);
console.log(id);
});
};_this.state={startTime:"",endTime:""};_this.checkboxChange=_this.checkboxChange.bind(_this);_index.Tracker.trackScreenView("Alert Settings");return _this;}_createClass(AlertSettings,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){var _this2=this;if(!nextProps.data.loading&&nextProps.data.loading!==this.props.data.loading){if(nextProps.data.allUserNotifications&&nextProps.data.allUserNotifications.edges){nextProps.data.allUserNotifications.edges.map(function(notification){var node=notification.node;switch(node.action){case'SHIFT_UPDATED':_this2.props.actions.changeIdAlertSetting({type:'updateId',id:node.id});if(!node.email){_this2.checkboxChange('updatesEmail');}if(!node.push){_this2.checkboxChange('updatesPush');}break;case'SHIFT_CREATED':_this2.props.actions.changeIdAlertSetting({type:'createId',id:node.id});if(!node.email){_this2.checkboxChange('assignedEmail');}if(!node.push){_this2.checkboxChange('assignedPush');}break;case'SHIFT_DELETED':_this2.props.actions.changeIdAlertSetting({type:'deleteId',id:node.id});if(!node.email){_this2.checkboxChange('cancellationsEmail');}if(!node.push){_this2.checkboxChange('cancellationsPush');}if(!node.call){_this2.checkboxChange('cancellationsPhone');}break;case'OPEN_SHIFT':_this2.props.actions.changeIdAlertSetting({type:'openId',id:node.id});if(!node.email){_this2.checkboxChange('newShiftsEmail');}if(!node.push){_this2.checkboxChange('newShiftsPush');}if(!node.call){_this2.checkboxChange('newShiftsPhone');}if(!node.text){_this2.checkboxChange('newShiftsTextMessage');}break;case'PHONE_SNOOZED':_this2.props.actions.changeIdAlertSetting({type:'phoneId',id:node.id});if(!node.isSnoozed){_this2.checkboxChange('isSnoozed');_this2.setState({startTime:node.snoozingStartTime,endTime:node.snoozingEndTime});}else{_this2.setState({startTime:node.snoozingStartTime,endTime:node.snoozingEndTime});}break;}});}}}},{key:'checkboxChange',value:function checkboxChange(name){this.props.actions.changeAlertSettings(name);}},{key:'updateDb',value:function updateDb(name){var id='';var state='';switch(name){case'newShiftsEmail':id=this.props.state.alertsSettings.openId;state=!this.props.state.alertsSettings.newShiftsEmail;this.executeActions({'id':id,'userNotificationPatch':{'email':state}});break;case'newShiftsPhone':id=this.props.state.alertsSettings.openId;state=!this.props.state.alertsSettings.newShiftsPhone;this.executeActions({'id':id,'userNotificationPatch':{'call':state}});break;case'newShiftsPush':id=this.props.state.alertsSettings.openId;state=!this.props.state.alertsSettings.newShiftsPush;this.executeActions({'id':id,'userNotificationPatch':{'push':state}});break;case'newShiftsTextMessage':id=this.props.state.alertsSettings.openId;state=!this.props.state.alertsSettings.newShiftsTextMessage;this.executeActions({'id':id,'userNotificationPatch':{'text':state}});break;case'updatesEmail':id=this.props.state.alertsSettings.updateId;state=!this.props.state.alertsSettings.updatesEmail;this.executeActions({'id':id,'userNotificationPatch':{'email':state}});break;case'updatesPush':id=this.props.state.alertsSettings.updateId;state=!this.props.state.alertsSettings.updatesPush;this.executeActions({'id':id,'userNotificationPatch':{'push':state}});break;case'assignedEmail':id=this.props.state.alertsSettings.createId;state=!this.props.state.alertsSettings.assignedEmail;this.executeActions({'id':id,'userNotificationPatch':{'email':state}});break;case'assignedPush':id=this.props.state.alertsSettings.createId;state=!this.props.state.alertsSettings.assignedPush;this.executeActions({'id':id,'userNotificationPatch':{'push':state}});break;break;case'cancellationsEmail':id=this.props.state.alertsSettings.deleteId;state=!this.props.state.alertsSettings.cancellationsEmail;this.executeActions({'id':id,'userNotificationPatch':{'email':state}});break;case'cancellationsPhone':id=this.props.state.alertsSettings.deleteId;state=!this.props.state.alertsSettings.cancellationsPhone;this.executeActions({'id':id,'userNotificationPatch':{'call':state}});break;case'cancellationsPush':id=this.props.state.alertsSettings.deleteId;state=!this.props.state.alertsSettings.cancellationsPush;this.executeActions({'id':id,'userNotificationPatch':{'push':state}});break;case'isSnoozed':id=this.props.state.alertsSettings.phoneId;state=!this.props.state.alertsSettings.isSnoozed;this.executeActions({'id':id,'userNotificationPatch':{'isSnoozed':state}});break;}this.checkboxChange(name);}},{key:'updateTimeDb',value:function updateTimeDb(time){id=this.props.state.alertsSettings.phoneId;if(time['startTime']){this.executeActions({'id':id,'userNotificationPatch':{'snoozingStartTime':time['startTime']}});this.props.actions.changeSnoozeStartSettings(time['startTime']);_reactNative.AsyncStorage.getItem('email').then(function(value){_index.Tracker.trackEvent(value,"Change Snooze Start Settingsn");}).catch(function(err){_index.Tracker.trackEvent("Not Define","Change Snooze Start Settings");});this.setState({startTime:time['startTime']});}else if(time['endTime']){this.executeActions({'id':id,'userNotificationPatch':{'snoozingEndTime':time['endTime']}});this.props.actions.changeSnoozeEndSettings(time['endTime']);_reactNative.AsyncStorage.getItem('email').then(function(value){_index.Tracker.trackEvent(value,"Change Snooze End Settings");}).catch(function(err){_index.Tracker.trackEvent("Not Define","Change Snooze End Settings");});this.setState({endTime:time['endTime']});}}},{key:'render',value:function render()

{var _this3=this;

if(this.props.data.loading){
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)));


}

return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.ScrollView,null,
_react2.default.createElement(_reactNative.View,{style:{marginBottom:40}},
_react2.default.createElement(_reactNative.Text,{style:styles.sectionName},'Shifts'),
_react2.default.createElement(_reactNative.Text,{style:styles.groupName},'Assigned'),
_react2.default.createElement(_reactNative.Text,{style:styles.groupDescription},'When a manager assigns you to a shift'),
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:"#FFF"}},
_react2.default.createElement(_reactNative.View,{style:styles.dividerLine}),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Push'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('assignedPush');},
value:this.props.state.alertsSettings.assignedPush})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerMiddleLine}),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Email'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('assignedEmail');},
value:this.props.state.alertsSettings.assignedEmail})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerLine})),

_react2.default.createElement(_reactNative.Text,{style:styles.groupName},'Updates'),
_react2.default.createElement(_reactNative.Text,{style:styles.groupDescription},'When a manager updates a shift that you\'re scheduled to work'),
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:"#FFF"}},

_react2.default.createElement(_reactNative.View,{style:styles.dividerLine}),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Push'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('updatesPush');},
value:this.props.state.alertsSettings.updatesPush})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerMiddleLine}),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Email'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('updatesEmail');},
value:this.props.state.alertsSettings.updatesEmail})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerLine})),


_react2.default.createElement(_reactNative.Text,{style:styles.groupName},'Cancellations'),
_react2.default.createElement(_reactNative.Text,{style:styles.groupDescription},'When a manager cancels a shift you\'re scheduled to work'),
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:"#FFF"}},

_react2.default.createElement(_reactNative.View,{style:styles.dividerLine}),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Push'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('cancellationsPush');},
value:this.props.state.alertsSettings.cancellationsPush})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerMiddleLine}),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Email'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('cancellationsEmail');},
value:this.props.state.alertsSettings.cancellationsEmail})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerMiddleLine})),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Phone'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('cancellationsPhone');},
value:this.props.state.alertsSettings.cancellationsPhone})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerLine}),
_react2.default.createElement(_reactNative.View,{style:[styles.dividerLine,{marginTop:20,borderBottomWidth:1}]}),

_react2.default.createElement(_reactNative.Text,{style:styles.sectionName},'Schedule'),
_react2.default.createElement(_reactNative.Text,{style:styles.groupName},'New Shifts'),
_react2.default.createElement(_reactNative.Text,{style:styles.groupDescription},'When a manager posts a new shift to the schedule'),
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:"#FFF"}},

_react2.default.createElement(_reactNative.View,{style:styles.dividerLine}),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Push'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('newShiftsPush');},
value:this.props.state.alertsSettings.newShiftsPush})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerMiddleLine}),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Email'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('newShiftsEmail');},
value:this.props.state.alertsSettings.newShiftsEmail})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerMiddleLine}),
_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Phone'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('newShiftsPhone');},
value:this.props.state.alertsSettings.newShiftsPhone})),


_react2.default.createElement(_reactNative.View,{style:{marginLeft:15,borderBottomColor:'lightgray',borderBottomWidth:1}}),


_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Text Message'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('newShiftsTextMessage');},
value:this.props.state.alertsSettings.newShiftsTextMessage})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerLine})),


_react2.default.createElement(_reactNative.Text,{style:styles.groupName},'Phone Tree'),
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:"#FFF"}},

_react2.default.createElement(_reactNative.View,{style:styles.dividerLine}),
_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Snooze Phone Calls'),
_react2.default.createElement(_reactNative.Switch,{
onValueChange:function onValueChange(checked){return _this3.updateDb('isSnoozed');},
value:this.props.state.alertsSettings.isSnoozed})),

_react2.default.createElement(_reactNative.View,{style:styles.dividerLine})),


_react2.default.createElement(_reactNative.Text,{style:[styles.groupDescription,{marginTop:10}]},'Do not call me between the following times.'),

_react2.default.createElement(_reactNative.View,{style:{opacity:!this.props.state.alertsSettings.isSnoozed?0.4:1}},

_react2.default.createElement(_reactNative.View,{style:styles.dividerLine}),

_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'Begin Snooze'),
_react2.default.createElement(_reactNativeDatepicker2.default,{
date:this.state.startTime||this.props.state.alertsSettings.snoozeStart,
mode:'time',
format:'h:mm a',
confirmBtnText:'Done',
cancelBtnText:'Cancel',
is24Hour:false,
customStyles:{
dateInput:{
alignItems:'flex-end',
borderWidth:0},

dateIcon:{
width:0},

dateText:{
color:'#333',
fontSize:15}},


onDateChange:function onDateChange(time){
_this3.updateTimeDb({startTime:time});
}})),


_react2.default.createElement(_reactNative.View,{style:styles.dividerMiddleLine}),
_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.checkboxName},'End Snooze'),
_react2.default.createElement(_reactNativeDatepicker2.default,{
date:this.state.endTime||this.props.state.alertsSettings.snoozeEnd,
mode:'time',
format:'h:mm a',
confirmBtnText:'Done',
cancelBtnText:'Cancel',
is24Hour:false,
customStyles:{
dateInput:{
alignItems:'flex-end',
borderWidth:0},

dateIcon:{
width:0},

dateText:{
color:'#333',
fontSize:15}},


onDateChange:function onDateChange(time){
_this3.updateTimeDb({endTime:time});
}})),



_react2.default.createElement(_reactNative.View,{style:styles.dividerLine}),
_react2.default.createElement(_reactNative.Text,{style:[styles.groupDescription,{backgroundColor:'transparent',color:'red',
marginTop:10}]},'Snoozing a phone call may be equivalent to refusing a shift, speak to a manager'),

!this.props.state.alertsSettings.isSnoozed?
_react2.default.createElement(_reactNative.View,{style:{top:0,left:0,right:0,bottom:0,
backgroundColor:'transparent',position:'absolute'}}):
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'transparent'}}))))));







}}]);return AlertSettings;}(_react.Component);



var userQuery=(0,_reactApollo.gql)(_templateObject);



















var updateUserNotificationById=(0,_reactApollo.gql)(_templateObject2);


















var createUserNotification=(0,_reactApollo.gql)(_templateObject3);exports.default=








(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(userQuery,{
options:function options(ownProps){
return{
variables:{
userId:ownProps.userId}};


}}),

(0,_reactApollo.graphql)(createUserNotification,{
name:'createUserNotification'}),

(0,_reactApollo.graphql)(updateUserNotificationById,{
name:'updateUserNotificationById'}))(

AlertSettings);

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
backgroundColor:'#F7F7F7',
paddingTop:10},

checkBox:{
width:45,
height:20},

sectionName:{
fontFamily:'RobotoCondensed-Regular',
paddingHorizontal:20,
marginTop:5,
color:'#172434',
fontSize:17},

groupName:{
paddingHorizontal:20,
paddingVertical:5,
marginTop:10,
marginBottom:5,
color:'#0022A1',
fontWeight:'bold'},

groupDescription:{
paddingHorizontal:20,

marginBottom:10,
color:'#8E9091'},

checkboxName:{
backgroundColor:'transparent',
marginVertical:8,
color:'#172434'},

checkboxRowContainer:{
paddingHorizontal:20,
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
padding:5},

dividerLine:{
borderBottomColor:'lightgray',
borderBottomWidth:1},

dividerMiddleLine:{
marginLeft:15,
borderBottomColor:'lightgray',
borderBottomWidth:1}});