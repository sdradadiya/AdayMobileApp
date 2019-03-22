Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation updateMarket($id: Uuid!, $market: MarketPatch!) {\n    updateMarketById(input: { id: $id , marketPatch: $market}) {\n         market{\n          id\n          workerResponse\n          shiftId\n          clockInLocation\n          clockInDate\n          clockInVerified\n          clockOutLocation\n          clockOutDate\n          clockOutVerified\n        }\n    }\n  }'],['\n  mutation updateMarket($id: Uuid!, $market: MarketPatch!) {\n    updateMarketById(input: { id: $id , marketPatch: $market}) {\n         market{\n          id\n          workerResponse\n          shiftId\n          clockInLocation\n          clockInDate\n          clockInVerified\n          clockOutLocation\n          clockOutDate\n          clockOutVerified\n        }\n    }\n  }']),_templateObject2=_taggedTemplateLiteral(['\n  mutation updateShift($id: Uuid!, $workersInvited: [Uuid], $workersAssigned: [Uuid] ) {\n    updateShiftById(input: { id: $id , shiftPatch: {workersInvited: $workersInvited, workersAssigned: $workersAssigned }}) {\n        shift{\n          id\n          workersAssigned\n        }\n    }\n  }'],['\n  mutation updateShift($id: Uuid!, $workersInvited: [Uuid], $workersAssigned: [Uuid] ) {\n    updateShiftById(input: { id: $id , shiftPatch: {workersInvited: $workersInvited, workersAssigned: $workersAssigned }}) {\n        shift{\n          id\n          workersAssigned\n        }\n    }\n  }']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');









var _reactNativeMaps=require('react-native-maps');var _reactNativeMaps2=_interopRequireDefault(_reactNativeMaps);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactApollo=require('react-apollo');

var _SpinnerComponent=require('./../SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _nativeBase=require('native-base');



var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);
var _geolib=require('geolib');var _geolib2=_interopRequireDefault(_geolib);
var _index=require('../../constants/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=

_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;
var ASPECT_RATIO=width/height;var

Details=function(_Component){_inherits(Details,_Component);

function Details(props){_classCallCheck(this,Details);var _this=_possibleConstructorReturn(this,(Details.__proto__||Object.getPrototypeOf(Details)).call(this,
props));_this.






























getOvertimeBonusWage=function(currentWeekHours,hoursWorkingToday,thisShiftsHours,sumDailyOT,isPyramiding){
return 9.0;
var overtimeWage=baseWage*1.5;

var dailyOvertimeHours=Math.min(thisShiftHours,thisShiftHours+hoursWorkingToday-8);

var weeklyOvertimeHours=currentWeekHours-40;
if(currentWeekHours>40&&!isPyramiding){

}
if(hoursWorkingToday>8){

}
};_this.













































































































































































































































































clockInShift=function(){
navigator.geolocation.getCurrentPosition(
function(position){
var point={
lat:position.coords.latitude,
lng:position.coords.longitude};


var clock_in_date=(0,_moment2.default)(position.timestamp).format("DD MMM YYYY hh:mm a");
var clock_in_location=position.coords;

var result=_geolib2.default.isPointInCircle(
{latitude:_this.state.region.latitude,longitude:_this.state.region.longitude},
{latitude:position.coords.latitude,longitude:position.coords.longitude},
500);


_this.setState({isLoading:true,showModal:false,clockInDate:clock_in_date});
if(!result){
alert('You are not in the location bounds of the workplace');
}else{
alert('Successfully Clocked In.');
}

var market={clockInLocation:JSON.stringify(clock_in_location),clockInDate:clock_in_date,clockInVerified:result};
_this.props.updateShiftUser({
variables:{
id:_this.props.marketId,
market:market}}).


then(function(){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Clocked In");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Clocked In");
});
_this.setState({isLoading:false});
}).catch(function(err){
_this.setState({isLoading:false,error:'Error Occurred, Check your internet connection'});

});

},
function(error){return _this.setState({error:error.message});},
{enableHighAccuracy:false,timeout:200000000,maximumAge:10000000});

};_this.

