var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var _react=require('react');var _react2=_interopRequireDefault(_react);


var _viewStyles=require('./viewStyles');var _viewStyles2=_interopRequireDefault(_viewStyles);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _Dimensions$get=











_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;



















colCtr=function colCtr(){return{
alignItems:'center',
flexDirection:'column'};};







flexColCtr=function flexColCtr(flexNum){return _extends({},{
flex:flexNum},
colCtr());};







_br=function _br(){return _react2.default.createElement(_reactNative.Text,null,"\n");};






_p12=function _p12(props){return(
_react2.default.createElement(_reactNative.Text,{style:{
fontSize:12,
fontFamily:'Lato-Regular',
color:'#505050',
alignSelf:'center',
justifyContent:'center'}},

props.children));};







_h2=function _h2(props){return(
_react2.default.createElement(_reactNative.Text,{style:{
fontSize:24,
fontWeight:'bold',
fontFamily:'Roboto'}},

props.children));};







_h3=function _h3(props){return(
_react2.default.createElement(_reactNative.Text,{style:{
fontSize:16,
fontFamily:'Lato-Regular',
color:'#4A4A4A'}},

props.children));};








StatusBarSpacer=function StatusBarSpacer(){return(
_react2.default.createElement(_reactNative.View,{style:_extends({},
_reactNative.Platform.select({
ios:{
height:20,
flex:20/667},

android:{
height:20,
flex:20/667}}))}));};










var styles=_reactNative.StyleSheet.create({
squareCenter95:{
width:width-width*0.95,
height:width-width*0.95}});
















































module.exports={
colCtr:colCtr,
flexColCtr:flexColCtr,
_br:_br,
_h2:_h2,
_h3:_h3,

styles:styles};