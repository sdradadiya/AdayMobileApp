Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation createUserEmployer( $userEmployer: UserEmployerInput!) {\n  createUserEmployer(input: {userEmployer: $userEmployer}) {\n    userEmployer {\n      id\n      userId\n      employerName\n      city\n      state\n      jobTitle\n      jobDescription\n      startDate\n      endDate\n    }\n  }\n}'],['\n  mutation createUserEmployer( $userEmployer: UserEmployerInput!) {\n  createUserEmployer(input: {userEmployer: $userEmployer}) {\n    userEmployer {\n      id\n      userId\n      employerName\n      city\n      state\n      jobTitle\n      jobDescription\n      startDate\n      endDate\n    }\n  }\n}']),_templateObject2=_taggedTemplateLiteral(['\n mutation updateUserEmployer($id: Uuid!, $UserEmployerPatch: UserEmployerPatch!) {\n  updateUserEmployerById(input: {id: $id, userEmployerPatch: $UserEmployerPatch }) {\n    userEmployer {\n      id\n      userId\n      employerName\n      city\n      state\n      jobTitle\n      jobDescription\n      startDate\n      endDate\n    }\n  }\n}'],['\n mutation updateUserEmployer($id: Uuid!, $UserEmployerPatch: UserEmployerPatch!) {\n  updateUserEmployerById(input: {id: $id, userEmployerPatch: $UserEmployerPatch }) {\n    userEmployer {\n      id\n      userId\n      employerName\n      city\n      state\n      jobTitle\n      jobDescription\n      startDate\n      endDate\n    }\n  }\n}']),_templateObject3=_taggedTemplateLiteral(['\nmutation deleteUserEmployerById($id: Uuid!) {\n    deleteUserEmployerById(input: {id: $id}) {\n        deletedUserEmployerId\n    }\n}'],['\nmutation deleteUserEmployerById($id: Uuid!) {\n    deleteUserEmployerById(input: {id: $id}) {\n        deletedUserEmployerId\n    }\n}']);


var _nativeBase=require('native-base');
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');











var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactNativeDatepicker=require('react-native-datepicker');var _reactNativeDatepicker2=_interopRequireDefault(_reactNativeDatepicker);
var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactApollo=require('react-apollo');
var _v=require('uuid/v1');var _v2=_interopRequireDefault(_v);

var _reactNativeModalDropdown=require('react-native-modal-dropdown');var _reactNativeModalDropdown2=_interopRequireDefault(_reactNativeModalDropdown);
var _SpinnerComponent=require('./../SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _reactNativeKeyboardSpacer=require('react-native-keyboard-spacer');var _reactNativeKeyboardSpacer2=_interopRequireDefault(_reactNativeKeyboardSpacer);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

WorkHistory=function(_Component){_inherits(WorkHistory,_Component);

function WorkHistory(props){_classCallCheck(this,WorkHistory);var _this=_possibleConstructorReturn(this,(WorkHistory.__proto__||Object.getPrototypeOf(WorkHistory)).call(this,
props));_this.




















_keyboardDidShow=function(e){
var height=e.endCoordinates.height;
_this.setState({
bottomMargin:-height,
topMargin:-150});


};_this.

_keyboardDidHide=function(e){

_this.setState({
bottomMargin:0,
topMargin:0});

_this.scrollView.scrollToEnd();

};_this.state={id:"",employerName:"",city:"",state:"",jobTitle:"",jobDescription:"",startDate:null,endDate:null,validationError:false,openModal:false,isLoading:false,topMargin:0};_this.onSavePress=_this.onSavePress.bind(_this);_this.onDeletePress=_this.onDeletePress.bind(_this);_this.onSelect=_this.onSelect.bind(_this);_index.Tracker.trackScreenView("Work History");return _this;}_createClass(WorkHistory,[{key:'componentWillUnmount',value:function componentWillUnmount()

{
this.keyboardDidShowListener.remove();
this.keyboardDidHideListener.remove();
}},{key:'componentWillMount',value:function componentWillMount()

{
this.keyboardDidShowListener=_reactNative.Keyboard.addListener('keyboardDidShow',this._keyboardDidShow);
this.keyboardDidHideListener=_reactNative.Keyboard.addListener('keyboardDidHide',this._keyboardDidHide);
if(this.props.work){
console.log(this.props.work);
this.setState(_extends({},this.props.work));
}
}},{key:'onSavePress',value:function onSavePress()

{var _this2=this;var _state=
this.state,employerName=_state.employerName,city=_state.city,state=_state.state,jobTitle=_state.jobTitle,jobDescription=_state.jobDescription,startDate=_state.startDate,endDate=_state.endDate;
var action=this.state.id?"updateUserEmployerById":"createUserEmployer";
var id=this.state.id?this.state.id:(0,_v2.default)();

if(!employerName||!city||!state||!jobTitle||!startDate||!endDate){
this.setState({validationError:true});
return;
}

var userEmployer={
id:id,
employerName:employerName,
city:city,
state:state,
jobTitle:jobTitle,
jobDescription:jobDescription,
startDate:startDate,
userId:this.props.userId};

if(endDate){
userEmployer["endDate"]=endDate;
}

var payment={variables:{userEmployer:userEmployer}};
if(action=="updateUserEmployerById"){
payment={variables:{id:userEmployer.id,UserEmployerPatch:userEmployer}};
}

this.setState({isLoading:true});
this.props[action](payment).
then(function(response){
_this2.setState({isLoading:false});
console.log('done');
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
console.log(err);
console.log(id);
});
}},{key:'onDeletePress',value:function onDeletePress()

{
if(this.state.id){
this.setState({isLoading:true});
this.props.deleteUserEmployerById({variables:{id:this.state.id}}).
then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Delete User Employee");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Delete User Employee");
});
console.log('done');
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
console.log(err);
console.log(id);
});
}

}},{key:'onSelect',value:function onSelect(

index,value){
this.setState({state:value});
}},{key:'render',value:function render()

{var _this3=this;
if(this.state.isLoading){
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)));


}
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.ScrollView,{
ref:function ref(_ref){return _this3.scrollView=_ref;},

style:{marginTop:_reactNative.Platform.OS==='android'?this.state.topMargin:0}},

