Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

ShiftDecision=function(_Component){_inherits(ShiftDecision,_Component);
function ShiftDecision(props){_classCallCheck(this,ShiftDecision);var _this=_possibleConstructorReturn(this,(ShiftDecision.__proto__||Object.getPrototypeOf(ShiftDecision)).call(this,
props));
_this.state={
shiftDecisionTime:[0,0,0,0,0,0]};

_this.updateCountDown=_this.updateCountDown.bind(_this);
_index.Tracker.trackScreenView("Shift Decision");return _this;

}_createClass(ShiftDecision,[{key:'updateCountDown',value:function updateCountDown(

countDown){var _this2=this;
var timer=setInterval(function(){
var now=new Date().getTime();
var distance=countDown-now;
var hours=Math.floor(distance%(1000*60*60*24)/(1000*60*60));
var minutes=Math.floor(distance%(1000*60*60)/(1000*60));
var seconds=Math.floor(distance%(1000*60)/1000);
hours=hours<10?('0'+hours).split(""):hours.toString().split("");
minutes=minutes<10?('0'+minutes).split(""):minutes.toString().split("");
seconds=seconds<10?('0'+seconds).split(""):seconds.toString().split("");
var shiftDecisionTime=_this2.state.shiftDecisionTime;
shiftDecisionTime.length=0;
shiftDecisionTime.push(hours[0],hours[1],minutes[0],minutes[1],seconds[0],seconds[1]);
_this2.setState({shiftDecisionTime:shiftDecisionTime});
if(distance<0){
clearInterval(timer);
}
},1000);
}},{key:'componentDidMount',value:function componentDidMount()

{
var countDownDate=new Date(this.props.countDownDate).getTime();
this.updateCountDown(countDownDate);
}},{key:'render',value:function render()

{
var shiftDecisionTime=this.state.shiftDecisionTime;
return(
_react2.default.createElement(_reactNative.View,{style:styles.containerStyle},
_react2.default.createElement(_reactNative.View,{style:{marginHorizontal:10,justifyContent:'center'}},
_react2.default.createElement(_reactNative.Text,{style:{color:'white'}},'Shift'),
_react2.default.createElement(_reactNative.Text,{style:{color:'white'}},'Decision')),

_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
_react2.default.createElement(_reactNative.View,{style:{justifyContent:'center'}},
_react2.default.createElement(_reactNative.Text,{style:{color:'white'}},'HOURS'),
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',justifyContent:'center'}},
_react2.default.createElement(_reactNative.View,{style:styles.timeElement},
_react2.default.createElement(_reactNative.Text,{style:styles.timeText},shiftDecisionTime[0])),

_react2.default.createElement(_reactNative.View,{style:styles.timeElement},
_react2.default.createElement(_reactNative.Text,{style:styles.timeText},shiftDecisionTime[1])))),



_react2.default.createElement(_reactNative.View,{style:{justifyContent:'center',marginLeft:6}},
_react2.default.createElement(_reactNative.Text,{style:{color:'white'}},'MINUTES'),
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',justifyContent:'center'}},
_react2.default.createElement(_reactNative.View,{style:styles.timeElement},
_react2.default.createElement(_reactNative.Text,{style:styles.timeText},shiftDecisionTime[2])),

_react2.default.createElement(_reactNative.View,{style:styles.timeElement},
_react2.default.createElement(_reactNative.Text,{style:styles.timeText},shiftDecisionTime[3])))),



_react2.default.createElement(_reactNative.View,{style:{justifyContent:'flex-end',alignItems:'flex-end',marginRight:1,paddingVertical:4}},
_react2.default.createElement(_reactNative.Text,{style:{color:'white',fontWeight:'bold',fontSize:30}},':')),

_react2.default.createElement(_reactNative.View,{style:{justifyContent:'center'}},
_react2.default.createElement(_reactNative.Text,{style:{color:'white'}},'SECOND'),
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',justifyContent:'center'}},
_react2.default.createElement(_reactNative.View,{style:styles.timeElement},
_react2.default.createElement(_reactNative.Text,{style:styles.timeText},shiftDecisionTime[4])),

_react2.default.createElement(_reactNative.View,{style:styles.timeElement},
_react2.default.createElement(_reactNative.Text,{style:styles.timeText},shiftDecisionTime[5]))))),




_react2.default.createElement(_reactNative.View,{style:{marginLeft:10}},
_react2.default.createElement(_reactNative.View,{style:styles.waitingStyle},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:12,color:'white'}},'WAITING')))));




}}]);return ShiftDecision;}(_react.Component);



var styles={
containerStyle:{
height:60,
backgroundColor:'#999999',
flexDirection:'row'},

timeElement:{
marginHorizontal:2,
height:25,
width:20,
borderRadius:4,
backgroundColor:'white',
justifyContent:'center',
alignItems:'center'},

timeText:{
fontSize:20},

waitingStyle:{
marginTop:10,
paddingHorizontal:10,
paddingVertical:1,
backgroundColor:'#FFAD33',
borderRadius:20}};exports.default=



ShiftDecision;