clockOutShift=function(){
navigator.geolocation.getCurrentPosition(
function(position){
var clock_out_date=(0,_moment2.default)(position.timestamp).format("DD MMM YYYY hh:mm a");
var clock_out_location=position.coords;

var result=_geolib2.default.isPointInCircle(
{latitude:_this.state.region.latitude,longitude:_this.state.region.longitude},
{latitude:position.coords.latitude,longitude:position.coords.longitude},
500);


_this.setState({isLoading:true,showModal:false,clockOutDate:clock_out_date});
if(!result){
alert('you are not in the location bounds of the workplace');
}else{
alert('Successfully Clocked Out.');
}

var market={clockOutLocation:JSON.stringify(clock_out_location),
clockOutDate:clock_out_date,
clockOutVerified:result};
_this.props.updateShiftUser({
variables:{
id:_this.props.marketId,
market:market}}).

then(function(){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Clocked Out");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Clocked Out");
});
_this.setState({isLoading:false});
}).catch(function(err){
_this.setState({isLoading:false,error:'Error Occurred, Check your internet connection'});

});

},
function(error){return _this.setState({error:error.message});},
{enableHighAccuracy:false,timeout:200000000,maximumAge:10000000});

};_this.


cancelShift=function(){
var startTime=(0,_moment2.default)(_this.state.startTime);
var currentTime=(0,_moment2.default)();
var daysDifference=startTime.diff(currentTime,'days',true);
if(daysDifference<0){
alert('Can\'t cancel the shift. Shift has already started.');
}else if(_this.state.status==='PENDING'){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Removed Bid From Shift");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Removed Bid From Shift");
});
_this.props.declineShift();
}else
{
_this.props.openModal();
}




};_this.state={startTime:'',endTime:'',date:'',contact:{},marker:false,isLoading:false,totalPayment:0.0,baseWage:0.0,bonusWage:0.0,totalWage:0.0,status:'',region:null,placeId:null,clockInDate:null,clockOutDate:null};_index.Tracker.trackScreenView("Shift Details");return _this;}_createClass(Details,[{key:'componentWillMount',value:function componentWillMount(){var _this2=this;var data=this.props.shiftDetails;var _props=this.props,address=_props.address,zipCode=_props.zipCode,locationCoor=_props.locationCoor;if(address){address=JSON.parse(address);address=address["address_line1"]+" "+address["address_line2"]+" "+address["city"]+", "+address["state"]+" "+zipCode;}var baseWage=0.0;var breakTime=data.unpaidBreakTime;var timeH=breakTime.split(':')[0];var timeM=breakTime.split(':')[1];var timeS=breakTime.split(':')[2];var endTime=(0,_moment2.default)(data.endTime).subtract({hours:timeH,minutes:timeM,seconds:timeS}).format();var startTime=(0,_moment2.default)(data.startTime);var totalShiftHours=(0,_moment2.default)((0,_moment2.default)(endTime).diff((0,_moment2.default)(data.startTime),'hours',true));var totalShiftMinutes=(0,_moment2.default)((0,_moment2.default)(endTime).diff((0,_moment2.default)(data.startTime),'minutes',true));baseWage=baseWage*totalShiftMinutes/60;var bonusWage=this.props.payment-baseWage;var totalWage=baseWage+bonusWage;var totalPayment=this.props.payment||0.0;_axios2.default.get("https://maps.google.com/maps/api/geocode/json",{params:{key:'AIzaSyAVUAkx-negP8M3omIrzULbDC8QJInqE6c',address:address}}).then(function(response){var location=response.data.results[0].geometry.location;var placeId=response.data.results[0].place_id;if(locationCoor){location=JSON.parse(locationCoor);}var region={latitude:location.lat,longitude:location.lng,latitudeDelta:0.06,longitudeDelta:0.06*ASPECT_RATIO};_this2.setState({region:region,placeId:placeId,address:address});}).catch(function(err){console.log('Error: ',err);});this.setState({totalPayment:totalPayment,baseWage:baseWage,bonusWage:bonusWage,startTime:startTime,endTime:data.endTime,totalWage:totalWage,status:this.props.status,clockOutDate:this.props.clockOutDate,clockInDate:this.props.clockInDate});}},{key:'renderShiftInfoBar',value:function renderShiftInfoBar(){var renderData=function renderData(mainText,period,bottomText){return _react2.default.createElement(_reactNative.View,{style:[styles.displayInCenterColumn,{flex:1,justifyContent:'flex-end'}]},_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},_react2.default.createElement(_reactNative.Text,{style:styles.timeText},mainText.toUpperCase()),_react2.default.createElement(_reactNative.Text,{style:styles.timePeriod},period.toUpperCase())),_react2.default.createElement(_reactNative.Text,{style:styles.statusStyle},bottomText.toUpperCase()));};var iconColor='#222';var text=this.state.status;var renderIcon=function renderIcon(){if(text==='BOOKED'){iconColor='#00A863';return _react2.default.createElement(_reactNative.Image,{style:{backgroundColor:'transparent',height:25,width:25,marginBottom:4},source:require('../assets/icons/booked.png')});}else if(text==='INVITED'){iconColor='#FFAD33';return _react2.default.createElement(_reactNative.Image,{style:{backgroundColor:'transparent',height:25,width:25,marginBottom:4},source:require('../assets/icons/pending.png')});}else if(text==='PENDING'){iconColor='#FFAD33';return _react2.default.createElement(_reactNative.Image,{style:{backgroundColor:'transparent',height:25,width:25,marginBottom:4},source:require('../assets/icons/pending.png')});}else if(text==='OPEN'){iconColor='#222';return _react2.default.createElement(_nativeBase.Icon,{name:'radio-button-off',style:{backgroundColor:'transparent',fontSize:30,color:'#222'}});}};var start=(0,_moment2.default)(this.state.startTime);var end=(0,_moment2.default)(this.state.endTime);var payment=this.state.totalPayment||"0.0";return _react2.default.createElement(_reactNative.View,{style:styles.infoBarContainer},_react2.default.createElement(_reactNative.View,{style:[styles.displayInCenterColumn,{paddingTop:5,flex:0.7}]},renderIcon(),_react2.default.createElement(_reactNative.Text,{style:{backgroundColor:'transparent',fontSize:10,fontWeight:'bold',color:iconColor}},text)),renderData(start.format("h:mm"),start.format("a"),'Start time'),renderData(end.format("h:mm"),end.format("a"),'end time'),renderData('$'+payment.toString().split('.')[0],"."+payment.toString().split('.')[1],'payment'));}},{key:'renderButton',value:function renderButton(){var _this3=this;var start=(0,_moment2.default)(this.state.startTime);var end=(0,_moment2.default)(this.props.shiftDetails.endTime);var CurrentDate=(0,_moment2.default)();var duration=_moment2.default.duration(start.diff(CurrentDate));var endDuration=_moment2.default.duration(end.diff(CurrentDate));var hours=duration.asHours();var endhours=endDuration.asHours();var isBooked=this.state.status==='BOOKED'||this.state.status==='PENDING';var btnColor=isBooked?'rgb(225, 45, 35)':'rgb(25, 170, 100)';var btnText=isBooked?'CANCEL SHIFT':'BOOK SHIFT';if(btnText=='BOOK SHIFT'&&!this.props.phoneTree){btnText="BID FOR SHIFT";}if(btnText==='CANCEL SHIFT'&&this.state.status==='PENDING'){btnText="REMOVE BID";}var clockInDate=this.props.clockInDate||this.state.clockInDate;var clockOutDate=this.props.clockOutDate||this.state.clockOutDate;var clockedInAndClockedOut=false;if(CurrentDate.isAfter(start)&&CurrentDate.isBefore(end)||hours<=1){btnText='CLOCK IN';btnColor='rgb(25, 170, 100)';}if(clockInDate&&!clockOutDate){btnText="CLOCK OUT";btnColor='rgb(225, 45, 35)';}else if(clockInDate&&clockOutDate){clockedInAndClockedOut=true;}if(clockedInAndClockedOut||endhours<=-3&&this.state.status==='PAST'||!clockInDate&&this.state.status==='PAST'){return _react2.default.createElement(_reactNative.View,null,_react2.default.createElement(_reactNative.View,{style:styles.displayInCenterRow},_react2.default.createElement(_reactNative.Text,{style:[styles.textStyle,{color:'#888',marginHorizontal:20,marginVertical:5}]},this.state.status==='PAST'&&"This shift has past. ",clockedInAndClockedOut&&"You clocked in and out.")));}else{return _react2.default.createElement(_reactNative.View,null,_react2.default.createElement(_reactNative.View,{style:styles.displayInCenterRow},_react2.default.createElement(_nativeBase.Button,{full:true,onPress:function onPress(){if(btnText==='CANCEL SHIFT'||btnText==='REMOVE BID'){_this3.cancelShift();}else if(btnText==='CLOCK IN'){_this3.clockInShift();}else if(btnText==='BOOK SHIFT'||btnText==='BID FOR SHIFT'){_this3.bookShift();}else if(btnText==='CLOCK OUT'){_this3.clockOutShift();}},style:{borderRadius:2,width:'55%',shadowOffset:{height:2,width:2},shadowOpacity:0.4,backgroundColor:btnColor,marginVertical:10}},_react2.default.createElement(_reactNative.Text,{style:[styles.titleText,{color:'#FFF',fontSize:20}]},btnText))));}}},{key:'renderDate',value:function renderDate(){var _state=this.state,baseWage=_state.baseWage,bonusWage=_state.bonusWage,totalPayment=_state.totalPayment,startTime=_state.startTime,totalWage=_state.totalWage;var totalEarning=totalPayment||0.0;return _react2.default.createElement(_reactNative.View,null,_react2.default.createElement(_reactNative.View,{style:[styles.displayInCenterRow,{marginTop:10}]},_react2.default.createElement(_reactNative.Text,{style:styles.titleText},'Shift Date:'),_react2.default.createElement(_reactNative.Text,{style:[styles.titleText,{color:'rgba(0,0,0,0.6)',fontWeight:'400'}]},' ',(0,_moment2.default)(startTime).format("MMMM Do"))),_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',marginTop:10,marginBottom:10}},_react2.default.createElement(_reactNative.View,{style:[styles.displayInCenterColumn,{flex:0.5}]},_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row'}},_react2.default.createElement(_reactNative.Text,{style:[styles.timeText,{fontWeight:'bold'}]},'$',totalEarning.toString().split('.')[0]),_react2.default.createElement(_reactNative.Text,{style:[styles.timePeriod,{fontWeight:'bold'}]},'.',totalEarning.toString().split('.')[1])),_react2.default.createElement(_reactNative.Text,{style:[styles.statusStyle,{color:'rgba(0, 0, 0, 0.4)'}]},'TOTAL\nEARNINGS')),_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',flex:1}},_react2.default.createElement(_reactNative.View,{style:{flex:0.35,justifyContent:'space-between'}},_react2.default.createElement(_reactNative.Text,{style:styles.wageTitleText},'Base Wage'),_react2.default.createElement(_reactNative.Text,{style:styles.wageTitleText},'Bonus Wage'),_react2.default.createElement(_reactNative.Text,{style:styles.wageTitleText},'Total Wage')),_react2.default.createElement(_reactNative.View,{style:{flex:0.35,justifyContent:'space-between',marginBottom:4}},_react2.default.createElement(_reactNative.Text,{style:styles.wageText},'$'+baseWage.toFixed(2)),_react2.default.createElement(_reactNative.Text,{style:styles.wageText},'$'+bonusWage.toFixed(2)),_react2.default.createElement(_reactNative.Text,{style:styles.wageText},'$'+totalWage.toFixed(2))))));}},{key:'renderInstruction',value:function renderInstruction(instructions){var instructions_new=instructions||'No Instructions Available.';return _react2.default.createElement(_reactNative.View,null,_react2.default.createElement(_reactNative.Text,{style:[styles.titleText,{marginTop:10,width:'100%',textAlign:'center'}]},'Shift Instructions'),_react2.default.createElement(_reactNative.Text,{style:[styles.textStyle,{marginTop:5,marginHorizontal:35,marginBottom:18}]},instructions_new));}},{key:'onMapBtnPress',value:function onMapBtnPress(){if(this.state.region){var url=void 0;var workPlace=this.props.shiftDetails.workplaceByWorkplaceId.workplaceName||'Work Place Location';var latitude=this.state.region.latitude,longitude=this.state.region.longitude;if(_reactNative.Platform.OS==='ios'){url='https://www.google.com/maps/search/?api=1&query='+latitude+','+longitude;}else{url='https://www.google.com/maps/search/?api=1&query='+latitude+','+longitude;if(this.state.placeId){url+='&query_place_id='+this.state.placeId;}}_reactNative.Linking.canOpenURL(url).then(function(supported){if(supported){_reactNative.Linking.openURL(url);}else{alert('Don\'t know, some error has occurred');}}).catch(function(err){return console.error('An error occurred',err);});}else{alert('Location not available...');}}},{key:'bookShift',value:function bookShift()


