Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);



var _reactNative=require('react-native');








var _reactNativeRouterFlux=require('react-native-router-flux');








var _styles=require('../styles');var _styles2=_interopRequireDefault(_styles);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var















CustomNav=function(_Component){_inherits(CustomNav,_Component);
function CustomNav(props){_classCallCheck(this,CustomNav);return _possibleConstructorReturn(this,(CustomNav.__proto__||Object.getPrototypeOf(CustomNav)).call(this,
props));
}_createClass(CustomNav,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.View,{style:styles.headerContainer},

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.home({});},style:{flex:1,width:width/3}},
_react2.default.createElement(_reactNative.Text,{style:{color:'#0079FE',fontWeight:'600',fontSize:15}},this.props.rightBtn)),


_react2.default.createElement(_reactNative.View,{style:{flex:1,width:width/3}},
_react2.default.createElement(_reactNative.Text,{style:{color:'#0022A1',fontWeight:'600',fontSize:15,alignSelf:'center'}},this.props.title)),


_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.home({});},style:{flex:1,justifyContent:'flex-end',width:width/3}},
_react2.default.createElement(_reactNative.Text,{style:{color:'#0079FE',fontWeight:'600',fontSize:15,textAlign:'right'}},this.props.leftBtn))));



}}]);return CustomNav;}(_react.Component);exports.default=CustomNav;



var styles=_reactNative.StyleSheet.create({
headerContainer:{
height:44,
width:width,
flexDirection:'row',
backgroundColor:'#F7F7F7',
justifyContent:'space-between',
alignItems:'center',
borderBottomColor:'#B8B8B8',
borderBottomWidth:1,
paddingHorizontal:15}});