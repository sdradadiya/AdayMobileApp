Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _reactNative=require('react-native');









var _react=require('react');var React=_interopRequireWildcard(_react);
var _nativeBase=require('native-base');
var _index=require('../constants/index');

var _reactNativeRouterFlux=require('react-native-router-flux');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=



_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

SideMenu=function(_React$Component){_inherits(SideMenu,_React$Component);
function SideMenu(props){_classCallCheck(this,SideMenu);var _this2=_possibleConstructorReturn(this,(SideMenu.__proto__||Object.getPrototypeOf(SideMenu)).call(this,
props));
_this2.state={
search:'',
firstName:_this2.props.firstName,
lastName:_this2.props.lastName,
avatar:_this2.props.avatar};return _this2;

}_createClass(SideMenu,[{key:'render',value:function render()

{var _this3=this;
var _this=this;
return(
React.createElement(_reactNative.ScrollView,{scrollsToTop:false,style:styles.menu},

React.createElement(_reactNative.View,{style:styles.avatarContainer},
React.createElement(_reactNative.Image,{style:{width:105,height:105,borderRadius:105/2},
source:{uri:this.state.avatar+"?"+new Date().getTime()}}),
React.createElement(_reactNative.View,{style:{flex:1,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',paddingTop:20}},
React.createElement(_reactNative.View,{style:{flexDirection:'column',alignItems:'center'}},
React.createElement(_reactNative.View,null,
React.createElement(_reactNative.Text,{style:styles.firstName},this.state.firstName)),

React.createElement(_reactNative.View,null,
React.createElement(_reactNative.Text,{style:styles.lastName},this.state.lastName))))),





React.createElement(_reactNative.View,{style:styles.menuContainer},
React.createElement(_reactNative.TouchableOpacity,{style:{flex:1},onPress:function onPress(){

_this3.props.onChangeTabs(0);
}},
React.createElement(_reactNative.View,{style:styles.menuItem},
React.createElement(_reactNative.Image,{style:{width:25,height:23},
source:require('./assets/Schedule_tab.png')}),
React.createElement(_reactNative.Text,{style:styles.menuItemText},' Find Shifts '))),











React.createElement(_reactNative.TouchableOpacity,{style:{flex:1},onPress:function onPress(){return _this3.props.onChangeTabs(2);}},
React.createElement(_reactNative.View,{style:styles.menuItem},
React.createElement(_reactNative.Image,{style:{width:25,height:22},
source:require('./assets/signUpTeamMemberIcon.png')}),
React.createElement(_reactNative.Text,{style:styles.menuItemText},' My Profile '))),












React.createElement(_reactNative.TouchableOpacity,{style:{flex:1},onPress:function onPress(){return _this3.props.onChangeTabs(4);}},
React.createElement(_reactNative.View,{style:styles.menuItem},
React.createElement(_reactNative.Image,{style:{width:25,height:25},
source:require('./assets/settings-icon.png')}),
React.createElement(_reactNative.Text,{style:styles.menuItemText},' Settings '))))));






}}]);return SideMenu;}(React.Component);exports.default=SideMenu;


var styles=_reactNative.StyleSheet.create({
menu:{
flex:1,
width:window.width,
height:window.height},

avatarContainer:{
paddingTop:60,
paddingBottom:20,
flex:1,
flexDirection:'column',
justifyContent:'center',
alignItems:'center',
borderBottomColor:"#4A4A4A",
borderBottomWidth:1},

firstName:{
paddingRight:5,
color:"#4A4A4A",
fontSize:20,
fontWeight:'600',
fontFamily:'RobotoCondensed-Regular'},

lastName:{
color:"#4A4A4A",
fontSize:20,
fontFamily:'RobotoCondensed-Light'},

menuContainer:{
flex:1,
flexDirection:'column',
paddingLeft:10,
alignItems:"flex-start"},

menuItem:{
flex:1,
flexDirection:'row',
paddingTop:20,
justifyContent:'center',
alignItems:'center'},

menuItemText:{
fontSize:16,
paddingLeft:10,
color:"#4A4A4A",
fontFamily:'Lato-Regular'},

icon:{
width:width*0.07,
height:width*0.08},

settingsIcon:{
width:width*0.09,
height:width*0.09}});