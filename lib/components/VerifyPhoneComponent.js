Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();


var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');














var _reactNativeRouterFlux=require('react-native-router-flux');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var



VerifyPhoneComponent=function(_Component){_inherits(VerifyPhoneComponent,_Component);
function VerifyPhoneComponent(props){_classCallCheck(this,VerifyPhoneComponent);var _this=_possibleConstructorReturn(this,(VerifyPhoneComponent.__proto__||Object.getPrototypeOf(VerifyPhoneComponent)).call(this,
props));
_this.state={
number:['(','_ ','_ ','_ ',') ','_ ','_ ','_ ','- ','_ ','_ ','_ ','_ '],
index:1,
enterPhonePage:true};

_this.deleteNumber=_this.deleteNumber.bind(_this);
_this.onDonePressed=_this.onDonePressed.bind(_this);return _this;
}_createClass(VerifyPhoneComponent,[{key:'addNumber',value:function addNumber(

num){

var index=this.state.index;
var number=this.state.number;

if(this.state.enterPhonePage){
if(index==4||index==8){
index++;
}
if(index>12){
return;
}
}else{
if(index>3){
return;
}
}
number[index]=num+' ';
index++;
this.setState({
number:number,
index:index});

}},{key:'deleteNumber',value:function deleteNumber()

{

var number=this.state.number;
var index=this.state.index;
index--;
if(this.state.enterPhonePage){
if(index<1){
return;
}
if(index==4||index==8){
index--;
number[index]='_ ';
}else{
number[index]='_ ';
}
}else{
if(index<0){
return;
}else{
number[index]='o ';
}
}
this.setState({
number:number,
index:index});

}},{key:'onDonePressed',value:function onDonePressed()

{

if(this.state.index==13){
this.setState({
enterPhonePage:false,
index:0,
number:['o ','o ','o ','o ']});

}
if(this.state.index>3&&!this.state.enterPhonePage){
_reactNativeRouterFlux.Actions.Account();
}
}},{key:'getPhoneNumberInput',value:function getPhoneNumberInput()

{

return(
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.View,{style:[styles.center,{marginVertical:10}]},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:16}},'Last Step!'),
_react2.default.createElement(_reactNative.Text,{style:{fontSize:16}},'Please Verify Your Phone Number')),

_react2.default.createElement(_reactNative.View,{style:[styles.center,{marginBottom:20}]},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:20}},this.state.number))));



}},{key:'getCodeInput',value:function getCodeInput()

{

return(
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.View,{style:[styles.center,{marginVertical:10}]},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:20}},this.state.number)),

_react2.default.createElement(_reactNative.View,{style:[styles.center,{marginBottom:20}]},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:18}},'RESEND CODE'))));



}},{key:'render',value:function render()

{var _this2=this;
var footerImg=this.state.enterPhonePage?require('./assets/buttons/phone-verify.png'):require('./assets//buttons/OK.png');

return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.ScrollView,null,
_react2.default.createElement(_reactNative.View,{style:styles.header},
_react2.default.createElement(_reactNative.View,{style:{flex:0.2,marginLeft:10,justifyContent:'flex-start',alignSelf:'center'}},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){_reactNativeRouterFlux.Actions.pop();}},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:25,height:25},
source:require('./assets/Icons_Exit.png')}))),



_react2.default.createElement(_reactNative.View,{style:[{flex:0.6,justifyContent:'center',alignItems:'center'}]},
this.state.enterPhonePage?
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:130},
source:require('./assets/logos/aday-logo-white.png')}):

_react2.default.createElement(_reactNative.Text,{style:{fontSize:20}},'CONFIRM NUMBER')),


_react2.default.createElement(_reactNative.View,{style:{flex:0.2}})),



_react2.default.createElement(_reactNative.View,{style:{height:80}},
this.state.enterPhonePage?
this.getPhoneNumberInput():
this.getCodeInput()),


_react2.default.createElement(_reactNative.View,{style:[styles.keyboardContainer,styles.center]},
_react2.default.createElement(_reactNative.View,{style:styles.rowContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:function onPress(){return _this2.addNumber(1);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumberWithoutText},'1'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},' ')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:[styles.keyContainer,{marginHorizontal:20}],onPress:function onPress(){return _this2.addNumber(2);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'2'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'ABC')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:function onPress(){return _this2.addNumber(3);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'3'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'DEF'))),


_react2.default.createElement(_reactNative.View,{style:styles.rowContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:function onPress(){return _this2.addNumber(4);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'4'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'GHI')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:[styles.keyContainer,{marginHorizontal:20}],onPress:function onPress(){return _this2.addNumber(5);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'5'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'JKL')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:function onPress(){return _this2.addNumber(6);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'6'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'MNO'))),



_react2.default.createElement(_reactNative.View,{style:styles.rowContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:function onPress(){return _this2.addNumber(7);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'7'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'PQRS')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:[styles.keyContainer,{marginHorizontal:20}],onPress:function onPress(){return _this2.addNumber(8);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'8'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'TUV')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainer,onPress:function onPress(){return _this2.addNumber(9);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumber},'9'),
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetter},'WXYZ'))),



_react2.default.createElement(_reactNative.View,{style:styles.rowContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainerWithoutBorder}),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:[styles.keyContainer,{marginHorizontal:20}],onPress:function onPress(){return _this2.addNumber(0);}},
_react2.default.createElement(_reactNative.Text,{style:styles.keyNumberWithoutText},'0')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.keyContainerWithoutBorder,onPress:this.deleteNumber},
_react2.default.createElement(_reactNative.Text,{style:styles.keyLetterWithoutNumber},'Delete')))),



_react2.default.createElement(_reactNative.View,{style:[styles.center,{marginTop:15}]},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:this.onDonePressed},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:100,height:100},
source:footerImg}))))));






}}]);return VerifyPhoneComponent;}(_react.Component);exports.default=VerifyPhoneComponent;


var styles=_reactNative.StyleSheet.create({
container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:24},

android:{
paddingTop:54}})),



header:{
height:60,
borderBottomWidth:3,
borderBottomColor:'#F2F2F2',
flexDirection:'row'},

keyboardContainer:{
marginLeft:30,
marginRight:30,
flexDirection:'column',
justifyContent:'center'},

rowContainer:{
flex:1,
flexDirection:'row',
marginTop:20},

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

searchButton:{
height:80,
width:80,
justifyContent:'center',
alignItems:'center'},

doneButton:{
height:80,
width:80,
justifyContent:'center',
alignItems:'center',
borderRadius:64,
borderColor:'#EEF3F5',
borderWidth:1.5},

center:{
justifyContent:'center',
alignItems:'center'}});