{
var arr=this.props.arrayShift;
var f=0;

for(var i=0;i<arr.length;i++){
if(arr[i].status==='BOOKED'){
var startMatch=(0,_moment2.default)(this.props.shiftDetails.startTime).isBetween((0,_moment2.default)(arr[i].start),(0,_moment2.default)(arr[i].end));
var endMatch=(0,_moment2.default)(this.props.shiftDetails.endTime).isBetween((0,_moment2.default)(arr[i].start),(0,_moment2.default)(arr[i].end));

var startMatch1=(0,_moment2.default)(arr[i].start).isBetween((0,_moment2.default)(this.props.shiftDetails.startTime),(0,_moment2.default)(this.props.shiftDetails.endTime));
var endMatch1=(0,_moment2.default)(arr[i].end).isBetween((0,_moment2.default)(this.props.shiftDetails.startTime),(0,_moment2.default)(this.props.shiftDetails.endTime));

if((startMatch||startMatch1)&&(endMatch||endMatch1)){
f=1;
break;
}else
{
f=0;
}
}
}
if(f===0){
_reactNative.AsyncStorage.getItem('email').then(function(value){
_index.Tracker.trackEvent(value,"Bid For Shift");
}).catch(function(err){
_index.Tracker.trackEvent("Not Define","Bid For Shift");
});
this.props.acceptShift();
}else
{
alert('This shift conflicts with your current shift');
}
}},{key:'render',value:function render()


{var _this4=this;
var coordinates=[];
coordinates.push({
key:0,
location:{
longitude:this.state.region?this.state.region.longitude:-70.23,
latitude:this.state.region?this.state.region.latitude:-33.23}});


for(var i=1;i<100;i++){
var location={
longitude:coordinates[i-1].location.longitude+Math.random()*(i%2===0?-1:1),
latitude:coordinates[i-1].location.latitude+Math.random()*(i%2===0?-1:1)};

coordinates.push({key:i,location:location});
}


var data=this.props.shiftDetails;
var address=this.state.address?this.state.address:['No Address Available'];

var phoneNumber=data.workplaceByWorkplaceId.workplacePhoneNumber;
var formattedPhone=phoneNumber?'('+
phoneNumber.slice(0,3)+') '+phoneNumber.slice(3,6)+'-'+phoneNumber.slice(6):
'Phone number unavailable';
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,backgroundColor:'#EEE'}},
this.props.isLoading&&
_react2.default.createElement(_reactNative.View,{style:styles.spinner},
_react2.default.createElement(_SpinnerComponent2.default,null)),


