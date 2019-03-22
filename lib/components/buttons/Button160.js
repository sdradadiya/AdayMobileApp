Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _nativeBase=require('native-base');
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=






_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

Button160=function(_React$Component){_inherits(Button160,_React$Component);
function Button160(props){_classCallCheck(this,Button160);var _this=_possibleConstructorReturn(this,(Button160.__proto__||Object.getPrototypeOf(Button160)).call(this,
props));
_this.handlePress=_this.handlePress.bind(_this);return _this;
}_createClass(Button160,[{key:'handlePress',value:function handlePress()





{
console.log(this.props);
}},{key:'render',value:function render()

{


return(
_react2.default.createElement(_reactNative.TouchableOpacity,{style:{
display:'flex',
backgroundColor:'#002DB0',
height:40,
width:width/2,
borderRadius:2,
alignSelf:'center',
shadowRadius:2,
shadowColor:'#000000',
shadowOffset:{
width:1,
height:2},

shadowOpacity:0.5,
marginTop:20,
marginBottom:20},
onPress:this.handlePress},

_react2.default.createElement(_reactNative.View,{style:{
flex:1,
justifyContent:'center',
alignItems:'center'}},

_react2.default.createElement(_reactNative.Text,{style:{
fontSize:16,
fontFamily:'Lato-Regular',
color:'white',
fontWeight:'bold'}},' ',
this.props.title,' '))));



}}]);return Button160;}(_react2.default.Component);exports.default=Button160;