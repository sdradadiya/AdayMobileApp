Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n    query allMarkets($shiftId: Uuid!) {\n        allMarkets (condition: { shiftId: $shiftId }) {\n            nodes {\n                id\n                shiftId\n                workerId\n                userByWorkerId{\n                    id\n                    firstName\n                    lastName\n                    avatarUrl\n                }\n            }\n        }\n    }'],['\n    query allMarkets($shiftId: Uuid!) {\n        allMarkets (condition: { shiftId: $shiftId }) {\n            nodes {\n                id\n                shiftId\n                workerId\n                userByWorkerId{\n                    id\n                    firstName\n                    lastName\n                    avatarUrl\n                }\n            }\n        }\n    }']);


var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');








var _nativeBase=require('native-base');
var _reactApollo=require('react-apollo');
var _reactNativeRouterFlux=require('react-native-router-flux');
var _SpinnerComponent=require('./SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _moment=require('moment/moment');var _moment2=_interopRequireDefault(_moment);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=
_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var















AwardOrder=function(_Component){_inherits(AwardOrder,_Component);
function AwardOrder(props){_classCallCheck(this,AwardOrder);var _this=_possibleConstructorReturn(this,(AwardOrder.__proto__||Object.getPrototypeOf(AwardOrder)).call(this,
props));_this.











renderAwardUser=function(_ref){var item=_ref.item,index=_ref.index;
return(
_react2.default.createElement(_reactNative.View,{style:{width:'100%',borderBottomColor:'lightgray',borderBottomWidth:1}},
_react2.default.createElement(_reactNative.View,{style:styles.containers},
_react2.default.createElement(_reactNative.View,{style:[styles.subView,{width:'5%'}]},
_react2.default.createElement(_reactNative.Text,null,index+1)),


_react2.default.createElement(_reactNative.View,{style:[styles.subView,{width:'12%',padding:2}]},
_react2.default.createElement(_reactNative.Image,{source:{uri:item.userByWorkerId.avatarUrl},style:styles.imgProfile})),


_react2.default.createElement(_reactNative.View,{style:[styles.subView,{width:'38%',padding:2}]},
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},
_react2.default.createElement(_reactNative.Text,{style:{fontWeight:'bold',opacity:0.80}},item.userByWorkerId.firstName,' '),
_react2.default.createElement(_reactNative.Text,{style:{color:'lightgray',fontWeight:'bold'}},item.userByWorkerId.lastName)),

_react2.default.createElement(_reactNative.Text,{style:{color:'lightgray',alignSelf:'flex-start',fontSize:12,fontWeight:'bold'}})),




_react2.default.createElement(_reactNative.View,{style:[styles.subView,{width:'13%',padding:2}]},
_react2.default.createElement(_reactNative.Text,{style:styles.textStyles},'20'),
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},'HOURS')),


_react2.default.createElement(_reactNative.View,{style:[styles.subView,{width:'19%',padding:2}]},
_react2.default.createElement(_reactNative.Text,{style:styles.textStyles},'103'),
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},'SENIORITY')),


_react2.default.createElement(_reactNative.View,{style:[styles.subView,{width:'13.5%',padding:2}]},
_react2.default.createElement(_reactNative.Text,{style:styles.textStyles},'103'),
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},'YTD OT')))));





};_this.state={awardOrder:[]};return _this;}_createClass(AwardOrder,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){if(nextProps.allMarkets.allMarkets){this.setState({awardOrder:nextProps.allMarkets.allMarkets.nodes});}}},{key:'render',value:function render()

{
if(this.state.awardOrder.length===0){
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)));



}
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
this.state.awardOrder?
_react2.default.createElement(_reactNative.FlatList,{
data:this.state.awardOrder,
renderItem:this.renderAwardUser}):


_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:{lineHeight:15,color:"#999999",marginTop:8}},'No Award Order Available'))));




}}]);return AwardOrder;}(_react.Component);


var allMarkets=(0,_reactApollo.gql)(_templateObject);exports.default=
















(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(allMarkets,{
name:'allMarkets',
options:function options(ownProps){
return{
variables:{shiftId:ownProps.shiftId}};

}}))(

AwardOrder);

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
backgroundColor:'white',
paddingHorizontal:5},

containers:{
flex:1,
flexDirection:'row',
width:'100%',
padding:8},


imgProfile:{
width:34,
height:34,
borderRadius:17,
borderColor:'lightgray',
borderWidth:1},

subView:{
alignSelf:'center',
alignItems:'flex-start'},

textStyle:{
color:'lightgray',
fontSize:11,
fontWeight:'bold'},

textStyles:{
opacity:0.75,
fontWeight:'bold',
alignSelf:'center'}});