Object.defineProperty(exports,"__esModule",{value:true});exports.actions=undefined;var _createReducer;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};


var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}
var GET_ALERTS_SETTINGS="GET_ALERTS_SETTINGS";
var CHANGE_ALERT_SETTING="CHANGE_ALERT_SETTING";
var CHANGE_ID_ALERT_SETTING="CHANGE_ID_ALERT_SETTING";
var CHANGE_START_SETTING="CHANGE_START_SETTING";
var CHANGE_END_SETTING="CHANGE_END_SETTING";

var getAlertsSettingsAction=(0,_reduxAction.createAction)(GET_ALERTS_SETTINGS,function(){
var alertsSettings={
assignedPush:true,
assignedEmail:true,
updatesPush:true,
updatesEmail:true,
cancellationsPush:true,
cancellationsEmail:true,
cancellationsPhone:true,
newShiftsPush:true,
newShiftsEmail:true,
newShiftsPhone:true,
newShiftsTextMessage:true,
isSnoozed:true,
snoozeStart:null,
snoozeEnd:null};

return alertsSettings;
});

var changeAlertSettingAction=(0,_reduxAction.createAction)(CHANGE_ALERT_SETTING,function(name){return name;});
var changeSnoozeStartSettingAction=(0,_reduxAction.createAction)(CHANGE_START_SETTING,function(name){return name;});
var changeSnoozeEndSettingAction=(0,_reduxAction.createAction)(CHANGE_END_SETTING,function(name){return name;});
var changeIdAlertSettingAction=(0,_reduxAction.createAction)(CHANGE_ID_ALERT_SETTING,function(name){return name;});

var initialState={
assignedPush:true,
assignedEmail:true,
updatesPush:true,
updatesEmail:true,
cancellationsPush:true,
cancellationsEmail:true,
cancellationsPhone:true,
newShiftsPush:true,
newShiftsEmail:true,
newShiftsPhone:true,
newShiftsTextMessage:true,
updateId:null,
createId:null,
openId:null,
phoneId:null,
deleteId:null,
isSnoozed:true,
snoozeStart:null,
snoozeEnd:null};


var actions=exports.actions={
getAlertsSettings:getAlertsSettingsAction,
changeAlertSetting:changeAlertSettingAction,
changeSnoozeStartSetting:changeSnoozeStartSettingAction,
changeSnoozeEndSetting:changeSnoozeEndSettingAction,
changeIdAlertSetting:changeIdAlertSettingAction};


var alertsSettingsReducer=(0,_reduxAction.createReducer)(initialState,(_createReducer={},_defineProperty(_createReducer,
GET_ALERTS_SETTINGS,function(actionPayload,state){
var newState=actionPayload.alertsSettings;
return _extends({},newState);
}),_defineProperty(_createReducer,
CHANGE_ALERT_SETTING,function(actionPayload,state){
var newAlertsSettings=state;
newAlertsSettings[actionPayload]=!newAlertsSettings[actionPayload];
return _extends({},newAlertsSettings);
}),_defineProperty(_createReducer,
CHANGE_START_SETTING,function(actionPayload,state){
var newAlertsSettings=state;
newAlertsSettings['snoozeStart']=actionPayload;
return _extends({},newAlertsSettings);
}),_defineProperty(_createReducer,
CHANGE_END_SETTING,function(actionPayload,state){
var newAlertsSettings=state;
newAlertsSettings['snoozeEnd']=actionPayload;
return _extends({},newAlertsSettings);
}),_defineProperty(_createReducer,
CHANGE_ID_ALERT_SETTING,function(actionPayload,state){
var newAlertsSettings=state;
newAlertsSettings[actionPayload.type]=actionPayload.id;
return _extends({},newAlertsSettings);
}),_createReducer));exports.default=


alertsSettingsReducer;