_react2.default.createElement(_reactNative.ScrollView,null,
this.renderShiftInfoBar(),
this.renderButton(),

_react2.default.createElement(_reactNative.View,{style:styles.displayInCenterRow},
_react2.default.createElement(_nativeBase.Button,{style:{borderRadius:2,width:'55%',shadowOffset:{height:2,width:2},
shadowOpacity:0.4,backgroundColor:'#FFF'},

onPress:function onPress(){return _reactNativeRouterFlux.Actions.awardOrder({shiftId:data.id});},
full:true},
_react2.default.createElement(_reactNative.Text,{style:[styles.titleText,{fontWeight:'600'}]},'Award Order'))),



_react2.default.createElement(_reactNative.View,{style:styles.lineStyle}),
this.renderDate(),
_react2.default.createElement(_reactNative.View,{style:styles.lineStyle}),
this.renderInstruction(data.instructions),
_react2.default.createElement(_reactNative.View,{style:styles.lineStyle}),
_react2.default.createElement(_reactNative.View,{style:styles.mapContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.titleText},'Contact'),
_react2.default.createElement(_reactNative.Text,{style:styles.textStyle},
address+"\n",
formattedPhone)),



this.state.region?
_react2.default.createElement(_reactNative.View,{style:styles.mapViewContainer},
_react2.default.createElement(_reactNative.View,{style:styles.mapView},
_react2.default.createElement(_reactNativeMaps2.default,{
customMapStyle:styles.map,
renderMarker:renderMarker,
initialRegion:{
longitude:this.state.region?this.state.region.longitude:-70.23,
latitude:this.state.region?this.state.region.latitude:-33.23,
latitudeDelta:this.state.region?this.state.region.latitudeDelta:9.22,
longitudeDelta:this.state.region?this.state.region.longitudeDelta:4.21},

style:_reactNative.StyleSheet.absoluteFillObject}))):





