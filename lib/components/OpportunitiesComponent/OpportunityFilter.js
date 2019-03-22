Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);


var _nativeBase=require('native-base');


var _reactNative=require('react-native');













var _reactNativeRouterFlux=require('react-native-router-flux');






var _reactNativeRadioButtons=require('react-native-radio-buttons');



var _reactNativeSlider=require('react-native-slider');var _reactNativeSlider2=_interopRequireDefault(_reactNativeSlider);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var





OpportunityFilter=function(_Component){_inherits(OpportunityFilter,_Component);
function OpportunityFilter(props){_classCallCheck(this,OpportunityFilter);var _this=_possibleConstructorReturn(this,(OpportunityFilter.__proto__||Object.getPrototypeOf(OpportunityFilter)).call(this,
props));
_this.state={
searchValue:'',
sortBy:'Distance',
options:[
'Distance',
'Brand',
'Job Title'],

distance:0.5};

_this.setSelectedOption=_this.setSelectedOption.bind(_this);
_this.renderOption=_this.renderOption.bind(_this);
_this.renderContainer=_this.renderContainer.bind(_this);
_index.Tracker.trackScreenView("Opportunities Filter");return _this;

}_createClass(OpportunityFilter,[{key:'setSelectedOption',value:function setSelectedOption(

selectedOption){
this.setState({
sortBy:selectedOption});

}},{key:'renderOption',value:function renderOption(

option,selected,onSelect,index){
var style=selected?{
fontWeight:'bold',
textAlign:'center',
color:'white'}:
{
textAlign:'center',
color:'#007AFF'};

var containerStyle=selected?styles.selectedRadioButtonContainer:styles.unselectedRadioButtonContainer;
return(
_react2.default.createElement(_reactNative.TouchableWithoutFeedback,{onPress:onSelect,key:index},
_react2.default.createElement(_reactNative.View,{style:containerStyle},_react2.default.createElement(_reactNative.Text,{style:style},option))));


}},{key:'renderContainer',value:function renderContainer(

optionNodes){
return _react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},optionNodes);
}},{key:'render',value:function render()

{var _this2=this;var _state=



this.state,sortBy=_state.sortBy,distance=_state.distance;
return(
_react2.default.createElement(_reactNative.View,{style:styles.filterContainer},
_react2.default.createElement(_reactNative.View,{style:styles.headerContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this2.props.toggleFilter();}},
_react2.default.createElement(_reactNative.Image,{style:{width:20,height:20},
source:require('../assets/buttons/close-button.png')})),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:{alignItems:'center'}},
_react2.default.createElement(_reactNative.Text,{style:{color:'#0022A1',fontWeight:'600',fontSize:18}},'Filter')),

_react2.default.createElement(_reactNative.View,{style:{width:20}})),

_react2.default.createElement(_reactNative.View,{style:styles.filterContentContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldContainer},
_react2.default.createElement(_reactNative.View,{style:styles.inputFieldIconContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:25,height:25},source:require('./../assets/searchIcon.png')})),

_react2.default.createElement(_nativeBase.Input,{
onChangeText:function onChangeText(text){return _this2.setState({searchValue:text});},
inputColorPlaceholder:'rgba(74,74,74,0.5)',
placeholderTextColor:'rgba(74,74,74,0.5)',
placeholder:'Search for Jobs Near You'})),


_react2.default.createElement(_reactNative.View,{style:{paddingHorizontal:30,paddingBottom:10,backgroundColor:'white',borderBottomColor:'#B8B8B8',borderBottomWidth:1}},
_react2.default.createElement(_reactNative.Text,{style:{paddingBottom:10,color:'#007AFF'}},'SORT BY:'),
_react2.default.createElement(_reactNativeRadioButtons.RadioButtons,{
options:this.state.options,
onSelection:this.setSelectedOption,
selectedOption:sortBy,
renderOption:this.renderOption,
renderContainer:this.renderContainer})),


_react2.default.createElement(_reactNative.View,{style:{paddingHorizontal:30,paddingBottom:10,backgroundColor:'white'}},
_react2.default.createElement(_reactNative.Text,{style:{paddingVertical:10,color:'#007AFF'}},'DISTANCE AWAY:'),
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',alignItems:'center'}},
_react2.default.createElement(_reactNativeSlider2.default,{
trackStyle:styles.track,
thumbStyle:styles.thumb,
minimumTrackTintColor:'#007AFF',
value:this.state.distance,
onValueChange:function onValueChange(distance){return _this2.setState({distance:distance});}}),
_react2.default.createElement(_reactNative.Text,{style:{color:'#0022A1',fontSize:17}},distance*100,' MILES'))),


_react2.default.createElement(_reactNative.View,{style:{justifyContent:'center',alignItems:'center'}},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.searchButton},
_react2.default.createElement(_reactNative.Text,{style:{textAlign:'center',fontWeight:'bold'}},'SEARCH')))),



_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this2.props.toggleFilter();},style:{flex:1}})));




}}]);return OpportunityFilter;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
filterContainer:{
position:'absolute',
top:0,
width:width,
height:height,
backgroundColor:'rgba(0,0,0,0.5)'},

headerContainer:{
height:50,
flexDirection:'row',
backgroundColor:'#F7F7F7',
justifyContent:'space-between',
alignItems:'center',
borderBottomColor:'#B8B8B8',
borderBottomWidth:1,
paddingHorizontal:15},

filterContentContainer:{
backgroundColor:'#FAFAFA'},

inputFieldContainer:{
flexDirection:'row',
borderWidth:1,
marginVertical:10,
marginHorizontal:30,
height:45,
justifyContent:'center',
borderColor:'rgba(74,74,74,0.5)',
borderRadius:6},

inputFieldIconContainer:{
backgroundColor:'rgba(153,153,153,0.3)',
width:35,
alignItems:'center',
justifyContent:'center'},

selectedRadioButtonContainer:{
backgroundColor:'#007AFF',
flex:.3,
borderWidth:1,
borderColor:'#007AFF',
height:30,
alignItems:'center',
justifyContent:'center'},

unselectedRadioButtonContainer:{
flex:.3,
borderWidth:0.5,
height:30,
borderColor:'#007AFF',
alignItems:'center',
justifyContent:'center'},

track:{
height:3,
borderRadius:2,
width:width-140,
marginRight:5},

thumb:{
width:25,
height:25,
borderRadius:30/2,
backgroundColor:'white',
elevation:5},

searchButton:{
width:100,
height:30,
alignItems:'center',
justifyContent:'center',
backgroundColor:'white',
elevation:5,
marginTop:10,
marginBottom:20}});exports.default=




OpportunityFilter;