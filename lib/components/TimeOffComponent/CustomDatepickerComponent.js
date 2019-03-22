Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeDatepicker=require('react-native-datepicker');var _reactNativeDatepicker2=_interopRequireDefault(_reactNativeDatepicker);
var _Ionicons=require('react-native-vector-icons/Ionicons');var _Ionicons2=_interopRequireDefault(_Ionicons);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var








CustomDatepicker=function(_Component){_inherits(CustomDatepicker,_Component);function CustomDatepicker(){_classCallCheck(this,CustomDatepicker);return _possibleConstructorReturn(this,(CustomDatepicker.__proto__||Object.getPrototypeOf(CustomDatepicker)).apply(this,arguments));}_createClass(CustomDatepicker,[{key:'render',value:function render()
{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},

_react2.default.createElement(_reactNativeDatepicker2.default,{
style:{width:'90%',height:40},
date:this.props.date,
mode:'date',
format:'dddd, MMM D, YYYY',
showIcon:false,
confirmBtnText:'Enter',
cancelBtnText:'Cancel',
placeholder:'Select Date',
onDateChange:function onDateChange(date){_this2.props.onChange(date);},
disabled:this.props.disabled,
customStyles:{
dateText:{
fontSize:18,
color:'#666666',
textAlign:'left'}}})));






}}]);return CustomDatepicker;}(_react.Component);exports.default=CustomDatepicker;