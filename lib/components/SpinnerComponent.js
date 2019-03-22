Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');















var _reactNativeRouterFlux=require('react-native-router-flux');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=
_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

SpinnerComponent=function(_Component){_inherits(SpinnerComponent,_Component);
function SpinnerComponent(props){_classCallCheck(this,SpinnerComponent);var _this=_possibleConstructorReturn(this,(SpinnerComponent.__proto__||Object.getPrototypeOf(SpinnerComponent)).call(this,
props));
_this.state={
fadeAnim:new _reactNative.Animated.Value(0)};return _this;

}_createClass(SpinnerComponent,[{key:'componentDidMount',value:function componentDidMount()

{
_reactNative.Animated.timing(
this.state.fadeAnim,{
toValue:1,
duration:100}).

start();
}},{key:'render',value:function render()

{

return(
_react2.default.createElement(_reactNative.Animated.View,{
style:{opacity:this.state.fadeAnim}},

_react2.default.createElement(_reactNative.View,{style:{
flex:1,
height:height,
width:width,
justifyContent:'center',
alignItems:'center',
backgroundColor:"rgba(255,255,255,0.6)",
zIndex:100}},


_react2.default.createElement(_reactNative.ActivityIndicator,{size:'large',color:'#002DB0'}))));





}}]);return SpinnerComponent;}(_react.Component);exports.default=SpinnerComponent;


var styles=_reactNative.StyleSheet.create({});