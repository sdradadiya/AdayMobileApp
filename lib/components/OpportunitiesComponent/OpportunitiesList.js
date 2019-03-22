Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');












var _reactNativeRouterFlux=require('react-native-router-flux');


var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




OpportunitiesList=function(_Component){_inherits(OpportunitiesList,_Component);
function OpportunitiesList(props){_classCallCheck(this,OpportunitiesList);var _this=_possibleConstructorReturn(this,(OpportunitiesList.__proto__||Object.getPrototypeOf(OpportunitiesList)).call(this,
props));
_this.state={
listData:[],
ds:new _reactNative.ListView.DataSource({
rowHasChanged:function rowHasChanged(r1,r2){return r1!==r2;}})};


_this.renderRow=_this.renderRow.bind(_this);
_index.Tracker.trackScreenView("Opportunities List");return _this;

}_createClass(OpportunitiesList,[{key:'componentDidMount',value:function componentDidMount()

{
var listData=this.props.listData;
this.setState({
listData:listData});

}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
var listData=nextProps.listData;
this.setState({
listData:listData});

}},{key:'renderRow',value:function renderRow(

dataRow,sectionID,rowID){var

name=



dataRow.name,companyType=dataRow.companyType,address=dataRow.address,logo=dataRow.logo;
return(
_react2.default.createElement(_reactNative.View,{style:{padding:2}},
_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.Associates({});},style:styles.opportunityContainer},
_react2.default.createElement(_reactNative.View,{style:styles.opportunityTopContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:40,height:40},source:logo}),
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.opportunityName},' ',name,' '),
_react2.default.createElement(_reactNative.Text,{style:styles.opportunityDescription},
companyType))),



_react2.default.createElement(_reactNative.Text,{style:styles.opportunityDescription},
address))));




}},{key:'render',value:function render()

{var

listData=
this.state.listData;
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.ListView,{
enableEmptySections:true,
dataSource:this.state.ds.cloneWithRows(listData),
renderRow:this.renderRow.bind(this)})));



}}]);return OpportunitiesList;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
container:_extends({
flex:1},
_reactNative.Platform.select({
ios:{
paddingTop:10},

android:{
paddingTop:0}})),



opportunityContainer:{
marginTop:2,
justifyContent:'space-between',
paddingVertical:5,
borderRadius:10,
elevation:2,
backgroundColor:'white'},

opportunityTopContainer:{
flexDirection:'row',
borderBottomWidth:1,
paddingBottom:10,
paddingLeft:15,
borderBottomColor:'#C9C9C9'},

opportunityName:{
fontSize:16,
paddingHorizontal:20,
color:'#0022A1'},

opportunityDescription:{
marginLeft:3,
fontSize:12,
paddingHorizontal:20,
color:'#4A4A4A'}});exports.default=




OpportunitiesList;