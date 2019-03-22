Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');







var _TopBar=require('./TopBar');var _TopBar2=_interopRequireDefault(_TopBar);




var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var


ShiftBumps=function(_Component){_inherits(ShiftBumps,_Component);

function ShiftBumps(props)
{_classCallCheck(this,ShiftBumps);var _this=_possibleConstructorReturn(this,(ShiftBumps.__proto__||Object.getPrototypeOf(ShiftBumps)).call(this,
props));
_this.state={
text1:true,
text2:false,
data:[
{startDate:'14-May-2018',endDate:'21-May-2018',assignee:'Short Order Cook',workingDays:[0,0,3,4,5,6,7],fromTime:'11:00 AM',toTime:'7:00 PM',biding:'1d 4h',work:'Catering'},
{startDate:'14-May-2018',endDate:'21-May-2018',assignee:'General Server, Steward',workingDays:[1,2,0,0,5,6,7],fromTime:'',toTime:'',biding:'1d 4h',work:'Stewarding'},
{startDate:'14-May-2018',endDate:'21-May-2018',assignee:'First Order Cook',workingDays:[1,2,3,4,5,0,0],fromTime:'1:00 AM',toTime:'7:00 PM',biding:'1d 4h',work:'Culinary'},
{startDate:'14-May-2018',endDate:'21-May-2018',assignee:'Cook',workingDays:[1,2,3,4,5,0,0],fromTime:'10:00 AM',toTime:'7:00 PM',biding:'1d 4h',work:'Operations'},
{startDate:'14-May-2018',endDate:'21-May-2018',assignee:'Cook',workingDays:[1,2,3,4,5,0,0],fromTime:'10:00 AM',toTime:'7:00 PM',biding:'1d 4h',work:'Operations'},
{startDate:'14-May-2018',endDate:'21-May-2018',assignee:'Cook',workingDays:[1,2,3,4,5,0,0],fromTime:'10:00 AM',toTime:'7:00 PM',biding:'1d 4h',work:'Operations'}]};


_this.onText=_this.onText.bind(_this);return _this;
}_createClass(ShiftBumps,[{key:'onText',value:function onText(

text){
if(text==="text1"){
this.setState({text1:true,text2:false});
}else
{
this.setState({text1:false,text2:true});
}
}},{key:'weekViews',value:function weekViews(

arr)
{
return(
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
arr.map(function(value){return _react2.default.createElement(_reactNative.View,{style:[styles.roundView,value&&styles.fillRoundView]});})));

}},{key:'renderCards',value:function renderCards(

obj){
var fromTime=obj.fromTime.split(" ");
var toTime=obj.toTime.split(" ");
var mon=(0,_moment2.default)(obj.startDate).format("MMM");

return(
_react2.default.createElement(_reactNative.View,{style:styles.backGround},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.headerTitle},obj.assignee)),

_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
_react2.default.createElement(_reactNative.View,{style:{alignItems:'center',marginRight:5}},
_react2.default.createElement(_reactNative.Text,{style:styles.dateTitle},(0,_moment2.default)(obj.startDate).format("DD")),
_react2.default.createElement(_reactNative.Text,{style:styles.monthTitle},(0,_moment2.default)(obj.startDate).format("MMM").toUpperCase())),

_react2.default.createElement(_reactNative.View,null,
this.weekViews(obj.workingDays),
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
_react2.default.createElement(_reactNative.Text,{style:styles.weekText},'S'),
_react2.default.createElement(_reactNative.Text,{style:styles.weekText},'M'),
_react2.default.createElement(_reactNative.Text,{style:styles.weekText},'T'),
_react2.default.createElement(_reactNative.Text,{style:styles.weekText},'W'),
_react2.default.createElement(_reactNative.Text,{style:styles.weekText},'T'),
_react2.default.createElement(_reactNative.Text,{style:styles.weekText},'F'),
_react2.default.createElement(_reactNative.Text,{style:styles.weekText},'S'))),


_react2.default.createElement(_reactNative.View,{style:{alignItems:'center',marginLeft:5}},
_react2.default.createElement(_reactNative.Text,{style:styles.dateTitle},(0,_moment2.default)(obj.endDate).format("DD")),
_react2.default.createElement(_reactNative.Text,{style:styles.monthTitle},(0,_moment2.default)(obj.startDate).format("MMM").toUpperCase()))),



fromTime.length==2?
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',marginTop:4,justifyContent:'space-between'}},
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',marginRight:15}},
_react2.default.createElement(_reactNative.Text,{style:styles.timeTitle},fromTime[0]),
_react2.default.createElement(_reactNative.Text,{style:{fontSize:10,color:"rgb(86,86,86)"}},fromTime[1])),

_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
_react2.default.createElement(_reactNative.Text,{style:styles.timeTitle},toTime[0]),
_react2.default.createElement(_reactNative.Text,{style:{fontSize:10,color:"rgb(86,86,86)"}},toTime[1]))):



_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',marginTop:4,justifyContent:'space-between'}},
_react2.default.createElement(_reactNative.Text,{style:styles.timeTitle},'Click for Shift Times')),


_react2.default.createElement(_reactNative.View,{style:[styles.bindingEnds,{paddingLeft:40,paddingRight:40,paddingTop:2}]},
_react2.default.createElement(_reactNative.Text,{style:styles.bindingEndsText},obj.work),
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'#fff',height:7,width:7,borderRadius:3.5,alignSelf:'center',marginLeft:5,marginRight:5}}),
_react2.default.createElement(_reactNative.Text,{style:styles.bindingEndsText},'Bindding Ends ',obj.biding))));



}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,backgroundColor:'#fff'}},
_react2.default.createElement(_TopBar2.default,{label:["Available Bumps","Bump Status"],labelColor:[this.state.text1,this.state.text2],onText:this.onText}),
_react2.default.createElement(_reactNative.ScrollView,null,

this.state.data.map(function(value){return _this2.renderCards(value);}))));




}}]);return ShiftBumps;}(_react.Component);exports.default=


ShiftBumps;

var styles=_reactNative.StyleSheet.create({
backGround:{
width:width-20,
marginRight:10,
marginLeft:10,
marginTop:5,
alignItems:'center',
backgroundColor:'#fff',
shadowColor:'#000',
shadowOffset:{width:1,height:1},
shadowOpacity:0.5},

headerTitle:{

fontSize:20,
fontWeight:'600',
textAlign:'center',
opacity:0.85},

dateTitle:{
marginBottom:-2,
color:"rgb(153,153,153)",
fontSize:18,
fontWeight:'bold',
textAlign:'center'},

monthTitle:{
color:"rgb(74,74,74)",
fontSize:12,
textAlign:'center'},

roundView:{
borderColor:"#000",
borderWidth:1,
width:12,
height:12,
margin:3,
marginTop:5,
borderRadius:50},

fillRoundView:{
backgroundColor:"#000",
opacity:0.7},

weekText:{
fontSize:11,
marginRight:4.9,
marginLeft:4.9,
color:"rgb(86,86,86)"},

timeTitle:{
color:"rgb(74,74,74)",
fontSize:20},

bindingEnds:{

backgroundColor:"rgb(232,49,43)",
borderRadius:2,
height:19,
margin:5,
justifyContent:'space-between',
flexDirection:'row'},

bindingEndsText:{
color:'#fff',
fontSize:12,
fontWeight:'800',
textAlign:'center'}});