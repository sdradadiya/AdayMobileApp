Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _alertsSettingsModule=require("../modules/alertsSettings-module");
var _Alerts=require("../components/SettingsComponent/Alerts");var _Alerts2=_interopRequireDefault(_Alerts);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

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
changeIdAlertSetting:function changeIdAlertSetting(name){
dispatch(_alertsSettingsModule.actions.changeIdAlertSetting(name));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_Alerts2.default);