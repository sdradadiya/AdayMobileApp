Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactApollo=require('react-apollo');
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _reactNative=require('react-native');











var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactNativeCheckbox=require('react-native-checkbox');var _reactNativeCheckbox2=_interopRequireDefault(_reactNativeCheckbox);
var _CustomDatepickerComponent=require('./CustomDatepickerComponent');var _CustomDatepickerComponent2=_interopRequireDefault(_CustomDatepickerComponent);
var _TimeOffQueries=require('./TimeOffQueries');
var _reactNativeKeyboardSpacer=require('react-native-keyboard-spacer');var _reactNativeKeyboardSpacer2=_interopRequireDefault(_reactNativeKeyboardSpacer);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var uuidv4=require('uuid/v4');var

TimeOffRequestsComponent=function(_Component){_inherits(TimeOffRequestsComponent,_Component);
function TimeOffRequestsComponent(props){_classCallCheck(this,TimeOffRequestsComponent);var _this=_possibleConstructorReturn(this,(TimeOffRequestsComponent.__proto__||Object.getPrototypeOf(TimeOffRequestsComponent)).call(this,
props));_this.



















_keyboardDidShow=function(e){
var height=e.endCoordinates.height;
_this.setState({
bottomMargin:-height,
topMargin:-80});


};_this.

_keyboardDidHide=function(e){

_this.setState({
bottomMargin:0,
topMargin:0});

_this.scrollView.scrollToEnd();

};_this.state={firstDay:'',lastDay:'',claimVacation:true,vacationHours:'',personalHours:'',lumpSum:true,payDay:'',notes:'',bottomMargin:0,topMargin:0};_this.checkboxChange=_this.checkboxChange.bind(_this);_this.onChange=_this.onChange.bind(_this);_this.onSubmit=_this.onSubmit.bind(_this);_this.isValid=_this.isValid.bind(_this);_index.Tracker.trackScreenView("TimeOff Requests");return _this;}_createClass(TimeOffRequestsComponent,[{key:'componentWillMount',value:function componentWillMount()
{
this.keyboardDidShowListener=_reactNative.Keyboard.addListener('keyboardDidShow',this._keyboardDidShow);
this.keyboardDidHideListener=_reactNative.Keyboard.addListener('keyboardDidHide',this._keyboardDidHide);
}},{key:'componentWillUnmount',value:function componentWillUnmount()
{
this.keyboardDidShowListener.remove();
this.keyboardDidHideListener.remove();
}},{key:'checkboxChange',value:function checkboxChange(
name){
this.setState(_defineProperty({},name,!this.state[name]));
if(name=="claimVacation"){
this.setState({vacationHours:'0',
personalHours:'0'});
if(this.state.lumpSum){
this.checkboxChange("lumpSum");
}
}else if(name=="lumpSum"){
this.setState({payDay:''});
}
}},{key:'onChange',value:function onChange(
name){var _this2=this;
return function(value){if(name=="vacationHours"){
_this2.setState({personalHours:'0'});
}else if(name=='personalHours'){
_this2.setState({vacationHours:'0'});
}
_this2.setState(_defineProperty({},name,value));};
}},{key:'isValid',value:function isValid()
{
var start=(0,_moment2.default)(this.state.firstDay,'dddd, MMMM Do, YYYY');
var end=(0,_moment2.default)(this.state.lastDay,'dddd, MMMM Do, YYYY');
return this.state.firstDay!=""&&
this.state.lastDay!=""&&
end.diff(start,'days')>=0&&
start.diff((0,_moment2.default)(),'days')>=0&&
end.diff((0,_moment2.default)(),'days')>=0&&
this.state.vacationHours!=""&&
this.state.personalHours!=""&&(
this.state.payDay!=""||!this.state.lumpSum);
}},{key:'onSubmit',value:function onSubmit()
{
var data={"data":{"clientMutationId":uuidv4(),
"timeOffRequest":{"id":uuidv4(),
"startDate":(0,_moment2.default)(this.state.firstDay,'dddd, MMMM Do, YYYY').format(),
"endDate":(0,_moment2.default)(this.state.lastDay,'dddd, MMMM Do, YYYY').format(),
"submissionDate":(0,_moment2.default)().format(),
"minutesPaid":(parseInt(this.state.vacationHours)+parseInt(this.state.personalHours))*60,
"decisionStatus":"PENDING",
"requestType":this.state.personalHours>0?'PERSONAL':'VACATION',
"corporationId":"3b14782b-c220-4927-b059-f4f22d01c230",
"requestorId":this.props.userId,
"payDate":this.state.payDay==""?null:
(0,_moment2.default)(this.state.payDay,'dddd, MMMM Do, YYYY').format(),
"notes":this.state.notes}}};

this.props.mutate({variables:data,refetchQueries:[{query:_TimeOffQueries.userTimeOffRequestQuery,
variables:{requestorId:this.props.userId}}]}).
then(function(res){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"TimeOff Request");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","TimeOff Request");
});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
});
_reactNativeRouterFlux.Actions.pop({});
}},{key:'render',value:function render()

{var _this3=this;
var start=(0,_moment2.default)(this.state.firstDay,'dddd, MMMM Do, YYYY');
var end=(0,_moment2.default)(this.state.lastDay,'dddd, MMMM Do, YYYY');
return(
_react2.default.createElement(_reactNative.ScrollView,{
style:[styles.container],
ref:function ref(_ref){return _this3.scrollView=_ref;}},


_react2.default.createElement(_reactNative.Text,{style:styles.headerText},'Time Off Duration'),



_react2.default.createElement(_reactNative.View,{style:styles.centerer},
_react2.default.createElement(_reactNative.Text,{style:styles.labelText},'First Day'),


_react2.default.createElement(_CustomDatepickerComponent2.default,{date:this.state.firstDay,onChange:this.onChange('firstDay')})),


_react2.default.createElement(_reactNative.View,{style:styles.centerer},
_react2.default.createElement(_reactNative.Text,{style:styles.labelText},'Last Day'),


_react2.default.createElement(_CustomDatepickerComponent2.default,{date:this.state.lastDay,onChange:this.onChange('lastDay')})),


_react2.default.createElement(_reactNative.View,{style:styles.centerer},
_react2.default.createElement(_reactNative.Text,{style:styles.descriptionText},'Consecutive Days Off: ',
end.diff(start,'days')+1)),



_react2.default.createElement(_reactNative.View,{style:styles.centerer},
_react2.default.createElement(_reactNative.Text,{style:styles.headerText},'Time Off Compensation'),



_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.infoText},'Claim Vacation, Personal Days?'),
_react2.default.createElement(_reactNativeCheckbox2.default,{
label:'',
labelBefore:true,
checkboxStyle:styles.checkBox,
labelStyle:{display:'none'},
checkedImage:require('../assets/yesCheckbox.png'),
uncheckedImage:require('../assets/noCheckbox.png'),
checked:this.state.claimVacation,
onChange:function onChange(checked){return _this3.checkboxChange('claimVacation');}})),



_react2.default.createElement(_reactNative.Text,{style:styles.labelText},'Vacation Hours Claimed:'),



_react2.default.createElement(_reactNative.TextInput,{
style:styles.numInput,
keyboardType:'numeric',
onChangeText:this.onChange('vacationHours'),
editable:this.state.claimVacation,
value:this.state.vacationHours,
underlineColorAndroid:'transparent'}),


_react2.default.createElement(_reactNative.Text,{style:styles.labelText},'Personal Hours Claimed:'),



_react2.default.createElement(_reactNative.TextInput,{
style:styles.numInput,
keyboardType:'numeric',
onChangeText:this.onChange('personalHours'),
editable:this.state.claimVacation,
value:this.state.personalHours,
underlineColorAndroid:'transparent'}),


_react2.default.createElement(_reactNative.Text,{style:styles.headerText},'Lump Sum Payment'),



_react2.default.createElement(_reactNative.View,{style:styles.checkboxRowContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.infoText},'Pay Claimed Hours as Lump Sum?'),
_react2.default.createElement(_reactNativeCheckbox2.default,{
label:'',
labelBefore:true,
checkboxStyle:styles.checkBox,
labelStyle:{display:'none'},
checkedImage:require('../assets/yesCheckbox.png'),
uncheckedImage:require('../assets/noCheckbox.png'),
checked:this.state.lumpSum,
onChange:function onChange(checked){return _this3.checkboxChange('lumpSum');}}))),