_react2.default.createElement(_reactNative.View,{style:{height:125,width:'85%',
backgroundColor:'#FFF',
flex:1,
alignItems:'center',
justifyContent:'center',
marginVertical:25}},

_react2.default.createElement(_reactNative.Text,{style:{fontSize:20,color:'#888'}},'Location not available')),





_react2.default.createElement(_reactNative.View,null,

_react2.default.createElement(_reactNative.View,{style:styles.displayInCenterRow},
_react2.default.createElement(_nativeBase.Button,{style:{
borderRadius:2,
width:'55%',
shadowOffset:{height:2,width:2},
shadowOpacity:0.4,
backgroundColor:'#FFF',
marginTop:20,
marginBottom:20},

onPress:function onPress(){return _this4.onMapBtnPress();},
full:true},
_react2.default.createElement(_reactNative.Text,{style:[styles.titleText,{fontWeight:'600'}]},'MAP LOCATION')))))));







}}]);return Details;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
displayInCenterRow:{
flexDirection:'row',
justifyContent:'center',
alignItems:'center'},

displayInCenterColumn:{
flexDirection:'column',
justifyContent:'center',
alignItems:'center'},

timeText:{
backgroundColor:'transparent',
color:'rgba(0,0,0,0.8)',
fontSize:25,
fontFamily:'RobotoCondensed-Regular'},