_react2.default.createElement(_reactNative.View,{style:styles.content},
_react2.default.createElement(_reactNative.Text,null,'Employer Name'),
_react2.default.createElement(_reactNative.TextInput,{
style:[styles.textInput,{fontSize:16}],
onChangeText:function onChangeText(employerName){return _this3.setState({employerName:employerName});},
value:this.state.employerName,
underlineColorAndroid:'transparent'}),

_react2.default.createElement(_reactNative.Text,null,'City'),
_react2.default.createElement(_reactNative.TextInput,{
style:[styles.textInput,{fontSize:16}],
onChangeText:function onChangeText(city){return _this3.setState({city:city});},
value:this.state.city,
underlineColorAndroid:'transparent'}),

_react2.default.createElement(_reactNative.Text,null,'State'),
_react2.default.createElement(_reactNativeModalDropdown2.default,{
onSelect:function onSelect(index,value){return _this3.onSelect(index,value);},
dropdownStyle:{width:315},
dropdownTextStyle:{fontSize:16},
options:['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']},

_react2.default.createElement(_reactNative.View,{style:[styles.textInput,{justifyContent:'center',alignItems:'center'}]},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:16}},this.state.state))),


_react2.default.createElement(_reactNative.Text,null,'Job Title'),
_react2.default.createElement(_reactNative.TextInput,{
placeholder:'Cashier',
style:[styles.textInput,{fontSize:16}],
onChangeText:function onChangeText(jobTitle){return _this3.setState({jobTitle:jobTitle});},
value:this.state.jobTitle,
underlineColorAndroid:'transparent'}),

_react2.default.createElement(_reactNative.Text,null,'Job Description'),
_react2.default.createElement(_reactNative.TextInput,{
placeholder:'(Optional)',
style:[styles.textInput,{fontSize:16}],
onChangeText:function onChangeText(jobDescription){return _this3.setState({jobDescription:jobDescription});},
value:this.state.jobDescription,
underlineColorAndroid:'transparent'}),

