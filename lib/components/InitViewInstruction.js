Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _reactNative=require('react-native');


var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=



_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

InitViewInstruction=function(_Component){_inherits(InitViewInstruction,_Component);function InitViewInstruction(){_classCallCheck(this,InitViewInstruction);return _possibleConstructorReturn(this,(InitViewInstruction.__proto__||Object.getPrototypeOf(InitViewInstruction)).apply(this,arguments));}_createClass(InitViewInstruction,[{key:'render',value:function render()
{var _this3=this;
var _this=this;
return(
_react2.default.createElement(_reactNative.View,{style:styles.instruction},
_react2.default.createElement(_reactNative.View,{style:{alignSelf:'flex-end',width:50,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'rgb(0, 38, 157)',borderRadius:50,marginRight:9,marginBottom:25}},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:27,height:27},
source:require('./assets/icons/menu.png')})),


_react2.default.createElement(_reactNative.View,{style:{alignSelf:'flex-end'}},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:100,height:100},
source:require('./assets/Arrow.png')})),


_react2.default.createElement(_reactNative.View,{style:{marginBottom:30}},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:22,
textAlign:'center',
fontWeight:'bold',
color:'#fff'}},' Bumps, Vacations & Preferences'),
_react2.default.createElement(_reactNative.View,{style:{borderColor:'#fff',borderWidth:0.5,alignItems:'center',marginBottom:15,marginTop:7}}),
_react2.default.createElement(_reactNative.Text,{style:styles.subTextTitle},'\u2022',' See which shift bumps are available to you'),
_react2.default.createElement(_reactNative.Text,{style:styles.subTextTitle},'\u2022',' Enter, edit and check status of vaction requests'),
_react2.default.createElement(_reactNative.Text,{style:styles.subTextTitle},'\u2022',' Indicate which types of shifts you like most')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:{
borderColor:'#fff',
borderWidth:3,
borderRadius:5},
onPress:function onPress(){return _this3.props.initGotIt();}},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonStyle},'GOT IT'))));



}}]);return InitViewInstruction;}(_react.Component);exports.default=InitViewInstruction;


var styles=_reactNative.StyleSheet.create({
instruction:{
height:height,
width:width,
alignItems:'center',
paddingTop:15,
backgroundColor:'rgba(0,0,0,0.8)',
position:'absolute'},

buttonStyle:{
fontSize:20,
textAlign:'center',
color:'#fff',
marginLeft:80,
marginRight:80,
marginTop:5,
marginBottom:5,
fontWeight:'bold'},

subTextTitle:{
color:'#fff',
fontSize:14}});