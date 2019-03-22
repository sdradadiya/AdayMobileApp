Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');














var _reactNativeRouterFlux=require('react-native-router-flux');

var _SpinnerComponent=require('./SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var

ZipCodeComponent=function(_Component){_inherits(ZipCodeComponent,_Component);
function ZipCodeComponent(props){_classCallCheck(this,ZipCodeComponent);var _this=_possibleConstructorReturn(this,(ZipCodeComponent.__proto__||Object.getPrototypeOf(ZipCodeComponent)).call(this,
props));
_this.state={
zipCode:[],
spinnersIsVisible:false,
size:100,
error:false};

_this.deleteNumber=_this.deleteNumber.bind(_this);
_this.spring=_this.spring.bind(_this);
_this.searchAddress=_this.searchAddress.bind(_this);
_this.getLocation=_this.getLocation.bind(_this);
_this.springValue=new _reactNative.Animated.Value(0.9);return _this;
}_createClass(ZipCodeComponent,[{key:'spring',value:function spring()

{

this.springValue.setValue(0.9);
_reactNative.Animated.spring(
this.springValue,
{
toValue:1,
friction:1}).

start();
}},{key:'addNumber',value:function addNumber(

number){

var zipCodeArray=this.state.zipCode;
if(zipCodeArray.length===5){
this.spring();
}else{
zipCodeArray.push(number);
this.setState({zipCode:zipCodeArray});
}
}},{key:'deleteNumber',value:function deleteNumber()

{
var zipCodeArray=this.state.zipCode;
zipCodeArray.pop();
this.setState({zipCode:zipCodeArray});
}},{key:'searchAddress',value:function searchAddress()

{
var zipCodeArray=this.state.zipCode;
if(zipCodeArray.length===5){
var zipCode='';
for(var i=0;i<zipCodeArray.length;i++){
zipCode+=zipCodeArray[i].toString();
}
this.getLocation(zipCode);
}else{
this.spring();
}
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
if(nextProps.state.zipCode.zipCode!=='Invalid Zip Code'){
if(nextProps.state.zipCode.homeAddress){
_reactNativeRouterFlux.Actions.HomeAddress();
}
}else{
var error='';
var spinnersIsVisible=void 0;
var emptyZipCode=this.state.zipCode;
emptyZipCode.length=0;
error='Invalid zip code';
this.setState({
error:error.toUpperCase(),
zipCode:emptyZipCode,
spinnersIsVisible:false});

}
}},{key:'getLocation',value:function getLocation(

zipCode){
this.setState({spinnersIsVisible:true});
this.props.actions.getZipCodeLocation(zipCode,this.props.addressName);
}},{key:'render',value:function render()


{
var zipCodeArray=[];
for(var i=0;i<5;i++){
zipCodeArray.push(this.state.zipCode?this.state.zipCode[i]:null);
}
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
this.state.spinnersIsVisible&&
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},'Loading...'),



_react2.default.createElement(_reactNative.View,{style:styles.zipCodePartContainer},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:17,paddingVertical:10}},'What is your zip code?'),
_react2.default.createElement(_reactNative.Animated.View,{style:{flex:1,
flexDirection:'row',
justifyContent:'center',
alignItems:'flex-start',
transform:[{scale:this.springValue}]}},


zipCodeArray.map(function(el,index){
return(
el||el===0?_react2.default.createElement(_reactNative.Text,{style:styles.zipCodeNumber,key:index},el):
_react2.default.createElement(_reactNative.View,{style:styles.zipCodeCircle,key:index}));

})),


this.state.error&&
_react2.default.createElement(_reactNative.Text,{style:{flex:1,paddingBottom:5,fontSize:20}},this.state.error)),


_react2.default.createElement(_reactNative.View,{style:styles.keyboardContainer},
_react2.default.createElement(_reactNative.View,{style:styles.rowContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,1)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumberWithoutText},'1')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,2)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'2'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'ABC')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,3)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'3'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'DEF'))),



_react2.default.createElement(_reactNative.View,{style:styles.rowContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,4)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'4'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'GHI')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,5)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'5'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'JKL')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,6)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'6'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'MNO'))),



_react2.default.createElement(_reactNative.View,{style:styles.rowContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,7)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'7'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'PQRS')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,8)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'8'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'TUV')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,9)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'9'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'WXYZ'))),



_react2.default.createElement(_reactNative.View,{style:styles.rowContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainerWithoutBorder}),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:this.addNumber.bind(this,0)},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumberWithoutText},'0')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainerWithoutBorder,onPress:this.deleteNumber},
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetterWithoutNumber},'Delete')))),




_react2.default.createElement(_reactNative.View,{style:styles.searchButtonContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.searchButton,onPress:this.searchAddress},
_react2.default.createElement(_reactNative.Text,{style:styles.searchButtonName},'LOOKING ZIP')))));




}}]);return ZipCodeComponent;}(_react.Component);exports.default=ZipCodeComponent;


var styles=_reactNative.StyleSheet.create({

container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:64},

android:{
paddingTop:54}}),{


flexDirection:'column'}),

spinner:{
marginBottom:50},

zipCodePartContainer:{
flex:1,
flexDirection:'column',
justifyContent:'center',
alignItems:'center'},

keyboardContainer:{
flex:4,
marginLeft:30,
marginRight:30,
flexDirection:'column',
justifyContent:'space-between'},

searchButtonContainer:{
flex:1,
flexDirection:'row',
justifyContent:'center',
alignItems:'flex-start'},

rowContainer:{
flex:1,
flexDirection:'row',
justifyContent:'space-between'},

keyContainer:{
height:70,
width:70,
borderRadius:64,
borderWidth:2,
borderColor:'#EEF3F5',
flexDirection:'column',
justifyContent:'center',
alignItems:'center'},

keyContainerWithoutBorder:{
height:70,
width:70,
flexDirection:'column',
justifyContent:'center',
alignItems:'center'},


keyNumber:{
flex:1,
fontSize:25,
color:'#233539',
textAlign:'center'},

keyNumberWithoutText:{
fontSize:25,
color:'#233539',
textAlign:'center'},


keyLetter:{
flex:1,
fontSize:15,
color:'#AFB8BB'},

keyLetterWithoutNumber:{
fontSize:15,
color:'#233539'},

zipCodeCircle:{
height:20,
width:20,
borderRadius:64,
borderColor:'#4A4A4A',
borderWidth:1.5,
marginLeft:4,
marginRight:4},

zipCodeNumber:{
fontSize:25,
height:35},

searchButton:{
width:160,
paddingVertical:10,
backgroundColor:'#0022A1',
justifyContent:'center',
alignItems:'center'},

searchButtonName:{
color:'white',
fontWeight:'bold'}});