_react2.default.createElement(_reactNative.View,{style:{height:70,flexDirection:'row'}},
_react2.default.createElement(_reactNative.View,{style:[{flex:1}]},
_react2.default.createElement(_reactNative.Text,{style:styles.textHeader},'Start Date'),
_react2.default.createElement(_reactNative.View,{style:{marginLeft:0}},
_react2.default.createElement(_reactNativeDatepicker2.default,{
style:{width:160,marginTop:10},
date:this.state.startDate,
mode:'date',
placeholder:'select date',
format:'YYYY-MM-DD',
confirmBtnText:'Confirm',
cancelBtnText:'Cancel',
iconSource:require('./../assets/ScheduledHours.png'),
customStyles:{
dateIcon:{
position:'absolute',
left:0,
top:4},

dateInput:{
marginLeft:0},

dateText:{
fontSize:16}},



onDateChange:function onDateChange(date){_this3.setState({startDate:date});}}))),



_react2.default.createElement(_reactNative.View,{style:{flex:1,marginLeft:25}},
_react2.default.createElement(_reactNative.Text,{style:styles.textHeader},'End Date'),
_react2.default.createElement(_reactNative.View,{style:{marginLeft:0}},
_react2.default.createElement(_reactNativeDatepicker2.default,{
style:{width:160,marginTop:10},
date:this.state.endDate,
mode:'date',
placeholder:'select date',
format:'YYYY-MM-DD',
confirmBtnText:'Confirm',
cancelBtnText:'Cancel',
iconSource:require('./../assets/ScheduledHours.png'),
customStyles:{
dateIcon:{
position:'absolute',
left:0,
top:4},

dateInput:{
marginLeft:0},

dateText:{
fontSize:16}},



onDateChange:function onDateChange(date){_this3.setState(
{endDate:date,presEmp:false});}}))))),





this.state.validationError&&
_react2.default.createElement(_reactNative.View,{style:{marginLeft:20,marginTop:5}},
_react2.default.createElement(_reactNative.Text,{style:{color:'red'}},'Please input all fields')),


_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center",marginTop:20}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this3.onSavePress();},
containerStyle:styles.saveButton,
style:styles.buttonText},'SAVE')),



_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center",marginTop:7,
marginBottom:10}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this3.onDeletePress();},
containerStyle:styles.deleteButton,
style:styles.buttonText},'DELETE WORK EXPERIENCE')),



_react2.default.createElement(_reactNativeKeyboardSpacer2.default,null))));



}}]);return WorkHistory;}(_react.Component);


var styles=_reactNative.StyleSheet.create({

container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:24},

android:{
paddingTop:16}})),



content:{
flex:1,
paddingHorizontal:30},


center:{
justifyContent:'center',
alignItems:'center'},

date:{
marginTop:15},

description:{
marginTop:10},

info:{
marginTop:130},

text:{
fontSize:24,
color:'#4A4A4A',
fontFamily:'Roboto'},

textHeader:{
fontSize:15,
color:'#4A4A4A',
fontFamily:'Roboto'},

textInput:{
height:40,
borderColor:'gray',
borderWidth:1,
borderRadius:4,
marginVertical:10,
paddingLeft:8},

saveButton:{
padding:7,
height:35,
width:220,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#002DB0'},

deleteButton:{
padding:7,
height:35,
width:220,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#E33821',
marginBottom:10},

buttonText:{
color:'white',
fontSize:15,
fontWeight:'bold'},

modalContainer:{
justifyContent:'center',
alignItems:'center'},

modalContentContainer:{
marginTop:6,
width:width*0.8,
padding:0,
borderRadius:5,
backgroundColor:'transparent'},

modalContent:{
paddingTop:10,
paddingBottom:20,
paddingHorizontal:20,
borderRadius:5,
borderColor:'rgb(153,153,153)',
justifyContent:'center',
alignItems:'center',
backgroundColor:'white'},

nopeButton:{
padding:7,
borderRadius:2,
borderColor:'#ddd',
borderBottomWidth:0,
shadowColor:'#000',
shadowOffset:{width:0,height:2},
shadowOpacity:0.8,
shadowRadius:2,
elevation:1,
marginLeft:5,
marginRight:5,
height:30,
width:110},

yupButton:{
padding:7,
borderRadius:2,
borderColor:'#ddd',
borderBottomWidth:0,
shadowColor:'#000',
backgroundColor:'#0022A1',
shadowOffset:{width:0,height:2},
shadowOpacity:0.8,
shadowRadius:2,
elevation:1,
marginLeft:5,
marginRight:5,
height:30,
width:110}});



var createUserEmployer=(0,_reactApollo.gql)(_templateObject);
















var updateUserEmployerById=(0,_reactApollo.gql)(_templateObject2);
















var deleteUserEmployerById=(0,_reactApollo.gql)(_templateObject3);






var WorkHistoryComponent=(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(createUserEmployer,{
name:'createUserEmployer'}),

(0,_reactApollo.graphql)(updateUserEmployerById,{
name:'updateUserEmployerById'}),

(0,_reactApollo.graphql)(deleteUserEmployerById,{
name:'deleteUserEmployerById'}))(

WorkHistory);exports.default=

WorkHistoryComponent;