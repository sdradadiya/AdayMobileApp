Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);


var _reactNative=require('react-native');






var _reactNativeRouterFlux=require('react-native-router-flux');


var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var









PreferencesComponent=function(_Component){_inherits(PreferencesComponent,_Component);

function PreferencesComponent(props){_classCallCheck(this,PreferencesComponent);var _this=_possibleConstructorReturn(this,(PreferencesComponent.__proto__||Object.getPrototypeOf(PreferencesComponent)).call(this,
props));
_index.Tracker.trackScreenView("Opportunities Filter");return _this;
}_createClass(PreferencesComponent,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.preferenceContainer},
_react2.default.createElement(_reactNative.View,{style:styles.preferenceTopContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:40,height:40},source:require('./assets/Travel Suitcase by Capitalists.png')}),
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceName},' Time Off Requests  '),
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'Use this preference to submit time off requests'))),




_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'You have no pending vacation requests')),



_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.preferenceContainer},
_react2.default.createElement(_reactNative.View,{style:styles.preferenceTopContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:40,height:40},source:require('./assets/Certification.png')}),
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceName},' Certification  '),
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'Which position do you enjoy working the most?'))),




_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'You currently have no preferred certification')),



_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.preferenceContainer},
_react2.default.createElement(_reactNative.View,{style:styles.preferenceTopContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:40,height:40},source:require('./assets/Location.png')}),
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceName},' Location  '),
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'Which location do you enjoy working at the most?'))),




_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'You currently have no preferred location')),



_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.preferenceContainer},
_react2.default.createElement(_reactNative.View,{style:styles.preferenceTopContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:40,height:40},source:require('./assets/People.png')}),
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceName},' People  '),
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'What people do you like to work together with?'))),




_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'You currently have no preferred manager or coworkers')),



_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.preferenceContainer},
_react2.default.createElement(_reactNative.View,{style:styles.preferenceTopContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:40,height:40},source:require('./assets/Time of Day.png')}),
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceName},' Time  '),
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'Which times do you want to work?'))),




_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'You currently have no preferred weekdays or start/end times')),



_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.preferenceContainer},
_react2.default.createElement(_reactNative.View,{style:styles.preferenceTopContainer},
_react2.default.createElement(_reactNative.Image,{style:{width:40,height:40},source:require('./assets/Timer.png')}),
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceName},' Shifts  '),
_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'Rank your favorite shifts to work. (Overrides other preferences (?))'))),




_react2.default.createElement(_reactNative.Text,{style:styles.preferenceDescription},'You currently have no preferred shifts'))));





}}]);return PreferencesComponent;}(_react.Component);exports.default=PreferencesComponent;


var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
marginTop:10,
paddingHorizontal:5,
backgroundColor:'#F7F7F7'},

preferenceContainer:{
marginTop:5,
justifyContent:'space-between',
paddingVertical:5,
borderRadius:10,
elevation:2,
backgroundColor:'white'},

preferenceTopContainer:{
flexDirection:'row',
borderBottomWidth:1,
paddingBottom:10,
paddingLeft:15,
borderBottomColor:'#C9C9C9'},

preferenceName:{
fontSize:16,
paddingHorizontal:20,
color:'#0022A1'},

preferenceDescription:{
marginLeft:3,
fontSize:12,
paddingHorizontal:20,
color:'#4A4A4A'}});