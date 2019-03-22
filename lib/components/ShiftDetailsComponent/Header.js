Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');







var _reactNativeRouterFlux=require('react-native-router-flux');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Header=function(_Component){_inherits(Header,_Component);

function Header(props){_classCallCheck(this,Header);var _this=_possibleConstructorReturn(this,(Header.__proto__||Object.getPrototypeOf(Header)).call(this,
props));
_this.state={
positionName:'',
brandName:'',
workplaceName:''};

_this.handleData=_this.handleData.bind(_this);return _this;
}_createClass(Header,[{key:'componentDidMount',value:function componentDidMount()

{
this.handleData(this.props);
}},{key:'handleData',value:function handleData(

data){
var positionName=data.positionName||'';
var brandName=data.brandName||'';
var workplaceName=data.workplaceName||'';
this.setState({
positionName:positionName,
brandName:brandName,
workplaceName:workplaceName});

}},{key:'render',value:function render()

{var _state=
this.state,positionName=_state.positionName,brandName=_state.brandName,workplaceName=_state.workplaceName;
return(
_react2.default.createElement(_reactNative.View,{style:{height:210}},
this.props.workplaceImageUrl?
_react2.default.createElement(_reactNative.Image,{style:styles.backImageContainer,source:{uri:this.props.workplaceImageUrl}}):
_react2.default.createElement(_reactNative.Image,{style:styles.backImageContainer,source:require('../assets/temp/black.png')}),

_react2.default.createElement(_reactNative.View,{style:styles.headerContainer},
_react2.default.createElement(_reactNative.View,{style:styles.titleContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.backBtnContainer,
onPress:function onPress(){return _reactNativeRouterFlux.Actions.pop();}},
_react2.default.createElement(_reactNative.View,{style:styles.displayInCenterRow},
_react2.default.createElement(_reactNative.Image,{style:{backgroundColor:'transparent',height:16,width:12},
source:require('./../assets/chevron-white.png')}),
_react2.default.createElement(_reactNative.Text,{style:styles.backText},'Back'))),


_react2.default.createElement(_reactNative.Text,{style:styles.screenTitle},'Shift Details'),
_react2.default.createElement(_reactNative.View,{style:{flex:1,backgroundColor:'transparent'}})),

_react2.default.createElement(_reactNative.View,{style:styles.backdropView},
_react2.default.createElement(_reactNative.Text,{style:styles.positionText},positionName),
_react2.default.createElement(_reactNative.View,{style:styles.displayInCenterRow},
_react2.default.createElement(_reactNative.Text,{style:styles.infoText},brandName),
_react2.default.createElement(_reactNative.View,{style:styles.centerDotStyle}),
_react2.default.createElement(_reactNative.Text,{style:styles.infoText},workplaceName))))));





}}]);return Header;}(_react.Component);exports.default=Header;


var styles=_reactNative.StyleSheet.create({
headerContainer:_extends({},
_reactNative.Platform.select({
ios:{
paddingTop:20},

android:{
paddingTop:0}}),{


flex:1,
backgroundColor:'rgba(0,0,0,0.3)'}),

screenTitle:{
color:'#EEE',
justifyContent:'center',
alignItems:'center',
fontSize:20,
flex:1,
backgroundColor:'transparent',
textAlign:'center',
fontFamily:'RobotoCondensed-Bold'},


backdropView:{
flex:1,
backgroundColor:'rgba(0,0,0,0)',
justifyContent:'flex-end',
alignItems:'center',
margin:10},

backBtnContainer:{
flexDirection:'row',
flex:1,
justifyContent:'flex-start',
alignItems:'center',
backgroundColor:'transparent'},

displayInCenterRow:{
flexDirection:'row',
justifyContent:'center'},

displayInCenterColumn:{
flexDirection:'column',
justifyContent:'center',
alignItems:'center'},

positionText:{
fontSize:22,
fontWeight:'bold',
color:'#FFF',
fontFamily:'RobotoCondensed-Regular',
textAlign:'center'},

infoText:{
fontSize:12,
color:'#FFF'},

centerDotStyle:{
justifyContent:'center',
alignItems:'center',
borderColor:'#FFF',
borderRadius:2,
borderWidth:2,
height:2,
marginTop:5,
marginHorizontal:5},

backImageContainer:{
position:'absolute',
top:0,
left:0,
right:0,
bottom:0,
height:210,
width:'100%'},

titleContainer:{
width:'100%',
flexDirection:'row',
padding:10},

backText:{
fontSize:18,
backgroundColor:'transparent',
color:'white',
marginLeft:5}});