Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');












var _reactNativeRouterFlux=require('react-native-router-flux');





var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _require=require('react-native-google-places-autocomplete'),GooglePlacesAutocomplete=_require.GooglePlacesAutocomplete;var _Dimensions$get=



_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

GoogleFetchAddress=function(_Component){_inherits(GoogleFetchAddress,_Component);

function GoogleFetchAddress(props){_classCallCheck(this,GoogleFetchAddress);return _possibleConstructorReturn(this,(GoogleFetchAddress.__proto__||Object.getPrototypeOf(GoogleFetchAddress)).call(this,
props));
}_createClass(GoogleFetchAddress,[{key:'render',value:function render()

{
var route=this.props.route;
var img=this.props.img;
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.View,{style:styles.center},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:18}},this.props.text)),

_react2.default.createElement(_reactNative.View,{style:[styles.center,{marginTop:25}]},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',style:{width:60,height:60},source:img})),

_react2.default.createElement(_reactNative.View,{style:{margin:20,height:300}},
_react2.default.createElement(GooglePlacesAutocomplete,{
placeholder:this.props.placeHolder,
minLength:2,
autoFocus:false,
fetchDetails:true,
onPress:function onPress(address){var details=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;
_reactNativeRouterFlux.Actions[route]({address:address});
},
getDefaultValue:function getDefaultValue(){
return'';
},
query:{
key:'AIzaSyB6OGyP3KJ3OJoNSWbqNgF7U3b5zQmAa5o',
language:'en'},

styles:{
description:{
fontWeight:'bold'},

predefinedPlacesDescription:{
color:'#1faadb'}},


currentLocation:false,
currentLocationLabel:'Current location',
nearbyPlacesAPI:'GooglePlacesSearch',
GoogleReverseGeocodingQuery:{},


GooglePlacesSearchQuery:{
rankby:'distance',
types:'food'},

filterReverseGeocodingByTypes:['locality','administrative_area_level_3'],
predefinedPlaces:[],
predefinedPlacesAlwaysVisible:true,
keyboardShouldPersistTaps:'always'})),



_react2.default.createElement(_reactNative.View,{style:{position:'absolute',left:width/2-95,bottom:20}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _reactNativeRouterFlux.Actions[route]();},
containerStyle:styles.saveButton,
style:{color:'black',fontSize:16}},'MANUAL ENTRY'))));





}}]);return GoogleFetchAddress;}(_react.Component);exports.default=GoogleFetchAddress;


var styles=_reactNative.StyleSheet.create({
container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:104},

android:{
paddingTop:90,
padding:10}}),{


flexDirection:'column'}),

header:{
flex:0.4},

body:{
flex:0.6},

center:{
justifyContent:'center',
alignItems:'center'},

saveButton:{
padding:7,
borderRadius:2,
borderColor:'#ddd',
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
marginTop:10,
height:35,
width:width/2}});