_react2.default.createElement(_reactNative.View,{style:styles.centerer},
_react2.default.createElement(_reactNative.Text,{style:styles.labelText},'Which Day for Lump Sum Payment?'),


_react2.default.createElement(_CustomDatepickerComponent2.default,{date:this.state.payDay,onChange:this.onChange('payDay'),disabled:!this.state.lumpSum})),


_react2.default.createElement(_reactNative.View,{style:styles.centerer},
_react2.default.createElement(_reactNative.Text,{style:styles.headerText},'Notes'),



_react2.default.createElement(_reactNative.TextInput,{
multiline:true,
style:styles.textInput,
onChangeText:this.onChange('notes'),
value:this.state.notes,
underlineColorAndroid:'transparent'})),



_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center",marginVertical:25}},
_react2.default.createElement(_reactNativeButton2.default,{containerStyle:styles.submitButton,
style:styles.buttonText,
onPress:this.onSubmit,
disabled:!this.isValid(),
styleDisabled:{color:'#4f5a87'}},'Submit'))));






}}]);return TimeOffRequestsComponent;}(_react.Component);var _Dimensions$get=

_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;
var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
paddingHorizontal:15,
marginTop:2,
backgroundColor:'#FAFAFA'},

checkBox:{
width:49.5,
height:22},

headerText:{
fontSize:22,
paddingHorizontal:10,
paddingVertical:10,
color:'#0022A1',
paddingRight:5,
fontWeight:'600',
fontFamily:'RobotoCondensed-Regular',
textAlign:"center"},

labelText:{
fontSize:18,
paddingHorizontal:10,
paddingVertical:10,
color:'#666666',
textAlign:"center"},

infoText:{
fontSize:17.5,
paddingVertical:10,
color:'#172434'},

descriptionText:{
fontSize:16,
paddingHorizontal:10,
paddingVertical:10,
color:'#8E9091'},

textInput:{
height:90,
width:width-57,
fontSize:20,
marginLeft:7,
marginRight:25,
marginVertical:0,
borderColor:'gray',
borderWidth:1,
borderRadius:4,
marginLeft:"5%",
textAlign:"center",
fontFamily:"Lato"},

numInput:{
height:45,
width:"90%",
fontSize:20,
marginVertical:5,
borderColor:'gray',
borderWidth:1,
borderRadius:4,
marginLeft:"5%",
textAlign:"center"},

checkboxName:{
marginVertical:5,
color:'#172434'},

checkboxRowContainer:{
flexDirection:'row',
alignItems:'center',
flexWrap:"wrap"},

submitButton:{
padding:7,
height:40,
width:200,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#0022A1'},

buttonText:{
color:'white',
fontSize:20,
fontWeight:'bold',
fontFamily:"Lato"},

centerer:{
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center"}});exports.default=



(0,_reactApollo.graphql)(_TimeOffQueries.submitTimeOffRequestMutation)(TimeOffRequestsComponent);