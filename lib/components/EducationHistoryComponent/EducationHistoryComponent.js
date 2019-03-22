Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\nmutation createUserEducation($id: Uuid!, $userId: Uuid!, $educationalInstitutionName: String!, $city: String!, $state: String!, $awardType: String!, $fieldOfStudy: String!, $startDate: Datetime!, $endDate: Datetime!) {\n    createUserEducation(input: {userEducation: {id: $id, userId: $userId, educationalInstitutionName: $educationalInstitutionName, city: $city, state: $state, awardType: $awardType, fieldOfStudy: $fieldOfStudy, startDate: $startDate, endDate: $endDate}}) {\n        userEducation {\n            id\n            userId\n            educationalInstitutionName\n            city\n            state\n            awardType\n            fieldOfStudy\n            startDate\n            endDate\n        }\n    }\n}'],['\nmutation createUserEducation($id: Uuid!, $userId: Uuid!, $educationalInstitutionName: String!, $city: String!, $state: String!, $awardType: String!, $fieldOfStudy: String!, $startDate: Datetime!, $endDate: Datetime!) {\n    createUserEducation(input: {userEducation: {id: $id, userId: $userId, educationalInstitutionName: $educationalInstitutionName, city: $city, state: $state, awardType: $awardType, fieldOfStudy: $fieldOfStudy, startDate: $startDate, endDate: $endDate}}) {\n        userEducation {\n            id\n            userId\n            educationalInstitutionName\n            city\n            state\n            awardType\n            fieldOfStudy\n            startDate\n            endDate\n        }\n    }\n}']),_templateObject2=_taggedTemplateLiteral(['\nmutation updateUserEducation($id: Uuid!, $userId: Uuid!, $educationalInstitutionName: String!, $city: String!, $state: String!, $awardType: String!, $fieldOfStudy: String!, $startDate: Datetime!, $endDate: Datetime!) {\n    updateUserEducationById(input: {id: $id, userEducationPatch: {userId: $userId, state: $state, city: $city, educationalInstitutionName: $educationalInstitutionName, awardType: $awardType, fieldOfStudy: $fieldOfStudy, startDate: $startDate, endDate: $endDate}}) {\n        userEducation {\n            id\n            userId\n            educationalInstitutionName\n            city\n            state\n            awardType\n            fieldOfStudy\n            startDate\n            endDate\n        }\n    }\n}'],['\nmutation updateUserEducation($id: Uuid!, $userId: Uuid!, $educationalInstitutionName: String!, $city: String!, $state: String!, $awardType: String!, $fieldOfStudy: String!, $startDate: Datetime!, $endDate: Datetime!) {\n    updateUserEducationById(input: {id: $id, userEducationPatch: {userId: $userId, state: $state, city: $city, educationalInstitutionName: $educationalInstitutionName, awardType: $awardType, fieldOfStudy: $fieldOfStudy, startDate: $startDate, endDate: $endDate}}) {\n        userEducation {\n            id\n            userId\n            educationalInstitutionName\n            city\n            state\n            awardType\n            fieldOfStudy\n            startDate\n            endDate\n        }\n    }\n}']),_templateObject3=_taggedTemplateLiteral(['\nmutation deleteUserEducationById($id: Uuid!) {\n  deleteUserEducationById(input: {id: $id}) {\n    deletedUserEducationId\n  }\n}'],['\nmutation deleteUserEducationById($id: Uuid!) {\n  deleteUserEducationById(input: {id: $id}) {\n    deletedUserEducationId\n  }\n}']);

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








