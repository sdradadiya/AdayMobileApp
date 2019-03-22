Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['query userInfo($email: String!){\n        allUsers(condition: { userEmail: $email }){\n             edges{\n                node{\n                  id\n                  firstName\n                  lastName\n                  avatarUrl\n                  employeesByUserId{\n                    edges{\n                      node{\n                        id\n                        corporationId\n                        accessesByEmployeeId{\n                          nodes{\n                            brandId\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n            }\n    }\n}'],['query userInfo($email: String!){\n        allUsers(condition: { userEmail: $email }){\n             edges{\n                node{\n                  id\n                  firstName\n                  lastName\n                  avatarUrl\n                  employeesByUserId{\n                    edges{\n                      node{\n                        id\n                        corporationId\n                        accessesByEmployeeId{\n                          nodes{\n                            brandId\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n            }\n    }\n}']);
var _react=require('react');var React=_interopRequireWildcard(_react);

var _reactNative=require('react-native');











var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactApollo=require('react-apollo');
var _reactNativeDrawer=require('react-native-drawer');var _reactNativeDrawer2=_interopRequireDefault(_reactNativeDrawer);
var _styles=require('../../styles');var _styles2=_interopRequireDefault(_styles);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _PreferencesComponent=require('../PreferencesComponent/PreferencesComponent');var _PreferencesComponent2=_interopRequireDefault(_PreferencesComponent);


var _MyProfileContainer=require('../../container/MyProfileContainer.js');var _MyProfileContainer2=_interopRequireDefault(_MyProfileContainer);
var _SideMenu=require('../SideMenu');var _SideMenu2=_interopRequireDefault(_SideMenu);
var _ScheduleContainer=require('../../container/ScheduleContainer');var _ScheduleContainer2=_interopRequireDefault(_ScheduleContainer);
var _LogOutContainer=require('../../container/LogOutContainer');var _LogOutContainer2=_interopRequireDefault(_LogOutContainer);
var _OpportunitiesContainer=require('../../container/OpportunitiesContainer');var _OpportunitiesContainer2=_interopRequireDefault(_OpportunitiesContainer);
var _SpinnerComponent=require('./../SpinnerComponent');var _SpinnerComponent2=_interopRequireDefault(_SpinnerComponent);
var _OpportunityFilter=require('../OpportunitiesComponent/OpportunityFilter');var _OpportunityFilter2=_interopRequireDefault(_OpportunityFilter);
var _constants=require('../../constants');
var _OpportunitiesList=require('../OpportunitiesComponent/OpportunitiesList');var _OpportunitiesList2=_interopRequireDefault(_OpportunitiesList);

var _InitViewInstruction=require('../InitViewInstruction');var _InitViewInstruction2=_interopRequireDefault(_InitViewInstruction);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=



_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var







