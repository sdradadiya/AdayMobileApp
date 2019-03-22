Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation createRating($data: CreateRatingInput!) {\n    createRating(input:$data) {\n\t    rating{\n\t      rating\n\t    }\n  \t}\n  }'],['\n  mutation createRating($data: CreateRatingInput!) {\n    createRating(input:$data) {\n\t    rating{\n\t      rating\n\t    }\n  \t}\n  }']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');











var _reactNativeEasyRating=require('react-native-easy-rating');var _reactNativeEasyRating2=_interopRequireDefault(_reactNativeEasyRating);
var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactApollo=require('react-apollo');
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);

var _SpinnerComponent=require('./../SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _v=require('uuid/v1');var _v2=_interopRequireDefault(_v);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=_reactNative.Dimensions.get('window'),width=_Dimensions$get.width,height=_Dimensions$get.height;var

Rate=function(_Component){_inherits(Rate,_Component);

function Rate(props){_classCallCheck(this,Rate);var _this=_possibleConstructorReturn(this,(Rate.__proto__||Object.getPrototypeOf(Rate)).call(this,
props));
_this.state={
rate:0,
rateText:"",
isPublic:true,
startTime:'',
endTime:'',
noRateError:false,
isLoading:false};

_this.onTextChange=_this.onTextChange.bind(_this);
_this.formatAMPM=_this.formatAMPM.bind(_this);
_this.handleShiftData=_this.handleShiftData.bind(_this);
_index.Tracker.trackScreenView("Rate");return _this;

}_createClass(Rate,[{key:'componentDidMount',value:function componentDidMount()

{
Object.keys(this.props.shiftDetails).length&&this.handleShiftData(this.props.shiftDetails);
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
Object.keys(nextProps.shiftDetails).length&&this.handleShiftData(nextProps.shiftDetails);
}},{key:'handleShiftData',value:function handleShiftData(

shiftDetails){
var startTime=this.formatAMPM(new Date(shiftDetails.startTime));
var endTime=this.formatAMPM(new Date(shiftDetails.endTime));
var rate=shiftDetails.marketsByShiftId.edges["0"].node.ratingsByMarketId.edges.node?shiftDetails.marketsByShiftId.edges["0"].node.ratingsByMarketId.edges.node.rating:0;
this.setState({
startTime:startTime,
endTime:endTime,
rate:rate});

}},{key:'formatAMPM',value:function formatAMPM(

date){
var hours=date.getHours();
var minutes=date.getMinutes();
var ampm=hours>=12?'PM':'AM';
hours=hours%12;
hours=hours?hours:12;
minutes=minutes<10?'0'+minutes:minutes;
var strTime=hours+':'+minutes+' '+ampm;
return strTime;
}},{key:'onTextChange',value:function onTextChange(

event){var _event$nativeEvent=
event.nativeEvent,contentSize=_event$nativeEvent.contentSize,text=_event$nativeEvent.text;
this.setState({
rateText:text});

}},{key:'onSubmitPress',value:function onSubmitPress()

{var _state=
this.state,rateText=_state.rateText,rate=_state.rate;
var that=this;
if(!rate){
this.setState({noRateError:true});
return;
}
var ratingDate=(0,_moment2.default)().format();
rating={};
rating["id"]=(0,_v2.default)();
rating["marketId"]=this.props.shiftDetails.marketsByShiftId.edges["0"].node.id;
rating["raterId"]=this.props.shiftDetails.marketsByShiftId.edges["0"].node.workerId;
rating["rating"]=rate;
rating["ratingDate"]=ratingDate;
rating["comment"]=rateText;
rating["workplaceId"]=this.props.shiftDetails.workplaceId;
if(this.props.shiftDetails.managersOnShift[0]){
rating["rateeId"]=this.props.shiftDetails.managersOnShift[0];
}
this.setState({isLoading:true});
this.props.createRating({variables:{data:{rating:rating}}}).
then(function(response){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Create Rate");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Create Rate");
});





_reactNative.AsyncStorage.getItem('email',function(err,email){
_reactNativeRouterFlux.Actions.Account({email:email});
});
});
}},{key:'onPublicPress',value:function onPublicPress()

{
this.setState({isPublic:true});
}},{key:'onAnonymousPress',value:function onAnonymousPress()

{
this.setState({isPublic:false});
}},{key:'render',value:function render()

{var _this2=this;var _state2=
this.state,startTime=_state2.startTime,endTime=_state2.endTime,rate=_state2.rate,noRateError=_state2.noRateError;

return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,paddingHorizontal:10}},
this.state.isLoading&&
_react2.default.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)),


