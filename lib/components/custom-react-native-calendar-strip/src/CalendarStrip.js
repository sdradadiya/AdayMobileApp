Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');







var _CalendarDay=require('./CalendarDay');var _CalendarDay2=_interopRequireDefault(_CalendarDay);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _CalendarStyle=require('./Calendar.style.js');var _CalendarStyle2=_interopRequireDefault(_CalendarStyle);

var _reactNativeSwipeGestures=require('react-native-swipe-gestures');var _reactNativeSwipeGestures2=_interopRequireDefault(_reactNativeSwipeGestures);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var arr=[];
for(var i=0;i<7;i++){
arr.push(i);
}var




CalendarStrip=function(_Component){_inherits(CalendarStrip,_Component);



















































function CalendarStrip(props){_classCallCheck(this,CalendarStrip);var _this=_possibleConstructorReturn(this,(CalendarStrip.__proto__||Object.getPrototypeOf(CalendarStrip)).call(this,
props));_this.











































































































































































weeklyHours=function(){
var h=_this.props.hours;
var newDate=(0,_moment2.default)(_this.props.hoursStart).format("YYYY-MM-DD");
var end=null;
if(h[newDate]){
end=h[newDate].booked+"h "+h[newDate].pending+"h "+h[newDate].open+"h";
}




if(end){
return(
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',alignItems:'space-between',justifyContent:'center'}},
_react2.default.createElement(_reactNative.Text,{style:[_CalendarStyle2.default.calendarHeader,_this.props.calendarHeaderStyle,{color:'#00A863',fontWeight:'900',margin:5}]},
h[newDate].booked+"h "),

_react2.default.createElement(_reactNative.Text,{style:[_CalendarStyle2.default.calendarHeader,_this.props.calendarHeaderStyle,{color:'#FFAD33',fontWeight:'900',marginRight:5}]},
h[newDate].pending+"h "),

_react2.default.createElement(_reactNative.Text,{style:[_CalendarStyle2.default.calendarHeader,_this.props.calendarHeaderStyle,{color:'#E33820',fontWeight:'900',marginRight:5}]},
h[newDate].open+"h ")));



}
};if(props.locale){if(props.locale.name&&props.locale.config){_moment2.default.locale(props.locale.name,props.locale.config);}else{throw new Error('Locale prop is not in the correct format. \b Locale has to be in form of object, with params NAME and CONFIG!');}}var startingDate=_this.setLocale((0,_moment2.default)(_this.props.startingDate));var selectedDate=_this.setLocale((0,_moment2.default)(_this.props.selectedDate));_this.state={startingDate:startingDate,selectedDate:selectedDate};_this.resetAnimation();_this.componentDidMount=_this.componentDidMount.bind(_this);_this.componentWillUpdate=_this.componentWillUpdate.bind(_this);_this.getDatesForWeek=_this.getDatesForWeek.bind(_this);_this.getPreviousWeek=_this.getPreviousWeek.bind(_this);_this.getNextWeek=_this.getNextWeek.bind(_this);_this.onDateSelected=_this.onDateSelected.bind(_this);_this.isDateSelected=_this.isDateSelected.bind(_this);_this.formatCalendarHeader=_this.formatCalendarHeader.bind(_this);_this.animate=_this.animate.bind(_this);_this.resetAnimation=_this.resetAnimation.bind(_this);return _this;}_createClass(CalendarStrip,[{key:'componentDidMount',value:function componentDidMount(){this.animate();}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){if(nextProps.selectedDate!==this.props.selectedDate){var selectedDate=this.setLocale((0,_moment2.default)(nextProps.selectedDate));this.setState({selectedDate:selectedDate});}}},{key:'componentWillUpdate',value:function componentWillUpdate(nextProps,nextState){if(nextState.selectedDate===this.state.selectedDate){this.resetAnimation();this.animate();}}},{key:'setLocale',value:function setLocale(momentInstance){if(this.props.locale){momentInstance.locale(this.props.locale.name);}return momentInstance;}},{key:'getPreviousWeek',value:function getPreviousWeek(){var previousWeekStartDate=(0,_moment2.default)(this.props.startingDate).subtract(1,'w');this.setState({startingDate:previousWeekStartDate});if(this.props.onWeekChanged){this.props.onWeekChanged(previousWeekStartDate.clone().startOf(this.props.useIsoWeekday?'isoweek':'week'));}var selectedDate=this.setLocale((0,_moment2.default)(this.props.startingDate).subtract(1,'w'));this.setState({selectedDate:selectedDate});this.props.renderFilter(selectedDate);}},{key:'getNextWeek',value:function getNextWeek(){var nextWeekStartDate=(0,_moment2.default)(this.props.startingDate).add(1,'w');this.setState({startingDate:nextWeekStartDate});if(this.props.onWeekChanged){this.props.onWeekChanged(nextWeekStartDate.clone().startOf(this.props.useIsoWeekday?'isoweek':'week'));}var selectedDate=this.setLocale((0,_moment2.default)(this.props.startingDate).add(1,'w'));this.setState({selectedDate:selectedDate});this.props.renderFilter(selectedDate);}},{key:'getDatesForWeek',value:function getDatesForWeek(){var _this2=this;var me=this;var dates=[];var startDate=(0,_moment2.default)(this.state.startingDate);arr.forEach(function(item,index){var date=void 0;if(me.props.useIsoWeekday){date=me.setLocale((0,_moment2.default)(startDate.isoWeekday(index+1)));}else{if(me.props.keepSelectedDateInCenter){var k=0;date=me.setLocale((0,_moment2.default)(me.state.selectedDate).add(k+index,'days'));if(index===0)_this2.setState;}else date=me.setLocale((0,_moment2.default)(startDate).add(index,'days'));}dates.push(date);});return dates;}},{key:'onDateSelected',value:function onDateSelected(date){if(this.props.onDateSelected){this.props.onDateSelected(date);}this.setState({selectedDate:this.props.selectedDate});}},{key:'isDateSelected',value:function isDateSelected(date){return date.isSame(this.state.selectedDate,'day');}},{key:'resetAnimation',value:function resetAnimation(){var _this3=this;this.animatedValue=[];arr.forEach(function(value){_this3.animatedValue[value]=new _reactNative.Animated.Value(0);});}},{key:'animate',value:function animate(){var _this4=this;if(this.props.calendarAnimation){var animations=arr.map(function(item){return _reactNative.Animated.timing(_this4.animatedValue[item],{toValue:1,duration:_this4.props.calendarAnimation.duration,easing:_reactNative.Easing.linear});});if(this.props.calendarAnimation.type.toLowerCase()==='sequence'){_reactNative.Animated.sequence(animations).start();}else{if(this.props.calendarAnimation.type.toLowerCase()==='parallel'){_reactNative.Animated.parallel(animations).start();}else{throw new Error('CalendarStrip Error! Type of animation is incorrect!');}}}}},{key:'formatCalendarHeader',value:function formatCalendarHeader()

{
var firstDay=this.getDatesForWeek()[0];
var lastDay=this.getDatesForWeek()[this.getDatesForWeek().length-1];
var monthFormatting='';

var start='Week Starting ';


if((this.props.calendarHeaderFormat.match(/Mo/g)||[]).length>0){
monthFormatting='Mo';
}else{
if((this.props.calendarHeaderFormat.match(/M/g)||[]).length>0){
for(var _i=(this.props.calendarHeaderFormat.match(/M/g)||[]).length;_i>0;_i--){
monthFormatting+='M';
}
}
}

if(firstDay.month()===lastDay.month()){
return start+" "+firstDay.format("MMMM D")+": ";
}

if(firstDay.year()!==lastDay.year()){
return start+' '+firstDay.format("MMMM D")+' / '+lastDay.format(this.props.calendarHeaderFormat)+' ": "';
}
return start+" "+firstDay.format("MMMM D")+": ";

}},{key:'onSwipeLeft',value:function onSwipeLeft(

gestureState){
this.getNextWeek();
}},{key:'onSwipeRight',value:function onSwipeRight(

gestureState){
this.getPreviousWeek();
}},{key:'render',value:function render()

{var _this5=this;
var opacityAnim=1;

var config={
velocityThreshold:0.3,
directionalOffsetThreshold:80};


var datesRender=this.getDatesForWeek().map(function(date,index){
if(_this5.props.calendarAnimation){
opacityAnim=_this5.animatedValue[index];
}
return(
_react2.default.createElement(_reactNative.Animated.View,{key:date,style:{opacity:opacityAnim,flex:1,alignItems:'center'}},
_react2.default.createElement(_CalendarDay2.default,{
date:date,
key:date,
selected:_this5.isDateSelected(date),
onDateSelected:_this5.onDateSelected,
calendarColor:_this5.props.calendarColor,
highlightColor:_this5.props.highlightColor,
dateNameStyle:_this5.props.dateNameStyle,
dateNumberStyle:_this5.props.dateNumberStyle,
weekendDateNameStyle:_this5.props.weekendDateNameStyle,
weekendDateNumberStyle:_this5.props.weekendDateNumberStyle,
highlightDateNameStyle:_this5.props.highlightDateNameStyle,
highlightDateNumberStyle:_this5.props.highlightDateNumberStyle,
styleWeekend:_this5.props.styleWeekend,
selection:_this5.props.selection,
selectionAnimation:_this5.props.selectionAnimation,
borderHighlightColor:_this5.props.borderHighlightColor,
borderBottomColor:_this5.props.borderBottomColor})));



});
return(
_react2.default.createElement(_reactNativeSwipeGestures2.default,{
onSwipeLeft:function onSwipeLeft(state){return _this5.onSwipeLeft(state);},
onSwipeRight:function onSwipeRight(state){return _this5.onSwipeRight(state);},
config:config,
style:[_CalendarStyle2.default.calendarContainer,{backgroundColor:this.props.calendarColor},this.props.style]},

_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',alignItems:'center',justifyContent:'center'}},
_react2.default.createElement(_reactNative.Text,{style:[_CalendarStyle2.default.calendarHeader,this.props.calendarHeaderStyle,{fontWeight:'900'}]},
this.formatCalendarHeader()),


this.weeklyHours()),


_react2.default.createElement(_reactNative.View,{style:_CalendarStyle2.default.datesStrip},
_react2.default.createElement(_reactNative.View,{style:_CalendarStyle2.default.calendarDates},
datesRender))));




}}]);return CalendarStrip;}(_react.Component);CalendarStrip.propTypes={style:_react2.default.PropTypes.any,calendarColor:_react2.default.PropTypes.string,highlightColor:_react2.default.PropTypes.string,borderHighlightColor:_react2.default.PropTypes.string,startingDate:_react2.default.PropTypes.any,selectedDate:_react2.default.PropTypes.any,onDateSelected:_react2.default.PropTypes.func,onWeekChanged:_react2.default.PropTypes.func,useIsoWeekday:_react2.default.PropTypes.bool,iconLeft:_react2.default.PropTypes.any,iconRight:_react2.default.PropTypes.any,iconStyle:_react2.default.PropTypes.any,iconLeftStyle:_react2.default.PropTypes.any,iconRightStyle:_react2.default.PropTypes.any,iconContainer:_react2.default.PropTypes.any,calendarHeaderStyle:_react2.default.PropTypes.any,calendarHeaderFormat:_react2.default.PropTypes.string,hours:_react2.default.PropTypes.any,calendarAnimation:_react2.default.PropTypes.object,selection:_react2.default.PropTypes.string,selectionAnimation:_react2.default.PropTypes.object,dateNameStyle:_react2.default.PropTypes.any,dateNumberStyle:_react2.default.PropTypes.any,weekendDateNameStyle:_react2.default.PropTypes.any,weekendDateNumberStyle:_react2.default.PropTypes.any,highlightDateNameStyle:_react2.default.PropTypes.any,highlightDateNumberStyle:_react2.default.PropTypes.any,styleWeekend:_react2.default.PropTypes.bool,locale:_react2.default.PropTypes.object,borderBottomColor:_react2.default.PropTypes.string,keepSelectedDateInCenter:_react2.default.PropTypes.bool};CalendarStrip.defaultProps={startingDate:(0,_moment2.default)(),useIsoWeekday:true,iconLeft:require('../../assets/left-arrow-white.png'),iconRight:require('../../assets/right-arrow-white.png'),calendarHeaderFormat:'MMMM YYYY'};exports.default=CalendarStrip;