Account=function(_React$Component){_inherits(Account,_React$Component);
function Account(props){_classCallCheck(this,Account);var _this=_possibleConstructorReturn(this,(Account.__proto__||Object.getPrototypeOf(Account)).call(this,
props));_this.

































































































































































































































onTodayIconClick=function(){
var date=new Date();
_this.child.clickManage((0,_moment2.default)(date));
};_this.state={filterState:"ALL",currentTab:'SCHEDULE',component:'',shiftStart:(0,_moment2.default)().startOf('day').format(),shiftEnd:(0,_moment2.default)().endOf('day').format(),showMenu:false,shiftIcon:require('../assets/BlueShifts.png'),shiftBorderColor:"#0022A1",showTopModal:false,tab:0,showFilter:false,showInit:true};_reactNative.AsyncStorage.getItem("initMenu").then(function(val){_this.setState({showInit:val?false:true});});if(_this.props.tab){_this.state.currentTab=_this.props.tab;}_this.onChangeTabs=_this.onChangeTabs.bind(_this);_this.goTo=_this.goTo.bind(_this);_this.openTopMenu=_this.openTopMenu.bind(_this);_this.closeTopMenu=_this.closeTopMenu.bind(_this);_this.selectFilter=_this.selectFilter.bind(_this);_this.changeDate=_this.changeDate.bind(_this);_this.toggleFilter=_this.toggleFilter.bind(_this);_this.initGotIt=_this.initGotIt.bind(_this);_constants.Tracker.trackScreenView("Account");return _this;}_createClass(Account,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){var _this2=this;if(nextProps.data.allUsers&&!this.state.foundId){this.setState({foundId:true},function(){var user=nextProps.data.allUsers.edges[0].node;var userid=user.id;_this2.props.actions.saveId(userid);});}}},{key:'onChangeTabs',value:function onChangeTabs(tab){this._drawer.close();if(tab===0){this.setState({currentTab:'SCHEDULE'});}if(tab===1){this.setState({currentTab:'OPPORTUNITIES'});}if(tab===2){this.setState({currentTab:'PROFILE'});}if(tab===3){this.setState({currentTab:'PREFERENCES'});}if(tab===4){this.setState({currentTab:'SETTINGS'});}}},{key:'openTopMenu',value:function openTopMenu(){this.setState({showTopModal:true});}},{key:'closeTopMenu',value:function closeTopMenu(){this.setState({showTopModal:false});}},{key:'selectFilter',value:function selectFilter(filter){this.closeTopMenu();this.setState({filterState:filter});if(filter==="ALL"){this.setState({shiftIcon:require('../assets/BlueShifts.png'),shiftBorderColor:"#0022A1"});}if(filter==="OPEN"){this.setState({shiftIcon:require('../assets/GreenShifts.png'),shiftBorderColor:"#00A863"});}if(filter==="PENDING"){this.setState({shiftIcon:require('../assets/YellowShifts.png'),shiftBorderColor:"#FFAD33"});}if(filter==="INVITED"){this.setState({shiftIcon:require('../assets/YellowShifts.png'),shiftBorderColor:"#FFAD33"});}if(filter==="BOOKED"){this.setState({shiftIcon:require('../assets/RedShifts.png'),shiftBorderColor:"#E33821"});}}},{key:'changeDate',value:function changeDate(date){}},{key:'goTo',value:function goTo(){if(this.state.tab===0){_reactNativeRouterFlux.Actions.AddNotification({});}else if(this.state.tab===1){_reactNativeRouterFlux.Actions.MyEmployee({});}else{}}},{key:'toggleFilter',value:function toggleFilter(){var status=this.state.showFilter;this.setState({showFilter:!status});}},{key:'initGotIt',value:function initGotIt(){this.setState({showInit:false});_reactNative.AsyncStorage.setItem("initMenu","false");}},{key:'renderFilterIcon',value:function renderFilterIcon(){var filter=this.state.filterState;if(filter==="ALL"){return React.createElement(_reactNative.View,{style:styles.circleView},React.createElement(_reactNative.View,{style:{flexDirection:'row'}},React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'#00A863'}]}),React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'#FFAD33'}]}),React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'#E33820'}]})),React.createElement(_reactNative.Text,{style:styles.filterText},'FILTER'));}if(filter==="OPEN"){return React.createElement(_reactNative.View,{style:styles.circleView},React.createElement(_reactNative.View,{style:{flexDirection:'row'}},React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'transparent'}]}),React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'transparent'}]}),React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'#E33820'}]})),React.createElement(_reactNative.Text,{style:styles.filterText},'FILTER'));}if(filter==="PENDING"){return React.createElement(_reactNative.View,{style:styles.circleView},React.createElement(_reactNative.View,{style:{flexDirection:'row'}},React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'transparent'}]}),React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'#FFAD33'}]}),React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'transparent'}]})),React.createElement(_reactNative.Text,{style:styles.filterText},'FILTER'));}if(filter==="BOOKED"){return React.createElement(_reactNative.View,{style:styles.circleView},React.createElement(_reactNative.View,{style:{flexDirection:'row'}},React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'#00A863'}]}),React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'transparent'}]}),React.createElement(_reactNative.View,{style:[styles.circleDotStyle,{backgroundColor:'transparent'}]})),React.createElement(_reactNative.Text,{style:styles.filterText},'FILTER'));}}},{key:'onClick',value:function onClick(){this.child&&this.child.refetch("true");}},{key:'render',value:function render()

{var _this3=this;
if(!this.props.data.error){
if(this.props.data.loading||this.state.isLoading){
return(
React.createElement(_reactNative.View,{style:{flex:1,top:0,position:'absolute',zIndex:100}},
React.createElement(_SpinnerComponent2.default,null)));


}
var user=this.props.data.allUsers.edges[0].node;
var userid=user.id;
var menu=React.createElement(_SideMenu2.default,{onChangeTabs:this.onChangeTabs,firstName:user.firstName,lastName:user.lastName,
avatar:user.avatarUrl});var _state=




this.state,showFilter=_state.showFilter,showInit=_state.showInit;

return(
React.createElement(_reactNativeDrawer2.default,{
type:'overlay',
content:menu,
tapToClose:true,
openDrawerOffset:0.55,
ref:function ref(_ref){return _this3._drawer=_ref;},
styles:drawerStyles,
tweenHandler:function tweenHandler(ratio){return{
main:{opacity:(2-ratio)/2}};}},


React.createElement(_reactNative.View,{style:styles.container},


_reactNative.Platform.OS==='ios'?React.createElement(_reactNative.View,{style:{height:20,backgroundColor:_constants.HEADER_COLOR}}):React.createElement(_reactNative.View,{style:{height:0,backgroundColor:_constants.HEADER_COLOR}}),


React.createElement(_reactNative.View,{style:styles.headerContainer},

React.createElement(_reactNative.View,{style:{flex:55/375}},
React.createElement(_reactNative.TouchableOpacity,{style:{flex:1,justifyContent:"center"},onPress:function onPress(){_this3._drawer.open();}},
React.createElement(_reactNative.Image,{style:styles.avatarStyle,source:{uri:user.avatarUrl+"?"+new Date().getTime()}}))),



React.createElement(_reactNative.View,{style:{flex:55/375}},
this.state.currentTab==="SCHEDULE"&&
React.createElement(_reactNative.TouchableOpacity,{onPress:this.openTopMenu,style:{justifyContent:'center',alignItems:'center',flex:1}},
this.renderFilterIcon())),




React.createElement(_reactNative.View,{style:{flex:145/375}},
React.createElement(_reactNative.TouchableOpacity,{
style:{justifyContent:'center',alignItems:'center',flex:1},
onPress:this.onClick.bind(this)},
React.createElement(_reactNative.Image,{style:{width:35,resizeMode:'contain'},source:require('./../assets/logos/app_logo.png')}))),



React.createElement(_reactNative.View,{style:{flex:55/375}},

this.state.currentTab==="OPPORTUNITIES"&&
React.createElement(_reactNative.TouchableOpacity,{style:{marginRight:15},onPress:function onPress(){return _reactNativeRouterFlux.Actions.OpportunitiesLocation({});}},
React.createElement(_reactNative.Image,{style:{width:18,height:28},
source:require('../assets/locationIcon.png')})),





this.state.currentTab=="SCHEDULE"&&
React.createElement(_reactNative.TouchableOpacity,{style:{justifyContent:'center',alignItems:'center',flex:1},
onPress:this.onTodayIconClick},
React.createElement(_reactNative.Image,{style:{width:27,height:27},
source:require('../assets/icons/today-icon.png')}))),






React.createElement(_reactNative.View,{style:{flex:55/375,width:"100%"}},
this.state.currentTab==="SCHEDULE"&&

React.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _reactNativeRouterFlux.Actions.SchedulingOptions({userId:userid});},style:{justifyContent:'center',alignItems:'center',flex:1}},
React.createElement(_reactNative.Image,{style:{width:27,height:27},source:require('../assets/icons/menu.png')})),




this.state.currentTab==="OPPORTUNITIES"&&
React.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return _this3.toggleFilter();}},
React.createElement(_reactNative.Image,{style:{width:28,height:27},
source:require('../assets/searchIcon.png')})))),






