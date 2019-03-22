Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');





var _CalendarStyle=require('./Calendar.style.js');var _CalendarStyle2=_interopRequireDefault(_CalendarStyle);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

CalendarDay=function(_Component){_inherits(CalendarDay,_Component);
















































function CalendarDay(props){_classCallCheck(this,CalendarDay);var _this=_possibleConstructorReturn(this,(CalendarDay.__proto__||Object.getPrototypeOf(CalendarDay)).call(this,
props));
_this.animValue=new _reactNative.Animated.Value(0);return _this;
}_createClass(CalendarDay,[{key:'componentDidMount',value:function componentDidMount()


{
if(this.props.selected){
this.animate(1);
}
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(



nextProps){
if(this.props.selected!==nextProps.selected){
nextProps.selected?this.animate(1):this.animate(0);
}
}},{key:'animate',value:function animate(



toValue){
_reactNative.Animated.timing(
this.animValue,
{
toValue:toValue,
duration:this.props.selectionAnimation.duration,
easing:_reactNative.Easing.linear}).

start();
}},{key:'render',value:function render()

{
var animValue=void 0;
var animObject=void 0;



if(this.props.selection==='background'){
animValue=this.animValue.interpolate({
inputRange:[0,1],
outputRange:[this.props.calendarColor,this.props.highlightColor]});

animObject={backgroundColor:animValue};

}else if(this.props.selection==='border'){
animValue=this.animValue.interpolate({
inputRange:[0,1],
outputRange:[0,this.props.selectionAnimation.borderWidth]});

animObject={borderColor:this.props.borderHighlightColor,borderWidth:animValue};

}else if(this.props.selection==='bottomBorder'){
animValue=this.animValue.interpolate({
inputRange:[0,1],
outputRange:[this.props.calendarColor,this.props.borderBottomColor]});

animObject={
borderBottomColor:animValue,
borderBottomWidth:this.props.selectionAnimation.borderBottomWidth,
paddingBottom:this.props.selectionAnimation.borderBottomWidth};


}else{
throw new Error('CalendarDay Error! Type of animation is incorrect!');
}

var dateNameStyle=[_CalendarStyle2.default.dateName,this.props.dateNameStyle];
var dateNumberStyle=[_CalendarStyle2.default.dateNumber,this.props.dateNumberStyle];
if(this.props.date.isoWeekday()===6||this.props.date.isoWeekday()===7){
dateNameStyle=[_CalendarStyle2.default.weekendDateName,this.props.weekendDateNameStyle];
dateNumberStyle=[_CalendarStyle2.default.weekendDateNumber,this.props.weekendDateNumberStyle];
}

var style=this.props.selection!=='bottomBorder'?{borderRadius:43/2}:
{borderRadius:0,borderWidth:0};
return(
_react2.default.createElement(_reactNative.Animated.View,{style:[
_CalendarStyle2.default.dateContainer,
animObject,
style]},

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:this.props.onDateSelected.bind(this,this.props.date)},
_react2.default.createElement(_reactNative.Text,{style:dateNameStyle},this.props.date.format('ddd').toUpperCase()),
_react2.default.createElement(_reactNative.Text,{style:dateNumberStyle},this.props.date.date()))));



}}]);return CalendarDay;}(_react.Component);CalendarDay.propTypes={date:_react2.default.PropTypes.object.isRequired,onDateSelected:_react2.default.PropTypes.func.isRequired,selected:_react2.default.PropTypes.bool.isRequired,calendarColor:_react2.default.PropTypes.string,highlightColor:_react2.default.PropTypes.string,borderHighlightColor:_react2.default.PropTypes.string,borderBottomColor:_react2.default.PropTypes.string,dateNameStyle:_react2.default.PropTypes.any,dateNumberStyle:_react2.default.PropTypes.any,weekendDateNameStyle:_react2.default.PropTypes.any,weekendDateNumberStyle:_react2.default.PropTypes.any,date:_react2.default.PropTypes.object.isRequired,onDateSelected:_react2.default.PropTypes.func.isRequired,selected:_react2.default.PropTypes.bool.isRequired,calendarColor:_react2.default.PropTypes.string,highlightColor:_react2.default.PropTypes.string,borderHighlightColor:_react2.default.PropTypes.string,borderBottomColor:_react2.default.PropTypes.string,dateNameStyle:_react2.default.PropTypes.any,dateNumberStyle:_react2.default.PropTypes.any,weekendDateNameStyle:_react2.default.PropTypes.any,weekendDateNumberStyle:_react2.default.PropTypes.any,selection:_react2.default.PropTypes.string,selectionAnimation:_react2.default.PropTypes.object,selection:_react2.default.PropTypes.string,selectionAnimation:_react2.default.PropTypes.object};CalendarDay.defaultProps={selection:'border',selectionAnimation:{duration:0,borderBottomWidth:4,borderBottomColor:'#000',borderWidth:1},borderHighlightColor:'#000'};exports.default=CalendarDay;