timePeriod:{
backgroundColor:'transparent',
color:'#444',
fontSize:12,
fontWeight:'400',
paddingTop:3,
paddingLeft:2},

statusStyle:{
backgroundColor:'transparent',
color:'#222',
fontSize:10,
fontWeight:'400',
fontFamily:'RobotoCondensed-Regular',
textAlign:'center'},

lineStyle:{
height:1,
width:'100%',
backgroundColor:'#CCC',
marginTop:10,
marginBottom:0},

titleText:{
fontSize:18,
fontWeight:'bold',
fontFamily:'RobotoCondensed-Regular',
color:'#666'},

textStyle:{
fontFamily:'Lato-Regular',
fontSize:15,
color:'#666',
textAlign:'center',
marginTop:3},

btnContainer:{
marginVertical:10,
justifyContent:'center',
alignItems:'center',
flexDirection:'row'},

infoBarContainer:{
backgroundColor:'#EEE',
flexDirection:'row',
justifyContent:'space-between',
padding:10,
paddingTop:15},

wageTitleText:{
fontFamily:'Lato-Semibold',
fontSize:14,
color:'#666',
marginBottom:4},

wageText:{
fontFamily:'Lato-Regular',
fontSize:14,
color:'rgba(0,0,0,0.8)',
textAlign:'right',
marginRight:40},

mapContainer:{
justifyContent:'center',
alignItems:'center',
width:'100%',
marginTop:10,
marginBottom:30},

spinner:{
flex:1,
top:0,
position:'absolute',
zIndex:100},

settingRowContainer:{
flexDirection:'row',
alignSelf:'center',
justifyContent:'center',
width:'50%',
borderRadius:5,
backgroundColor:'lightgray',
paddingVertical:10},

settingName:{
fontSize:17,
fontFamily:"Lato-Regular",
color:'#4A4A4A'},

mapViewContainer:{
justifyContent:'center',
alignItems:'center'},

mapView:{
borderWidth:2,
borderColor:'lightgray',
justifyContent:'center',
alignItems:'center',
marginTop:-10,
marginBottom:0,
height:250,
width:'85%'},

map:{
top:0,
bottom:0,
left:0,
right:0,
position:'absolute'}});



var updateShiftUser=(0,_reactApollo.gql)(_templateObject);

















var updateShift=(0,_reactApollo.gql)(_templateObject2);exports.default=









(0,_reactApollo.compose)(
(0,_reactApollo.graphql)(updateShiftUser,{
name:'updateShiftUser'}),

(0,_reactApollo.graphql)(updateShift,{
name:'updateShift'}))(

Details);

function renderMarker(_ref){var location=_ref.location;
return(
_react2.default.createElement(_reactNativeMaps2.default.Marker,{
coordinate:location},

_react2.default.createElement(_reactNativeMaps2.default.Callout,null,
_react2.default.createElement(_reactNative.Text,null))));



}