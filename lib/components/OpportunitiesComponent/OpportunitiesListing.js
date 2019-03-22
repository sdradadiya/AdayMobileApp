Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');











var _OpportunitiesList=require('./OpportunitiesList');var _OpportunitiesList2=_interopRequireDefault(_OpportunitiesList);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=










_reactNative.Dimensions.get('window'),width=_Dimensions$get.width,height=_Dimensions$get.height;var
OpportunitiesLocationComponent=function(_Component){_inherits(OpportunitiesLocationComponent,_Component);
function OpportunitiesLocationComponent(props){_classCallCheck(this,OpportunitiesLocationComponent);var _this=_possibleConstructorReturn(this,(OpportunitiesLocationComponent.__proto__||Object.getPrototypeOf(OpportunitiesLocationComponent)).call(this,
props));
_this.state={
search:'',
region:{
latitude:37.78825,
longitude:-122.4324,
latitudeDelta:0.0922,
longitudeDelta:0.0421},

markers:[{
id:0,
coordinate:{
latitude:37.78261276633253,
longitude:-122.4358198991446},

color:'red',
image:'https://img.buzzfeed.com/buzzfeed-static/static/2016-12/8/10/asset/buzzfeed-prod-fastlane03/sub-buzz-4392-1481212051-3.jpg',
title:'Flik Hospitality Group',
name:'Berkeley Law School'}]};


_index.Tracker.trackScreenView("Opportunities Listing Location ");return _this;

}_createClass(OpportunitiesLocationComponent,[{key:'render',value:function render()

{

var data=this.props.data;

return(
_react2.default.createElement(_reactNative.View,{style:styles.container},


_react2.default.createElement(_reactNative.View,{style:{flex:1,marginTop:130,marginHorizontal:5}},
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.View,{style:styles.shadowStyle},
_react2.default.createElement(_reactNative.Image,{
style:[{height:70,width:70,resizeMode:'contain',position:'absolute',top:-25}],
source:require('./../assets/logos/logo1.png')}))),



_react2.default.createElement(_reactNative.View,{style:{marginLeft:10,paddingTop:10}},
_react2.default.createElement(_reactNative.Text,null,'Chao Center'),
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},'1585 Massachusetts Ave, Cambridge 0 mi away'))),


_react2.default.createElement(_OpportunitiesList2.default,{listData:data}))));



}}]);return OpportunitiesLocationComponent;}(_react.Component);exports.default=OpportunitiesLocationComponent;


var styles=_reactNative.StyleSheet.create({
container:{
flex:1},

header:{
height:50,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center'},

mapContainer:{
position:'absolute',
top:-64,
width:width,
height:200},

map:{
width:width,
height:200},

textInput:{
height:30,
borderColor:'gray',
borderWidth:0.5,
borderRadius:4},

shadowStyle:{
height:45,
width:70,
shadowColor:"#000000",
shadowOpacity:0.8,
shadowRadius:2,
shadowOffset:{
height:1,
width:1}},


textStyle:{
fontSize:12,
color:'#a9a9a9'}});