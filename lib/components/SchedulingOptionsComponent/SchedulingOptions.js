Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeScrollableTabView=require('react-native-scrollable-tab-view');var _reactNativeScrollableTabView2=_interopRequireDefault(_reactNativeScrollableTabView);
var _CustomeTabBar=require('./CustomeTabBar');var _CustomeTabBar2=_interopRequireDefault(_CustomeTabBar);
var _ShiftBumps=require('./ShiftBumps');var _ShiftBumps2=_interopRequireDefault(_ShiftBumps);

var _TimeOffTab=require('./TimeOffTab');var _TimeOffTab2=_interopRequireDefault(_TimeOffTab);
var _Preferences=require('./Preferences');var _Preferences2=_interopRequireDefault(_Preferences);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

SchedulingOptions=function(_Component){_inherits(SchedulingOptions,_Component);

function SchedulingOptions(props){_classCallCheck(this,SchedulingOptions);var _this=_possibleConstructorReturn(this,(SchedulingOptions.__proto__||Object.getPrototypeOf(SchedulingOptions)).call(this,
props));
_this.userId=_this.props.userId;return _this;
}_createClass(SchedulingOptions,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNativeScrollableTabView2.default,{renderTabBar:function renderTabBar(){return _react2.default.createElement(_CustomeTabBar2.default,null);}},
_react2.default.createElement(_ShiftBumps2.default,{tabLabel:'SHIFT BUMPS'}),
_react2.default.createElement(_TimeOffTab2.default,{tabLabel:'TIME OFF',userId:this.userId}),
_react2.default.createElement(_Preferences2.default,{tabLabel:'PREFERENCES'})));



}}]);return SchedulingOptions;}(_react.Component);exports.default=


SchedulingOptions;