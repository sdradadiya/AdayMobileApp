Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

TopBar=function(_Component){_inherits(TopBar,_Component);

function TopBar(props){_classCallCheck(this,TopBar);return _possibleConstructorReturn(this,(TopBar.__proto__||Object.getPrototypeOf(TopBar)).call(this,
props));
}_createClass(TopBar,[{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.Text,{style:[styles.textStyle,{color:this.props.labelColor[0]?'#f00':'#000'}],onPress:function onPress(){return _this2.props.onText("text1");}},this.props.label[0]),
_react2.default.createElement(_reactNative.Text,{style:[styles.textStyle,{color:this.props.labelColor[1]?'#f00':'#000'}],onPress:function onPress(){return _this2.props.onText("text2");}},this.props.label[1])));


}}]);return TopBar;}(_react.Component);exports.default=


TopBar;

var styles=_reactNative.StyleSheet.create({
container:{
flexDirection:'row',
backgroundColor:'rgb(213,216,221)',
justifyContent:'space-between',
paddingTop:5,
paddingBottom:5,
paddingRight:25,
paddingLeft:25,

marginTop:10,
marginLeft:20,
marginRight:20,
marginBottom:10,

borderRadius:3,
shadowColor:'#000',
shadowOffset:{width:0,height:2},
shadowOpacity:0.5},

textStyle:{
fontSize:15}});