EducationHistory=function(_Component){_inherits(EducationHistory,_Component);

function EducationHistory(props){_classCallCheck(this,EducationHistory);var _this=_possibleConstructorReturn(this,(EducationHistory.__proto__||Object.getPrototypeOf(EducationHistory)).call(this,
props));
_this.state={
id:"",
educationalInstitutionName:"",
city:"",
state:"",
awardType:"",
fieldOfStudy:"",
startDate:"",
endDate:"",
validationError:false,
isAddress:true,
openModal:false,
isLoading:false};

_this.onSavePress=_this.onSavePress.bind(_this);
_this.onDeletePress=_this.onDeletePress.bind(_this);
_this.onSelect=_this.onSelect.bind(_this);
_index.Tracker.trackScreenView("Education History");return _this;
}_createClass(EducationHistory,[{key:'componentWillMount',value:function componentWillMount()

{
if(this.props.education){
this.setState(_extends({},this.props.education));

}
}},{key:'onSavePress',value:function onSavePress()

{var _state=









this.state,educationalInstitutionName=_state.educationalInstitutionName,city=_state.city,state=_state.state,awardType=_state.awardType,fieldOfStudy=_state.fieldOfStudy,startDate=_state.startDate,endDate=_state.endDate;
var action=this.state.id?"updateUserEducation":"createUserEducation";
var id=this.state.id?this.state.id:(0,_v2.default)();

if(!educationalInstitutionName||!city||!state||!startDate||!endDate){
this.setState({
validationError:true});

return;
}

var educationPlace={
id:id,
educationalInstitutionName:educationalInstitutionName,
city:city,
state:state,
awardType:awardType,
fieldOfStudy:fieldOfStudy,
startDate:startDate,
endDate:endDate,
userId:this.props.store.myProfile.id};

this.setState({
isLoading:true});

this.props[action]({
variables:educationPlace}).

then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Update or Create User Education");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Update or Create User Education");
});

console.log('done');
_reactNativeRouterFlux.Actions.Account({tab:"PROFILE"});
}).
catch(function(err){
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
console.log(err);
console.log(id);
});
}},{key:'onDeletePress',value:function onDeletePress()

{
if(this.state.id){
this.setState({
isLoading:true});

this.props.deleteUserEducation({
variables:{
id:this.state.id}}).


then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Delete User Education");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Delete User Education");
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
this.setState({
state:value});

}},{key:'render',value:function render()

{var _this2=this;
if(this.state.isLoading){
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)));


}
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.ScrollView,null,
_react2.default.createElement(_reactNative.View,{style:styles.content},
_react2.default.createElement(_reactNative.Text,null,'Educational Institution Name'),
_react2.default.createElement(_reactNative.TextInput,{
style:[styles.textInput,{fontSize:16}],
onChangeText:function onChangeText(educationalInstitutionName){return _this2.setState({educationalInstitutionName:educationalInstitutionName});},
value:this.state.educationalInstitutionName,
underlineColorAndroid:'transparent'}),

_react2.default.createElement(_reactNative.Text,null,'City'),
_react2.default.createElement(_reactNative.TextInput,{
style:[styles.textInput,{fontSize:16}],
onChangeText:function onChangeText(city){return _this2.setState({city:city});},
value:this.state.city,
underlineColorAndroid:'transparent'}),

_react2.default.createElement(_reactNative.Text,null,'State'),
_react2.default.createElement(_reactNativeModalDropdown2.default,{
onSelect:function onSelect(index,value){return _this2.onSelect(index,value);},
dropdownStyle:{width:315},
dropdownTextStyle:{fontSize:16},
options:['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']},

_react2.default.createElement(_reactNative.View,{style:[styles.textInput,{justifyContent:'center',alignItems:'center'}]},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:16}},this.state.state))),


_react2.default.createElement(_reactNative.Text,null,'Award Type (e.g. certificate, Degrees, etc.)'),
_react2.default.createElement(_reactNative.TextInput,{
placeholder:'(Optional)',
style:[styles.textInput,{fontSize:16}],
onChangeText:function onChangeText(awardType){return _this2.setState({awardType:awardType});},
value:this.state.awardType,
underlineColorAndroid:'transparent'}),

_react2.default.createElement(_reactNative.Text,null,'Field of Study'),
_react2.default.createElement(_reactNative.TextInput,{
placeholder:'(Optional)',
style:[styles.textInput,{fontSize:16}],
onChangeText:function onChangeText(fieldOfStudy){return _this2.setState({fieldOfStudy:fieldOfStudy});},
value:this.state.fieldOfStudy,
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
top:4,
marginLeft:0},

dateInput:{
marginLeft:0},

dateText:{
fontSize:16}},



onDateChange:function onDateChange(date){_this2.setState({startDate:date});}}))),



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
top:4,
marginLeft:0},

dateInput:{
marginLeft:0},

dateText:{
fontSize:16}},



onDateChange:function onDateChange(date){_this2.setState({endDate:date});}}))))),





this.state.validationError&&
_react2.default.createElement(_reactNative.View,{style:{marginLeft:20,marginTop:5}},
_react2.default.createElement(_reactNative.Text,{style:{color:'red'}},'Please input all fields')),


_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center",marginTop:20}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this2.onSavePress();},
containerStyle:styles.saveButton,
style:styles.buttonText},'SAVE')),



_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center",marginTop:7}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this2.onDeletePress();},
containerStyle:styles.deleteButton,
style:styles.buttonText},'DELETE')),



_react2.default.createElement(_reactNativeKeyboardSpacer2.default,null))));



}}]);return EducationHistory;}(_react.Component);


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
paddingHorizontal:30,
paddingTop:10},

address:{
marginLeft:10},

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
fontSize:20,
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
width:170,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#002DB0'},

deleteButton:{
padding:7,
height:35,
width:170,
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
backgroundColor:'white'}});



var createUserEducation=(0,_reactApollo.gql)(_templateObject);
















var updateUserEducation=(0,_reactApollo.gql)(_templateObject2);
















var deleteUserEducation=(0,_reactApollo.gql)(_templateObject3);






var EducationHistoryComponent=(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(createUserEducation,{
name:'createUserEducation'}),

(0,_reactApollo.graphql)(updateUserEducation,{
name:'updateUserEducation'}),

(0,_reactApollo.graphql)(deleteUserEducation,{
name:'deleteUserEducation'}))(

EducationHistory);exports.default=

EducationHistoryComponent;