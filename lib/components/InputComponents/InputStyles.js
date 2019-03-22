var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _Dimensions$get=






_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;

var InputStyles=_reactNative.StyleSheet.create({
inputFieldContainer:{
flexDirection:'row',
borderWidth:1,
margin:10,
height:40,
justifyContent:'center',
borderColor:'rgba(74,74,74,0.5)',
borderRadius:6},

inputFieldIconContainer:{
backgroundColor:'rgba(153,153,153,0.3)',
width:40,
alignItems:'center',
justifyContent:'center'},

inputFieldButtonContainer:{
borderWidth:1,
borderColor:'rgba(74,74,74,0.5)',
borderRadius:6,
margin:5,
padding:2,
alignItems:'center',
justifyContent:'center'}});



module.exports={
InputStyles:InputStyles};