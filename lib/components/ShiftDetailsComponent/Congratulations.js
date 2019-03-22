Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var Congratulations=function Congratulations(props){
return(
_react2.default.createElement(_reactNative.View,{style:styles.containerStyle},
_react2.default.createElement(_reactNative.View,{style:{marginHorizontal:10}},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/NoSelected.png')})),


_react2.default.createElement(_reactNative.View,{style:{flex:1}},
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
_react2.default.createElement(_reactNative.Text,{style:{color:'white'}}),
_react2.default.createElement(_reactNative.View,{style:styles.waitingStyle},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:12,color:'white'}},'SCHEDULED'))),


_react2.default.createElement(_reactNative.Text,{style:{color:'white',fontSize:12}},'You\'re scheduled for this shift, see instructions belows'))));





};
var styles={
containerStyle:{
height:60,
backgroundColor:'blue',
flexDirection:'row',
justifyContent:'center',
alignItems:'center'},

waitingStyle:{
paddingHorizontal:10,
paddingVertical:1,
backgroundColor:'red',
borderRadius:20,
marginLeft:50}};exports.default=


Congratulations;