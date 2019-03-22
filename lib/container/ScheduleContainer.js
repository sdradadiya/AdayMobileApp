Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _scheduleModule=require("../modules/schedule-module");
var _ScheduleComponent=require("../components/ScheduleComponent");var _ScheduleComponent2=_interopRequireDefault(_ScheduleComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{
store:store};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
addShiftData:function addShiftData(data){
dispatch(_scheduleModule.actions.addShiftData(data));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_ScheduleComponent2.default);