_react2.default.createElement(_reactNative.View,{style:styles.card},
_react2.default.createElement(_reactNative.Text,null,'Timeclock Details'),
_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',marginTop:15}},
_react2.default.createElement(_reactNative.View,{style:{flexDirection:"row",marginHorizontal:10}},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/startTime.png')}),

_react2.default.createElement(_reactNative.View,{style:{marginLeft:10}},
_react2.default.createElement(_reactNative.Text,null,startTime),
_react2.default.createElement(_reactNative.Text,{style:{fontSize:10}},'START TIME'))),


_react2.default.createElement(_reactNative.View,{style:{flexDirection:"row",marginLeft:40}},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:30,height:30},
source:require('./../assets/endTime.png')}),

_react2.default.createElement(_reactNative.View,{style:{marginLeft:10}},
_react2.default.createElement(_reactNative.Text,null,endTime),
_react2.default.createElement(_reactNative.Text,{style:{fontSize:10}},'END TIME'))))),





_react2.default.createElement(_reactNative.View,{style:styles.card},
_react2.default.createElement(_reactNative.Text,null,'Rate Chao Center Workplace'),
_react2.default.createElement(_reactNative.View,{style:{marginTop:10}},
_react2.default.createElement(_reactNativeEasyRating2.default,{
rating:rate,
max:5,
iconWidth:40,
iconHeight:40,
iconSelected:require('./../assets/temp/full.png'),
iconUnselected:require('./../assets/temp/stroke.png'),
onRate:function onRate(rate){return _this2.setState({rate:rate});}}))),



_react2.default.createElement(_reactNative.View,{style:styles.card},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,null,'What went well? What didn\'t go so well? (Optional)')),



_react2.default.createElement(_reactNative.View,{style:{height:80,width:width-40,borderWidth:0,marginTop:8}},
_react2.default.createElement(_reactNative.TextInput,{
multiline:true,
editable:true,
numberOfLines:4,
style:{height:70},
onChange:this.onTextChange,
value:this.state.rateText}))),



















noRateError&&
_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center"}},
_react2.default.createElement(_reactNative.Text,{style:{fontSize:15,fontWeight:'bold'}},'Please Rate Before Submit!')),


_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center"}},
_react2.default.createElement(_reactNativeButton2.default,{
onPress:function onPress(){return _this2.onSubmitPress();},
containerStyle:styles.saveButton,
style:{color:'white'}},'SUBMIT')),



_react2.default.createElement(_reactNative.View,{style:{flex:1,justifyContent:"center",alignItems:"center",marginTop:3,marginBottom:30}},
_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:styles.shiftDetailsButton,
onPress:function onPress(){return _reactNativeRouterFlux.Actions.ShiftDetails({showDetails:true,shiftId:_this2.props.shiftId,marketId:_this2.props.marketId,worker:_this2.props.worker,workersInvited:_this2.props.workersInvited,workersAssigned:_this2.props.workersAssigned});},
style:{color:'black',fontSize:16}},'SHIFT DETAILS'))));





}}]);return Rate;}(_react.Component);

var styles=_reactNative.StyleSheet.create({
card:{
paddingVertical:10},

activeButton:{
padding:3,
height:25,
width:width/2-20,
overflow:'hidden',
borderRadius:1,
backgroundColor:'#007AFF'},

activeButtonText:{
fontSize:15,
color:'white'},

passiveButton:{
padding:3,
height:25,
width:width/2-20,
overflow:'hidden',
borderRadius:1,
backgroundColor:'white',
borderWidth:1,
borderColor:'#007AFF'},

passiveButtonText:{
fontSize:15,
color:'#007AFF'},

saveButton:{
padding:7,
borderRadius:2,
borderColor:'#ddd',
borderBottomWidth:0,
shadowColor:'#000',
backgroundColor:'#0022A1',
shadowOffset:{width:0,height:2},
shadowOpacity:0.8,
shadowRadius:2,
elevation:1,
marginLeft:5,
marginRight:5,
marginTop:10,
height:35,
width:width/2},

shiftDetailsButton:{
padding:7,
borderRadius:2,
borderColor:'#ddd',
borderBottomWidth:0,
shadowColor:'#000',
shadowOffset:{width:0,height:2},
shadowOpacity:0.8,
shadowRadius:2,
elevation:1,
marginLeft:5,
marginRight:5,
marginTop:10,
height:35,
width:width/2}});


var createRating=(0,_reactApollo.gql)(_templateObject);exports.default=







(0,_reactApollo.graphql)(createRating,{
name:'createRating'})(
Rate);