Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');






var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var





Callout=function(_Component){_inherits(Callout,_Component);function Callout(){_classCallCheck(this,Callout);return _possibleConstructorReturn(this,(Callout.__proto__||Object.getPrototypeOf(Callout)).apply(this,arguments));}_createClass(Callout,[{key:'render',value:function render()
{var _this2=this;var _props=




this.props,name=_props.name,image=_props.image,companyType=_props.companyType;
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.View,{style:styles.bubble},
_react2.default.createElement(_reactNative.View,{style:{justifyContent:'center',alignItems:'center'}},
_react2.default.createElement(_reactNative.Text,null,companyType),
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',paddingTop:10}},
_react2.default.createElement(_reactNative.View,{style:{borderWidth:0.5}},
_react2.default.createElement(_reactNative.Image,{
style:styles.image,
source:image})),


_react2.default.createElement(_reactNative.View,{style:{width:110,marginLeft:10}},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:10}},name))),


_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this2.props.onButtonPress(companyType);}},
_react2.default.createElement(_reactNative.View,{style:[styles.shadowStyle,styles.buttonStyle]},
_react2.default.createElement(_reactNative.Text,{style:{color:'white',fontSize:13}},'VIEW OPPORTUNITIES'))))),




_react2.default.createElement(_reactNative.View,{style:styles.arrowBorder}),
_react2.default.createElement(_reactNative.View,{style:styles.arrow})));


}}]);return Callout;}(_react.Component);exports.default=Callout;


var styles=_reactNative.StyleSheet.create({
container:{
flexDirection:'column',
alignSelf:'flex-start'},


bubble:{
flexDirection:'row',
alignSelf:'flex-start',
backgroundColor:'#fff',
borderRadius:6,
borderColor:'#ccc',
borderWidth:0.5,
padding:15,
width:200},


arrow:{
backgroundColor:'transparent',
borderColor:'transparent',
borderTopColor:'#fff',
borderWidth:16,
alignSelf:'center',
marginTop:-32},

arrowBorder:{
backgroundColor:'transparent',
borderColor:'transparent',
borderTopColor:'#007a87',
borderWidth:16,
alignSelf:'center',
marginTop:-0.5},


name:{
fontSize:16,
marginBottom:5},


image:{
width:50,
height:50},

shiftDetailsButton:{
padding:6,
borderRadius:2,
borderColor:'#ddd',
backgroundColor:'#0022A1',
borderBottomWidth:0,
shadowColor:'#000',
shadowOffset:{
width:0,
height:2},

shadowOpacity:0.8,
shadowRadius:2,
elevation:1,
marginLeft:5,
marginRight:5,
marginTop:5,
height:30,
width:150},

shadowStyle:{
height:50,
width:70,
shadowColor:"#000000",
shadowOpacity:0.8,
shadowRadius:2,
shadowOffset:{
height:1,
width:1}},


buttonStyle:{
justifyContent:'center',
alignItems:'center',
width:150,
height:20,
marginTop:10,
backgroundColor:'blue'}});