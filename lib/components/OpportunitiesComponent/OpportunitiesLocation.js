Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');












var _reactNativeRouterFlux=require('react-native-router-flux');


var _Callout=require('./Callout');var _Callout2=_interopRequireDefault(_Callout);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=









_reactNative.Dimensions.get('window'),width=_Dimensions$get.width,height=_Dimensions$get.height;var
OpportunitiesLocation=function(_Component){_inherits(OpportunitiesLocation,_Component);
function OpportunitiesLocation(props){_classCallCheck(this,OpportunitiesLocation);var _this=_possibleConstructorReturn(this,(OpportunitiesLocation.__proto__||Object.getPrototypeOf(OpportunitiesLocation)).call(this,
props));
_this.state={
search:'',
region:{
latitude:37.79825,
longitude:-122.4354,
latitudeDelta:0.0922,
longitudeDelta:0.0421}};


_index.Tracker.trackScreenView("Opportunities Location");return _this;

}_createClass(OpportunitiesLocation,[{key:'onRegionChange',value:function onRegionChange(

region){
this.setState({
region:region});

}},{key:'onButtonPress',value:function onButtonPress(

e){
console.log(e);
_reactNativeRouterFlux.Actions.OpportunitiesListing({});
}},{key:'render',value:function render()

{var _this2=this;

var opportunities=this.props.opportunities;

return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.View,{style:styles.header},




_react2.default.createElement(_reactNative.View,{style:{justifyContent:'center',alignItems:'center',marginLeft:10}},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.pop({});}},
_react2.default.createElement(_reactNative.Image,{
style:{width:20,height:20},
source:require('./../assets/cross.png')}))),



_react2.default.createElement(_reactNative.View,{style:{width:300,justifyContent:'center',alignItems:'center',marginRight:10}},
_react2.default.createElement(_reactNative.TextInput,{
style:styles.textInput,
onChangeText:function onChangeText(search){return _this2.setState({search:search});},
value:this.state.search,
placeholder:"  street address, city, state, or zip"})))));






}}]);return OpportunitiesLocation;}(_react.Component);exports.default=OpportunitiesLocation;


var styles=_reactNative.StyleSheet.create({
container:{
marginTop:20,
flex:1},

header:{
height:50,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center'},

mapContainer:{
width:width,
height:height},

map:{
width:width,
height:height},

textInput:{
height:30,
borderColor:'gray',
borderWidth:0.5,
borderRadius:4},

callout:{
width:140}});