Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');






var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _nativeBase=require('native-base');




var _reactNativeRouterFlux=require('react-native-router-flux');
var _constants=require('../constants');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=
_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;

var Width=width/375;

var HEIGHT=_reactNative.Platform.OS==='android'?110:95;
var WIDTH=_reactNative.Platform.OS==='android'?315*Width:308*Width;var

ScheduleCard=function(_Component){_inherits(ScheduleCard,_Component);
function ScheduleCard(props){_classCallCheck(this,ScheduleCard);return _possibleConstructorReturn(this,(ScheduleCard.__proto__||Object.getPrototypeOf(ScheduleCard)).call(this,
props));
}_createClass(ScheduleCard,[{key:'applyForTraining',value:function applyForTraining()





{
}},{key:'render',value:function render()

{
var data=this.props.data;

var scheduleDate=function scheduleDate(){
_react2.default.createElement(_reactNative.View,{style:_extends({},localStyles.flexCol,{alignItems:"center",flex:0.125,paddingTop:8,height:100})},
_react2.default.createElement(_nativeBase.Text,{style:_extends({},
localStyles.h1GrayLato,{
lineHeight:25})},
(0,_moment2.default)(data.start).format('D').toUpperCase()),
_react2.default.createElement(_nativeBase.Text,{style:_extends({},
localStyles.h3BlackLato,{
lineHeight:15})},
(0,_moment2.default)(data.start).format('MMM').toUpperCase()),
_react2.default.createElement(_nativeBase.Text,{style:_extends({},
localStyles.h3GrayLato,{
lineHeight:15})},
(0,_moment2.default)(data.start).format('ddd').toUpperCase()));

};

if(data.noDataAvailable){
return(
_react2.default.createElement(_reactNative.View,{style:{
flexDirection:'row',
backgroundColor:'#FAFAFA',
marginLeft:5,
marginRight:5,
height:HEIGHT}},


_react2.default.createElement(_reactNative.View,{style:_extends({},
localStyles.flexCol,{
alignItems:"center",
width:46*Width,
paddingTop:-10,
backgroundColor:'#FAFAFA'})}),


_react2.default.createElement(_reactNative.View,{style:{
backgroundColor:'#FAFAFA',
width:WIDTH,
height:HEIGHT-10,
alignItems:"center",
paddingTop:4,
justifyContent:'center'}},

_react2.default.createElement(_reactNative.Image,{style:{width:24.25,height:27},source:require('./assets/no-shifts-icon.png')}),
_react2.default.createElement(_nativeBase.Text,{style:_extends({},localStyles.h3Lato,{lineHeight:15,color:"#999999",marginTop:8})},'No Shifts Available ',
(0,_moment2.default)(data.start).format('MMM DD')))));



}else
{
var arrayShift=data.date;
return(
_react2.default.createElement(_reactNative.View,null,

data.date.map(function(data,key){

var start=(0,_moment2.default)(data.start);
var end=(0,_moment2.default)(data.end);
var iconColor='';

if(data.status==='BOOKED'){
iconColor='#00A863';
}else if(data.status==='PAST'){
iconColor='#4A4A4A';
}else if(data.status==='INVITED'){
iconColor='#FFAD33';
}else if(data.status==='PENDING'){
iconColor='#FFAD33';
}else if(data.status==='OPEN'){
iconColor='#E33820';
}

var renderIcon=function renderIcon(){
if(data.status==='BOOKED'){
iconColor='#00A863';
return _react2.default.createElement(_reactNative.Image,{style:localStyles.iconStyle,
source:require('./assets/icons/booked.png')});
}else if(data.status==='PAST'){
iconColor='#4A4A4A';
return _react2.default.createElement(_reactNative.Image,{style:localStyles.iconStyle,
source:require('./assets/icons/history.png')});
}else if(data.status==='INVITED'){
iconColor='#FFAD33';
return _react2.default.createElement(_reactNative.Image,{style:localStyles.iconStyle,
source:require('./assets/icons/pending.png')});
}else if(data.status==='PENDING'){
iconColor='#FFAD33';
return _react2.default.createElement(_reactNative.Image,{style:localStyles.iconStyle,
source:require('./assets/icons/pending.png')});
}else if(data.status==='OPEN'){
iconColor='#E33820';
return _react2.default.createElement(_reactNative.Image,{style:localStyles.iconStyle,
source:require('./assets/icons/open.png')});
}
};

var renderData=function renderData(mainText,period){return(
_react2.default.createElement(_reactNative.View,{style:_extends({},localStyles.flexRow,{marginRight:10*Width})},
_react2.default.createElement(_nativeBase.Text,{style:_extends({},localStyles.h2BlackLato)},mainText.toUpperCase()),
_react2.default.createElement(_nativeBase.Text,{
style:_extends({},
localStyles.h5BlackLato,{
marginLeft:2,
paddingTop:4})},
period.toUpperCase())));};



var proper=function proper(string){return(
string.charAt(0).toUpperCase()+string.slice(1).toLowerCase());};


var padding1=data.brand.length+data.workplace.length>width/10?55:0;
var padding2=data.address1?
data.address1.length+data.address2.length>width/10?55:0:
data.address2.length>width/10?55:0;

var requiredWidth=width/15;

var length1=width/(data.workplace.length<width/15?data.workplace.length/7:2.7);
var length2=width/(data.brand.length<width/15?data.brand.length/7:2.7);

var length3=width/(data.address2.length<width/15?data.address2.length/7:2.7);
var length4=width/(data.address1.length<width/15?data.address1.length/7:2.7);
return(
_react2.default.createElement(_reactNative.View,null,


key===0?
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',alignSelf:'flex-end',marginLeft:45*Width}},
_react2.default.createElement(_reactNative.View,{style:{
width:8*Width,
backgroundColor:iconColor,
height:HEIGHT-10,
borderTopLeftRadius:2,
borderBottomLeftRadius:2}}),


_react2.default.createElement(_reactNative.TouchableOpacity,{
style:{
flex:1,
alignSelf:'flex-end',
marginRight:7,
marginBottom:7,
width:WIDTH,
height:HEIGHT-10,
borderRadius:2,
backgroundColor:'#fff',
elevation:5,
shadowColor:'#000000',
shadowOffset:{width:2,height:3},
shadowOpacity:0.5},

onPress:function onPress(){
_constants.Tracker.trackScreenView("Shift Detail");
_reactNativeRouterFlux.Actions.ShiftDetails({
showDetails:true,
shiftDetails:_extends({},data),
shiftId:data.shiftId,
marketId:data.marketId,
isFromPhoneTree:data.isFromPhoneTree,
clockOutDate:data.clockInDate,
clockInDate:data.clockOutDate,
addressJson:data.addressJson,
locationCoor:data.locationCoor,
zipCode:data.zipCode,
worker:data.worker,
workersInvited:data.workersInvited,
workersAssigned:data.workersAssigned,
status:data.status,
positionName:data.position,
brandName:data.brand,
workplaceName:data.workplace,
arrayShift:arrayShift,
payment:data.hourlyPayment});

}},


_react2.default.createElement(_reactNative.View,{style:_extends({},
localStyles.flexRow,{
paddingTop:4,
paddingLeft:8,
paddingRight:8,
marginBottom:2,
justifyContent:'space-between'})},


_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_nativeBase.Text,{style:_extends({},
localStyles.h2BlackLato,{
fontWeight:"700"})},
data.position),
_react2.default.createElement(_nativeBase.Text,{numberOfLines:1,ellipsizeMode:'tail',
style:_extends({},localStyles.h4BlackLatoBlack)},data.brand,' | ',data.workplace),
_react2.default.createElement(_nativeBase.Text,{
style:_extends({},localStyles.h4BlackLato)},proper(data.status),' ')),

renderIcon()),

_react2.default.createElement(_reactNative.View,{style:_extends({},
localStyles.flexRow,{
paddingLeft:8,
paddingRight:8,
marginBottom:4,
justifyContent:'space-between'})},

_react2.default.createElement(_reactNative.View,{style:_extends({},localStyles.flexRow)},
_react2.default.createElement(_reactNative.View,{
style:{marginRight:8}},renderData(start.format("h:mm"),start.format("a"))),
_react2.default.createElement(_reactNative.View,null,renderData(end.format("h:mm"),end.format("a")))),

_react2.default.createElement(_reactNative.View,{style:_extends({},localStyles.flexRow)},
_react2.default.createElement(_reactNative.View,{style:_extends({},
localStyles.flexCol,{
marginRight:5,
justifyContent:"center",
alignItems:"center"})},

_react2.default.createElement(_nativeBase.Text,{style:localStyles.h5GrayLato},'Estimated'),
_react2.default.createElement(_nativeBase.Text,{style:localStyles.h5GrayLato},'Earnings:')),


data.hourlyPayment===0?renderData("$00",".00"):
renderData("$"+data.hourlyPayment.toString().split('.')[0],"."+data.hourlyPayment.toString().split('.')[1]))))):









_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',alignSelf:'flex-end',marginLeft:45*Width}},
_react2.default.createElement(_reactNative.View,{style:{
width:8*Width,
backgroundColor:iconColor,
height:HEIGHT-10,
borderTopLeftRadius:2,
borderBottomLeftRadius:2}}),

_react2.default.createElement(_reactNative.TouchableOpacity,{
style:{
flex:1,
alignSelf:'flex-end',
marginRight:7,
marginBottom:7,
width:WIDTH,
height:HEIGHT-10,
borderRadius:2,
backgroundColor:'#fff',
elevation:5,
shadowColor:'#000000',
shadowOffset:{width:2,height:3},
shadowOpacity:0.5},

onPress:function onPress(){
_constants.Tracker.trackScreenView("Shift Detail");
_reactNativeRouterFlux.Actions.ShiftDetails({
showDetails:true,
shiftDetails:_extends({},data),
shiftId:data.shiftId,
marketId:data.marketId,
isFromPhoneTree:data.isFromPhoneTree,
clockOutDate:data.clockInDate,
clockInDate:data.clockOutDate,
addressJson:data.addressJson,
locationCoor:data.locationCoor,
zipCode:data.zipCode,
worker:data.worker,
workersInvited:data.workersInvited,
workersAssigned:data.workersAssigned,
status:data.status,
positionName:data.position,
brandName:data.brand,
workplaceName:data.workplace,
arrayShift:arrayShift,
payment:data.hourlyPayment});

}},

_react2.default.createElement(_reactNative.View,{style:_extends({},
localStyles.flexRow,{
paddingTop:4,
paddingLeft:8,
paddingRight:8,
marginBottom:2,
justifyContent:'space-between'})},


_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_nativeBase.Text,{style:_extends({},
localStyles.h2BlackLato,{
fontWeight:"700"})},
data.position),
_react2.default.createElement(_nativeBase.Text,{numberOfLines:1,ellipsizeMode:'tail',
style:_extends({},localStyles.h4BlackLatoBlack)},data.brand,' | ',data.workplace),
_react2.default.createElement(_nativeBase.Text,{
style:_extends({},localStyles.h4BlackLato)},proper(data.status),' ')),

renderIcon()),

_react2.default.createElement(_reactNative.View,{style:_extends({},
localStyles.flexRow,{
paddingLeft:8,
paddingRight:8,
marginBottom:4,
justifyContent:'space-between'})},

_react2.default.createElement(_reactNative.View,{style:_extends({},localStyles.flexRow)},
_react2.default.createElement(_reactNative.View,{
style:{marginRight:8}},renderData(start.format("h:mm"),start.format("a"))),
_react2.default.createElement(_reactNative.View,null,renderData(end.format("h:mm"),end.format("a")))),

_react2.default.createElement(_reactNative.View,{style:_extends({},localStyles.flexRow)},
_react2.default.createElement(_reactNative.View,{style:_extends({},
localStyles.flexCol,{
marginRight:5,
justifyContent:"center",
alignItems:"center"})},

_react2.default.createElement(_nativeBase.Text,{style:localStyles.h5GrayLato},'Estimated'),
_react2.default.createElement(_nativeBase.Text,{style:localStyles.h5GrayLato},'Earnings:')),


data.hourlyPayment===0?renderData("$00",".00"):
renderData("$"+data.hourlyPayment.toString().split('.')[0],"."+data.hourlyPayment.toString().split('.')[1])))))));










})));



}

}}]);return ScheduleCard;}(_react.Component);ScheduleCard.propTypes={data:_react2.default.PropTypes.object};exports.default=


ScheduleCard;

var localStyles={
flexCol:{
display:"flex",
flexDirection:"column"},

flexRow:{
display:"flex",
flexDirection:"row"},

h1GrayLato:{
fontFamily:'Lato-Regular',
fontWeight:'bold',
fontSize:24,
color:'#999999'},

h2BlackLato:{
fontFamily:'Lato-Regular',
fontSize:20,
color:'#4A4A4A'},

h3BlackLato:{
fontFamily:'Lato-Regular',
fontSize:14,
color:'#4A4A4A'},

h3GrayLato:{
fontFamily:'Lato-Regular',
fontSize:14,
color:'#999999'},

h4BlackLatoBlack:{

fontSize:12,
color:'#4A4A4A',
fontWeight:'bold'},

h4BlackLato:{
fontFamily:'Lato-Regular',
fontSize:12,
color:'#4A4A4A'},

h5BlackLato:{
fontFamily:'Lato-Regular',
fontSize:9,
color:'#4A4A4A'},

h5GrayLato:{
fontFamily:'Lato-Regular',
fontSize:9,
color:'#999999'},

iconStyle:{
backgroundColor:'transparent',
height:24,
width:24,
marginRight:10*Width}};