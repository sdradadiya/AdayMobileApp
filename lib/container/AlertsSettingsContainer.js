Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _alertsSettingsModule=require("../modules/alertsSettings-module");
var _AlertSettings=require("../components/SettingsComponent/AlertSettings");var _AlertSettings2=_interopRequireDefault(_AlertSettings);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
state:state};

};

var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
getAlertSettingsData:function getAlertSettingsData(){
dispatch(_alertsSettingsModule.actions.getAlertsSettings());
},
changeAlertSettings:function changeAlertSettings(name){
dispatch(_alertsSettingsModule.actions.changeAlertSetting(name));
},
changeSnoozeStartSettings:function changeSnoozeStartSettings(name){
dispatch(_alertsSettingsModule.actions.changeSnoozeStartSetting(name));
},
changeSnoozeEndSettings:function changeSnoozeEndSettings(name){
dispatch(_alertsSettingsModule.actions.changeSnoozeEndSetting(name));
},
changeIdAlertSetting:function changeIdAlertSetting(name){
dispatch(_alertsSettingsModule.actions.changeIdAlertSetting(name));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_AlertSettings2.default);