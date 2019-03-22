Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n     query userShiftByStartQuery($userid: Uuid!, $daystart: Datetime!, $dayend: Datetime!, $offset: Int, $limit: Int) {\n         userShiftByStart(userid: $userid, daystart: $daystart, dayend: $dayend,\n         offset: $offset, first: $limit){\n             edges{\n                cursor\n                 node{\n                     id,\n                     startTime\n                     endTime\n                     workersAssigned\n                     workersRequestedNum\n                     workersInvited\n                     instructions\n                     hourlyBonusPay\n                     unpaidBreakTime\n                     marketsByShiftId(condition: { workerId: $userid }){\n                        edges{\n                            node{\n                                id\n                                isBooked\n                                workerResponse\n                                isFromPhoneTree\n                                clockInDate\n                                clockOutDate\n                                userByWorkerId{\n                                    id\n                                    userEmail\n                                    employeesByUserId{\n                                        nodes{\n                                            wage\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                     positionByPositionId{\n                          positionName\n                          brandByBrandId {\n                            brandName\n                          }\n                    },\n                    workplaceByWorkplaceId{\n                          workplaceName\n                          address\n                          workplacePhoneNumber\n                          workplaceImageUrl\n                          locationJson\n                          addressJson\n                          zipCode\n                    },\n                 }\n             }\n         }\n     }\n'],['\n     query userShiftByStartQuery($userid: Uuid!, $daystart: Datetime!, $dayend: Datetime!, $offset: Int, $limit: Int) {\n         userShiftByStart(userid: $userid, daystart: $daystart, dayend: $dayend,\n         offset: $offset, first: $limit){\n             edges{\n                cursor\n                 node{\n                     id,\n                     startTime\n                     endTime\n                     workersAssigned\n                     workersRequestedNum\n                     workersInvited\n                     instructions\n                     hourlyBonusPay\n                     unpaidBreakTime\n                     marketsByShiftId(condition: { workerId: $userid }){\n                        edges{\n                            node{\n                                id\n                                isBooked\n                                workerResponse\n                                isFromPhoneTree\n                                clockInDate\n                                clockOutDate\n                                userByWorkerId{\n                                    id\n                                    userEmail\n                                    employeesByUserId{\n                                        nodes{\n                                            wage\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                     positionByPositionId{\n                          positionName\n                          brandByBrandId {\n                            brandName\n                          }\n                    },\n                    workplaceByWorkplaceId{\n                          workplaceName\n                          address\n                          workplacePhoneNumber\n                          workplaceImageUrl\n                          locationJson\n                          addressJson\n                          zipCode\n                    },\n                 }\n             }\n         }\n     }\n']),_templateObject2=_taggedTemplateLiteral(['query mobileVersion($id: Uuid!){\n  mobileInformationById (id: $id){\n    appVersion\n    disabled\n  }\n}'],['query mobileVersion($id: Uuid!){\n  mobileInformationById (id: $id){\n    appVersion\n    disabled\n  }\n}']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _nativeBase=require('native-base');
var _reactApollo=require('react-apollo');
var _reactNative=require('react-native');

















var _reactNativeRouterFlux=require('react-native-router-flux');
var _customReactNativeCalendarStrip=require('./custom-react-native-calendar-strip');var _customReactNativeCalendarStrip2=_interopRequireDefault(_customReactNativeCalendarStrip);
var _ScheduleCardComponent=require('./ScheduleCardComponent');var _ScheduleCardComponent2=_interopRequireDefault(_ScheduleCardComponent);
var _reactMoment=require('react-moment');var _reactMoment2=_interopRequireDefault(_reactMoment);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _index=require('../constants/index');


var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _SpinnerComponent=require('./SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _v=require('uuid/v1');var _v2=_interopRequireDefault(_v);

var _reactNativeSnackbar=require('react-native-snackbar');var _reactNativeSnackbar2=_interopRequireDefault(_reactNativeSnackbar);
var _reactNativeSectionListGetItemLayout=require('react-native-section-list-get-item-layout');var _reactNativeSectionListGetItemLayout2=_interopRequireDefault(_reactNativeSectionListGetItemLayout);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;

var Width=parseFloat(width/375);




var userShiftByStartQuery=(0,_reactApollo.gql)(_templateObject);


























































var mobileVersion=(0,_reactApollo.gql)(_templateObject2);







var sectionData=[],lastdate=void 0;
var Index=0;
var hours={};
var HEIGHT=_reactNative.Platform.OS==='android'?110:95;
var WIDTH=_reactNative.Platform.OS==='android'?315*Width:310*Width;
var h=0;var

Schedule=function(_Component){_inherits(Schedule,_Component);

function Schedule(props){_classCallCheck(this,Schedule);var _this2=_possibleConstructorReturn(this,(Schedule.__proto__||Object.getPrototypeOf(Schedule)).call(this,
props));_this2.
















































































































































































































































































_handleAppStateChange=function(nextAppState){
if(_this2.state.appState.match(/inactive|background/)&&nextAppState==='active'){
_this2.props.userShift.refetch();
}
_this2.setState({appState:nextAppState});
};_this2.

refetch=function(key){
var previousData=_this2.props.userShift&&_this2.props.userShift.userShiftByStart&&_this2.props.userShift.userShiftByStart.edges;
if(previousData){
_this2.setState({refetching:true});
_this2.props.userShift.refetch().
then(function(data){
var check=_lodash2.default.isEqual(data.data.userShiftByStart.edges,previousData);
if(check)
{
_reactNativeSnackbar2.default.show({
title:'Refresh Complete, Nothing Changed',
duration:_reactNativeSnackbar2.default.LENGTH_LONG});

console.log('Not Update');
_this2.setState({loadData:false});
}else
{
_reactNativeSnackbar2.default.show({
title:'Refresh Complete, Shifts Changed',
duration:_reactNativeSnackbar2.default.LENGTH_LONG});

console.log('Update');
_this2.setState({loadData:true});
}
_this2.setState({refetching:false});
Index=_lodash2.default.findIndex(sectionData,function(x){
return x.date===lastdate;
});
_this2._scrollViewTemp.scrollToLocation({sectionIndex:Index,itemIndex:-1,animated:true});



_this2.forceUpdate();
}).
catch(function(e){
_this2.setState({refetching:false});
});
}
};_this2.


renderItem=function(_ref){var item=_ref.item;return(
_react2.default.createElement(_ScheduleCardComponent2.default,{
data:item,
key:item}));};_this2.













































































renderDateSeparator=function(text){
return(
_react2.default.createElement(_reactNative.View,{style:{
alignItems:"center",
width:46*Width,
height:HEIGHT,
left:0,
position:'absolute',
backgroundColor:'rgb(250,250,250)'}},

_react2.default.createElement(_reactNative.Text,{style:[styles.h1GrayLato,
{
lineHeight:24}]},
(0,_moment2.default)(text).format('D').toUpperCase()),
_react2.default.createElement(_reactNative.Text,{style:[styles.h3BlackLato,{
lineHeight:15}]},
(0,_moment2.default)(text).format('MMM').toUpperCase()),
_react2.default.createElement(_reactNative.Text,{style:[styles.h3GrayLato,{
lineHeight:15}]},
(0,_moment2.default)(text).format('ddd').toUpperCase())));


};_this2.




































































































renderFilter=function(currentDate){
var new_date=(0,_moment2.default)(currentDate).add(1,'w');

_this2.setState({
currentDate:currentDate.startOf('day').format(),
backwardStart:currentDate.startOf('day').format(),
nextWeekDate:new_date},
function(){
_this2.clickManage(currentDate);
});
};_this2.state={currentDate:_this2.props.start,appState:_reactNative.AppState.currentState,loading:false,contentOffsetY:0,backwardStart:_this2.props.start,up:false,lastCurrentDate:_this2.props.start,nextWeekDate:(0,_moment2.default)(_this2.props.start).add(1,'w')};_this2._onScroll=_this2._onScroll.bind(_this2);_this2.sortOpenShifts=_this2.sortOpenShifts.bind(_this2);_this2.getItemLayout=(0,_reactNativeSectionListGetItemLayout2.default)({getItemHeight:function getItemHeight(rowData,sectionIndex,rowIndex){return sectionData[sectionIndex].data[0].date?sectionData[sectionIndex].data[0].date.length*HEIGHT:HEIGHT;},getSeparatorHeight:function getSeparatorHeight(){return 0;},getSectionHeaderHeight:function getSectionHeaderHeight(){return 0;},getSectionFooterHeight:function getSectionFooterHeight(){return 0;},listHeaderHeight:0});_index.Tracker.trackScreenView("Schedule");return _this2;}_createClass(Schedule,[{key:'componentDidMount',value:function componentDidMount(){this.props.onRef(this);_reactNative.AppState.addEventListener('change',this._handleAppStateChange);}},{key:'componentWillUnmount',value:function componentWillUnmount(){this.props.onRef(undefined);_reactNative.AppState.removeEventListener('change',this._handleAppStateChange);}},{key:'sortOpenShifts',value:function sortOpenShifts(a,b){if(a.status>b.status)return 1;if(a.status<b.status)return-1;return 0;}},{key:'sortByStart',value:function sortByStart(a,b){if(a.start>b.start)return 1;if(a.start<b.start)return-1;return 0;}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){var _this3=this;if(!nextProps.userShift.loading&&this.props!==nextProps){var version=nextProps.mobVersion;if(version.mobileInformationById){this.setState({appDisabled:version.mobileInformationById.disabled});}var data=nextProps.userShift;var _this=this;var sectionData1=[];sectionData=[];h=0;var unfilteredSectionDate=[];var listUnfiltered=[];var unSavedSchedules=[];var savedSchedules=this.props.store.schedules;if(!data.error){if(data.userShiftByStart&&data.userShiftByStart.edges.length>0){data.userShiftByStart.edges.map(function(_ref2,index){var node=_ref2.node;var market=node.marketsByShiftId.edges&&node.marketsByShiftId.edges[0]&&node.marketsByShiftId.edges[0].node;var workersAssignedNum=node.workersAssigned?node.workersAssigned.length:0;var workersInvitedNum=node.workersInvited?node.workersInvited.length:0;var not_filled=workersAssignedNum!==node.workersRequestedNum;var not_full_invite=workersAssignedNum+workersInvitedNum<node.workersRequestedNum;var working_shift=node.workersAssigned&&node.workersAssigned.includes(data.variables.userid);var invited=node.workersInvited&&node.workersInvited.includes(data.variables.userid);var type=null;if((0,_moment2.default)(node.endTime).isBefore((0,_moment2.default)().format())){type='PAST';}else if(working_shift){type='BOOKED';}else if(invited){type='INVITED';}else if(market&&not_filled&&not_full_invite&&market.workerResponse=='YES'){type='PENDING';}else if(market&&not_filled&&not_full_invite&&market.workerResponse!=='NO'){type='OPEN';}type?listUnfiltered.push(_extends({},_this.formatToListData(node,type),{key:index})):null;type?unfilteredSectionDate.push((0,_moment2.default)(node.startTime).format('YYYY-MM-DD')):null;!savedSchedules[node.id]&&unSavedSchedules.push(_extends({},node,{type:type}));});}}else{_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');}var filteredDate=[];if(unfilteredSectionDate.length>0){filteredDate=(0,_lodash.sortBy)((0,_lodash.uniqBy)(unfilteredSectionDate));}var listData=[];if(nextProps.filter=="ALL"){listData=listUnfiltered;}else{listUnfiltered.forEach(function(card){if(card.status==nextProps.filter){listData.push(card);}});}listData=(0,_lodash.uniqBy)(listData,function(item){return item.shiftId;});var end=null;if(unfilteredSectionDate.length>0){end=(0,_moment2.default)(filteredDate[filteredDate.length-1]).add(10,'days');}else{end=(0,_moment2.default)(this.state.backwardStart).add(1,'days');}startDate=(0,_moment2.default)(this.state.backwardStart);var _loop=function _loop(){var d=[];var d1=startDate.format('YYYY-MM-DD');var noData=false;var data=listData.filter(function(x){return(0,_moment2.default)(x.start).format('YYYY-MM-DD')===startDate.format('YYYY-MM-DD');});listData.map(function(item){if((0,_moment2.default)(item.start).format('YYYY-MM-DD')===startDate.format('YYYY-MM-DD')){d.push(item);}});d.sort(_this3.sortOpenShifts);var bookedHour=0.0;if(d.length>0){for(var i=0;i<d.length;i++){var obj={},openHour=0.0,workingHour=0.0,bonusHour=0.0;obj=d[i];workingHours=obj.workingMinutes/60;if(bookedHour>8||bookedHour===8){obj.hourlyPayment=workingHours*obj.hourlyWage*1.5;}else{workingHour=8-bookedHour;if(workingHour>workingHours||workingHour===workingHours){obj.hourlyPayment=workingHours*obj.hourlyWage;}else{bonusHour=workingHours-workingHour;obj.hourlyPayment=workingHour*obj.hourlyWage+bonusHour*obj.hourlyWage*1.5===0?0.0:workingHour*obj.hourlyWage+bonusHour*obj.hourlyWage*1.5;}}if(obj.status==="BOOKED"){bookedHour=bookedHour+workingHours;}obj.hourlyPayment=parseFloat(obj.hourlyPayment).toFixed(2);}}d.sort(_this3.sortByStart);var dataToSend=d.length>0?[{date:d,start:startDate.format(),key:startDate.format()}]:[{noData:noData,noDataAvailable:true,start:startDate.format(),key:startDate.format()}];sectionData.push({date:d1,data:dataToSend,key:d1});var dd=[];var dd1=startDate.format('YYYY-MM-DD');dd1=_lodash2.default.cloneDeep(startDate.format('YYYY-MM-DD'));var d2=_lodash2.default.cloneDeep(startDate);var days=[];var openH=0,pendingH=0,bookedH=0;var objHour={open:openH,pending:pendingH,booked:bookedH};for(var _i=1;_i<=7;_i++){days.push(d2.format('YYYY-MM-DD'));listData.map(function(item){if((0,_moment2.default)(item.start).format('YYYY-MM-DD')===d2.format('YYYY-MM-DD')){if(item.status==='BOOKED'){bookedH=bookedH+item.workingHours;}else if(item.status==='PENDING'){pendingH=pendingH+item.workingHours;}else if(item.status==='OPEN'){openH=openH+item.workingHours;}}});d2=d2.add(1,'days');}hours[dd1]={open:openH.toFixed(0),pending:pendingH.toFixed(0),booked:bookedH.toFixed(0)};startDate=startDate.add(1,'days');};while(startDate.format('YYYY-MM-DD')!==end.format('YYYY-MM-DD')){var workingHours;_loop();}_this.filterButtonColors();var l=sectionData?sectionData.length:0;var displayList=l===0?_react2.default.createElement(_reactNative.View,null,_react2.default.createElement(_reactNative.Text,{style:styles.filterSubtitle},'NO SHIFTS TO DISPLAY FOR SELECTED DATE AND FILTER')):_react2.default.createElement(_reactNative.SectionList,{ref:function ref(_ref5){_this3._scrollViewTemp=_ref5;},automaticallyAdjustContentInsets:false,renderItem:this.renderItem,renderSectionHeader:function renderSectionHeader(_ref3){var section=_ref3.section;return _this3.renderDateSeparator(section.date);},sections:sectionData,stickySectionHeadersEnabled:_reactNative.Platform.OS==='ios'?true:false,getItemLayout:this.getItemLayout,refreshing:this.state.loading,onRefresh:function onRefresh(){return _this3.loadMoreOnTop();},onViewableItemsChanged:function onViewableItemsChanged(_ref4){var viewableItems=_ref4.viewableItems;return _this3.changeDate(viewableItems[0]||{index:startDate,key:startDate,item:startDate});},onEndReachedThreshold:0.3,onEndReached:function onEndReached(){return _this3.loadMoreOnBottom();}});unSavedSchedules.length&&this.props.actions.addShiftData(unSavedSchedules);this.setState({displayList:displayList});}this.forceUpdate();}},{key:'formatToListData',value:function formatToListData(node,status){var breakTime=node.unpaidBreakTime;var timeH=breakTime.split(':')[0];var timeM=breakTime.split(':')[1];var timeS=breakTime.split(':')[2];var endTime=(0,_moment2.default)(node.endTime).subtract({hours:timeH,minutes:timeM,seconds:timeS}).format();var workingHours=(0,_moment2.default)((0,_moment2.default)(endTime).diff((0,_moment2.default)(node.startTime),'hours',true));var workingMinutes=(0,_moment2.default)((0,_moment2.default)(endTime).diff((0,_moment2.default)(node.startTime),'minutes',true));var wage=node.marketsByShiftId.edges[0]&&node.marketsByShiftId.edges[0].node.userByWorkerId.employeesByUserId.nodes[0].wage;var payment='$'+(workingHours*wage).toFixed(2);var address=node.workplaceByWorkplaceId.address?node.workplaceByWorkplaceId.address.split(','):['No Address Available'];var address1='';for(var i=0;i<address.length-2;i++){i===address.length-3?address1+=address[i]:address1+=address[i]+',';}var address2=address.length>1?address[address.length-2]+','+address[address.length-1]:address[0];return{shiftId:node.id,marketId:node.marketsByShiftId.edges[0]&&node.marketsByShiftId.edges[0].node.id,isFromPhoneTree:node.marketsByShiftId.edges[0]&&node.marketsByShiftId.edges[0].node.isFromPhoneTree,status:status,start:node.startTime,end:node.endTime,workersInvited:node.workersInvited,workersAssigned:node.workersAssigned,worker:this.props.userShift.variables.userid,workplace:node.workplaceByWorkplaceId.workplaceName,clockOutDate:node.marketsByShiftId.edges[0]&&node.marketsByShiftId.edges[0].node.clockInDate,clockInDate:node.marketsByShiftId.edges[0]&&node.marketsByShiftId.edges[0].node.clockOutDate,addressJson:node.workplaceByWorkplaceId.addressJson,locationCoor:node.workplaceByWorkplaceId.locationJson,zipCode:node.workplaceByWorkplaceId.zipCode,position:node.positionByPositionId.positionName,brand:node.positionByPositionId.brandByBrandId.brandName,payment:payment,address1:address1,address2:address2,workplacePhoneNumber:node.workplaceByWorkplaceId.workplacePhoneNumber,workingHours:workingHours,workingMinutes:workingMinutes,hourlyPayment:0.0,hourlyWage:wage};}},{key:'filterButtonColors',value:function filterButtonColors(){this.allSelected="";this.allFont="";this.openSelected="";this.waitingSelected="";this.scheduledSelected="";this.openFont="";this.bookedFont={color:'#00A863'};this.invitedFont={color:'#FFAD33'};this.allCircle={backgroundColor:"#0022A1"};if(this.props.filter==="ALL"){this.allSelected=styles.switchSelect;this.allFont=styles.switchFont;this.allCircle={backgroundColor:"#FFF"};}if(this.props.filter==="OPEN"){this.openSelected=styles.switchSelect;this.openFont=styles.switchFont;}if(this.props.filter==="INVITED"){this.waitingSelected=styles.switchSelect;this.invitedFont=styles.switchFont;}if(this.props.filter==="BOOKED"){this.scheduledSelected=styles.switchSelect;this.bookedFont=styles.switchFont;}}},{key:'changeDate',value:function changeDate(_ref6){var index=_ref6.index,key=_ref6.key,item=_ref6.item;var date=item.key;if((0,_moment2.default)(date).startOf('day').format()===(0,_moment2.default)(this.state.nextWeekDate).startOf('day').format()){var new_date=(0,_moment2.default)(this.state.nextWeekDate).add(1,'w');this.setState({currentDate:(0,_moment2.default)(date).startOf('day').format(),backwardStart:(0,_moment2.default)(date).startOf('day').format(),nextWeekDate:new_date});this.forceUpdate();}else if((0,_moment2.default)(date).startOf('day').format()===(0,_moment2.default)(this.state.backwardStart).subtract(1,'d').startOf('day').format()){var _new_date=(0,_moment2.default)(date).subtract(6,'d');this.setState({currentDate:_new_date,backwardStart:_new_date,nextWeekDate:(0,_moment2.default)(date).add(1,'d').startOf('day').format()});this.forceUpdate();}}},{key:'_onScroll',value:function _onScroll(e){var contentOffset=e.nativeEvent.contentOffset.y;this.state.contentOffsetY>contentOffset?this.loadMoreOnTop():this.loadMoreOnBottom();this.setState({contentOffsetY:contentOffset});}},{key:'loadMoreOnTop',value:function loadMoreOnTop(){var _this4=this;var start=(0,_moment2.default)(this.state.backwardStart).subtract(7,'d').startOf('day').format();this.setState({loading:true,backwardStart:start});this.props.userShift.fetchMore({variables:{daystart:start,dayend:(0,_moment2.default)(this.state.backwardStart).startOf('day').format()},updateQuery:function updateQuery(previousResult,_ref7){var fetchMoreResult=_ref7.fetchMoreResult,queryVariables=_ref7.queryVariables;if(!fetchMoreResult||fetchMoreResult.userShiftByStart.edges.length===0){_this4.setState({loading:false});return previousResult;}_this4.setState({loading:false});console.log('Fetch Results :',previousResult);var l=fetchMoreResult.userShiftByStart.edges.length;var startDate=fetchMoreResult.userShiftByStart.edges[l-1].node.startTime;_this4.setState({currentDate:startDate,backwardStart:startDate,nextWeekDate:(0,_moment2.default)(startDate).add(1,'w').startOf('day').format()});_this4.forceUpdate();return _extends({},previousResult,{userShiftByStart:{edges:[].concat(_toConsumableArray(previousResult.userShiftByStart.edges),_toConsumableArray(fetchMoreResult.userShiftByStart.edges)),'__typename':'ShiftsEdge'}});}});}},{key:'loadMoreOnBottom',value:function loadMoreOnBottom(){}},{key:'clickManage',value:function clickManage(


date){
var iIndex=_lodash2.default.findIndex(sectionData,function(x){
return(0,_moment2.default)(x.key).format('YYYY MM DD')===(0,_moment2.default)(date).format('YYYY MM DD');
});

if(iIndex==-1){
iIndex=sectionData.length-1;
}

this._scrollViewTemp.scrollToLocation({
itemIndex:0,
sectionIndex:iIndex});


var new_date=(0,_moment2.default)(date).add(1,'w');

this.setState({
currentDate:date.startOf('day').format(),
backwardStart:date.startOf('day').format(),
nextWeekDate:new_date});


this.forceUpdate();
}},{key:'render',value:function render()

{var _this5=this;

var data=this.props.userShift;
var version=this.props.mobVersion;


if(data.loading||!data.userShiftByStart||this.state.refetching){
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1,position:'absolute',zIndex:100}},
_react2.default.createElement(_SpinnerComponent2.default,null)));



}

if(data.networkStatus===1){
return _react2.default.createElement(_reactNative.ActivityIndicator,{style:styles.loading});
}


if(this.state.appDisabled){
var APP_STORE_LINK='https://itunes.apple.com/us/app/a-day/id1328528616?mt=8';
var PLAY_STORE_LINK='https://play.google.com/store/apps/details?id=com.joinaday';
_reactNative.Alert.alert(
'Update Available',
'This version of the app is outdated. Please update app from the '+(_reactNative.Platform.OS==='ios'?'app store':'play store')+'.',
[
{
text:'Update Now',onPress:function onPress(){
_reactNative.Linking.canOpenURL(APP_STORE_LINK).then(function(supported){
if(_reactNative.Platform.OS==='ios'){
_reactNative.Linking.openURL(APP_STORE_LINK).catch(function(err){return console.error('An error occurred',err);});
}else
{
_reactNative.Linking.openURL(PLAY_STORE_LINK).catch(function(err){return console.error('An error occurred',err);});
}
}).catch(function(err){return console.error('An error occurred',err);});
}}],


{cancelable:false});

}

if(data.error){
return(
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.refetchButton,onClick:this.props.refetchCall},_react2.default.createElement(_reactNative.Text,{style:{width:175}},'Bad Internet Connection. Click Here To Reload Shifts. First, Ensure You\'re Connected To The Internet.')));

}
return(
_react2.default.createElement(_reactNative.View,{style:{flex:665/667}},
_react2.default.createElement(_reactNative.Modal,{
transparent:true,
visible:this.props.showTopModal,
onRequestClose:this.props.closeModal,
animate:'slide'},

_react2.default.createElement(_reactNative.View,{style:styles.modalContainer},
_react2.default.createElement(_reactNative.View,{style:styles.headerContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:{marginTop:20,flex:1},onPress:this.props.closeModal},
_react2.default.createElement(_reactNative.Image,{resizeMode:'contain',
style:{width:20,height:20},
source:require('./assets/Icons_Exit.png')})),

_react2.default.createElement(_reactNative.Text,{style:styles.filterHeader},' Filter Shifts '),
_react2.default.createElement(_reactNative.View,{style:{flex:1}})),

_react2.default.createElement(_reactNative.View,{style:styles.filterSubtitleContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.filterSubtitle},' CHOOSE A STATUS TO SEE THE SHIFTS YOU\'D LIKE TO VIEW '),

_react2.default.createElement(_reactNative.View,{style:{flexDirection:'row',marginLeft:20,marginRight:20}},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:[styles.switchButton,styles.leftSwitch,this.allSelected],
onPress:function onPress(){return _this5.props.selectFilter("ALL");}},
_react2.default.createElement(_reactNative.View,{style:[styles.filterCircle,this.allCircle]}),
_react2.default.createElement(_reactNative.Text,{style:[styles.switchFontSize,this.allFont]},'All')),

_react2.default.createElement(_reactNative.TouchableOpacity,{
style:[styles.switchButton,this.scheduledSelected,{borderRightWidth:0}],
onPress:function onPress(){return _this5.props.selectFilter("BOOKED");}},
_react2.default.createElement(_reactNative.View,{style:[styles.filterCircle,styles.bookedCircle]}),
_react2.default.createElement(_reactNative.Text,{style:[styles.switchFontSize,this.bookedFont]},'Booked')),

_react2.default.createElement(_reactNative.TouchableOpacity,{style:[styles.switchButton,this.waitingSelected],
onPress:function onPress(){return _this5.props.selectFilter("PENDING");}},
_react2.default.createElement(_reactNative.View,{style:[styles.filterCircle,styles.invitedCircle]}),
_react2.default.createElement(_reactNative.Text,{style:[styles.switchFontSize,this.invitedFont]},'Pending')),

_react2.default.createElement(_reactNative.TouchableOpacity,{
style:[styles.switchButton,styles.rightSwitch,this.openSelected],
onPress:function onPress(){return _this5.props.selectFilter("OPEN");}},
_react2.default.createElement(_reactNative.View,{style:[styles.filterCircle,styles.openCircle]}),
_react2.default.createElement(_reactNative.Text,{style:[styles.switchFontSize,this.openFont]},'Open')))))),












_react2.default.createElement(_customReactNativeCalendarStrip2.default,{
dateNameStyle:styles.dateNameStyle,
dateNumberStyle:styles.dateNumberStyle,
weekendDateNameStyle:styles.dateNameStyle,
weekendDateNumberStyle:styles.dateNumberStyle,
calendarHeaderFormat:'MMMM YYYY',

hours:hours,
hoursStart:this.state.backwardStart,
calendarHeaderStyle:{
backgroundColor:'rgb(0, 0, 166)',
color:'white',
fontSize:16,
fontWeight:'400',
fontFamily:'Lato-Regular'},

selection:'bottomBorder',
selectionAnimation:{
duration:0,
borderBottomWidth:5},

borderHighlightColor:'#FFF',
onDateSelected:function onDateSelected(date){
if(date.isAfter(sectionData[sectionData.length-1].key)){
return;
}
var new_date=(0,_moment2.default)(date).add(1,'w');
_this5.setState({
backwardStart:date.startOf('day').format(),
currentDate:date.startOf('day').format(),
nextWeekDate:new_date});

_this5.clickManage(date);
},





selectedDate:this.state.currentDate,
startingDate:this.state.currentDate,
calendarColor:'rgb(0, 0, 166)',
iconLeft:require('./assets/left-arrow-white.png'),
iconRight:require('./assets/right-arrow-white.png'),
useIsoWeekday:false,
keepSelectedDateInCenter:true,
borderBottomColor:'rgb(225, 45, 35)',
calendarAnimation:{
type:'sequence',
duration:30},

renderFilter:this.renderFilter}),

this.state.displayList));


}}]);return Schedule;}(_react.Component);


var styles=_reactNative.StyleSheet.create({
refetchButton:{
display:'flex',
backgroundColor:'#fff',
height:75,
borderRadius:5,
flex:0.41,
justifyContent:'center',
alignItems:'center',
shadowRadius:4,
shadowColor:'#000000',
shadowOffset:{
width:1,
height:2},

shadowOpacity:0.5},

modalContainer:{
backgroundColor:'rgba(0,0,0,0.3)',
flex:1},

filterHeader:{
color:'#0022A1',
fontWeight:"600",
fontSize:18,
fontFamily:'Roboto',
flex:2,
textAlign:'center',
marginTop:20},

filterSubtitleContainer:{
borderTopColor:'#BBB',
borderTopWidth:1,
paddingBottom:30,
backgroundColor:'#FFF'},

filterSubtitle:{
color:'#0022A1',
alignSelf:'center',
fontFamily:'RobotoCondensed-Regular',
opacity:0.8,
fontSize:14,
paddingBottom:10,
paddingTop:15},

headerContainer:{
paddingHorizontal:20,
paddingVertical:11,
flexDirection:'row',
backgroundColor:'#FFFFFF',
justifyContent:'space-between',
alignItems:'center'},

switchButton:{
alignItems:'center',
justifyContent:'center',
borderStyle:'solid',
borderColor:'#0022A1',
borderWidth:1,
flex:1,
padding:0,
flexDirection:'row',
height:28},

leftSwitch:{
borderTopLeftRadius:4,
borderBottomLeftRadius:4,
borderRightWidth:0},

rightSwitch:{
borderTopRightRadius:4,
borderBottomRightRadius:4,
borderLeftWidth:0},

filterCircle:{
width:10,
height:10,
borderRadius:100/2,
marginLeft:6},

openCircle:{
backgroundColor:"#e12d23"},

bookedCircle:{
backgroundColor:"#00A863"},

invitedCircle:{
backgroundColor:"#FFAD33"},

switchSelect:{
backgroundColor:"#0022A1"},

switchFont:{
color:'white'},

switchFontSize:{
fontSize:13,
textAlign:'center',
flex:1,
marginRight:4,
left:-4,
backgroundColor:'transparent'},

dateNameStyle:{
fontFamily:'Lato-Regular',
color:'#FFF',
fontSize:12},

dateNumberStyle:{
fontFamily:'Lato-Regular',
color:'rgba(255, 255, 255, 0.8)',
fontSize:20,
fontWeight:'400'},

lineStyle:{
height:0.5,
width:'100%',
backgroundColor:'#444',
flex:1},

dateSeparatorText:{
paddingHorizontal:15,
fontSize:14,
color:'#444',
fontFamily:'Lato-Regular',
textAlign:'center',
textAlignVertical:'center'},

dateSeparatorContainer:{
flexDirection:'row',
flex:1,
justifyContent:'center',
alignItems:'center',
paddingTop:20,
paddingBottom:10,
backgroundColor:'#FFF'},

h1GrayLato:{
fontFamily:'Lato-Regular',
fontWeight:'bold',
fontSize:24,
color:'#999999'},

h2BlackLato:{
fontFamily:'Lato-Regular',
fontSize:20,
color:'#4A4A4A'},

h3BlackLato:{
fontFamily:'Lato-Regular',
fontSize:14,
color:'#4A4A4A'},

h3GrayLato:{
fontFamily:'Lato-Regular',
fontSize:14,
color:'#999999'}});


var ScheduleComponent=(0,_reactApollo.compose)(

(0,_reactApollo.graphql)(userShiftByStartQuery,{
name:"userShift",
options:function options(ownProps){
return{
variables:{
userid:ownProps.userid,
daystart:(0,_moment2.default)().startOf('day').format(),
dayend:(0,_moment2.default)(ownProps.start).add(3,'y').format(),
offset:0,
limit:100}};


}}),

(0,_reactApollo.graphql)(mobileVersion,{
name:"mobVersion",
options:function options(){
return{
variables:{
id:"346883e8-4fd3-48b6-a8af-71c462f0895a"}};


}}))(




Schedule);exports.default=
ScheduleComponent;