this.state.currentTab=="SCHEDULE"&&
React.createElement(_ScheduleContainer2.default,{onRef:function onRef(ref){return _this3.child=ref;},
showTopModal:this.state.showTopModal,
closeModal:this.closeTopMenu,
filter:this.state.filterState,
selectFilter:this.selectFilter,
calendarBorderColor:this.state.shiftBorderColor,
changeDate:this.changeDate,
refetchCall:this.onClick.bind(this),
userid:userid,
start:this.state.shiftStart,
end:this.state.shiftEnd}),


this.state.currentTab==="PROFILE"&&
React.createElement(_MyProfileContainer2.default,null),

this.state.currentTab==="SETTINGS"&&
React.createElement(_LogOutContainer2.default,{userId:userid}),

this.state.currentTab==="PREFERENCES"&&
React.createElement(_PreferencesComponent2.default,null),

this.state.currentTab==="OPPORTUNITIES"&&
React.createElement(_OpportunitiesContainer2.default,null)),


showFilter&&
React.createElement(_OpportunityFilter2.default,{toggleFilter:this.toggleFilter}),

showInit&&React.createElement(_InitViewInstruction2.default,{initGotIt:this.initGotIt})));


}else{
_reactNative.Alert.alert('ADay','Your Request Couldn\'t Be Completed');
return null;
}
}}]);return Account;}(React.Component);

var userInfo=(0,_reactApollo.gql)(_templateObject);


























var AccountComponent=(0,_reactApollo.graphql)(userInfo,{
options:function options(ownProps){
return{
variables:{
email:ownProps.email||ownProps.store.myProfile.email}};


}})(
Account);exports.default=

AccountComponent;

var drawerStyles={
drawer:{shadowColor:'#000000',shadowOpacity:0.8,backgroundColor:'#FFFFFF'},
main:{paddingLeft:0}};


var styles=_reactNative.StyleSheet.create({
container:{
flexDirection:"column",
justifyContent:'flex-start',

backgroundColor:'#F7F7F7',
flex:1},

headerContainer:{
height:44,
flexDirection:'row',
backgroundColor:_constants.HEADER_COLOR,
alignItems:'center',
justifyContent:'center',
borderBottomColor:'#B8B8B8',
borderBottomWidth:1},

headerHamburgerIcon:{
width:30,
height:30},

avatarStyle:{
width:30,
height:30,
alignSelf:"center",
borderRadius:15,
shadowColor:'#000000',
shadowOffset:{
width:0,
height:2},

shadowOpacity:0.25},

circleView:{
justifyContent:'center',alignItems:'center',flex:0.003},

circleDotStyle:{
marginHorizontal:1,
height:9,
width:9,
borderRadius:9,
borderWidth:1,
borderColor:'#FFF'},

filterText:{
fontSize:10,color:'#fff',marginTop:2}});