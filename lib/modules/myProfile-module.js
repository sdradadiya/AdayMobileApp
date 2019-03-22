Object.defineProperty(exports,"__esModule",{value:true});exports.actions=exports.SAVE_HOME_ADDRESS_ACTION=undefined;var _createReducer;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};


var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var SAVE_ID="SAVE_ID";

var SAVE_AVAILABILITY_DATA="SAVE_AVAILABILITY_DATA";

var SAVE_CONTACT_INFO_DATA="SAVE_CONTACT_INFO_DATA";

var CLEAR_USER="CLEAR_USER_DATA";

var SAVE_HOME_ADDRESS_ACTION=exports.SAVE_HOME_ADDRESS_ACTION="SAVE_HOME_ADDRESS_ACTION";

var saveId=(0,_reduxAction.createAction)(SAVE_ID,function(data){return data;});

var saveAvailabilityData=(0,_reduxAction.createAction)(SAVE_AVAILABILITY_DATA,function(id){return id;});

var saveContactInfoData=(0,_reduxAction.createAction)(SAVE_CONTACT_INFO_DATA,function(data){return data;});

var saveHomeAddressData=(0,_reduxAction.createAction)(SAVE_HOME_ADDRESS_ACTION,function(homeAddress){return homeAddress;});

var clearUserData=(0,_reduxAction.createAction)(CLEAR_USER);


var actions=exports.actions={
saveId:saveId,
saveAvailabilityData:saveAvailabilityData,
saveContactInfoData:saveContactInfoData,
saveHomeAddressData:saveHomeAddressData,
clearUserData:clearUserData};





var initialState={

availability:{
id:"",
hourRange:"FULL-TIME"},

id:"",
nodeId:"",
email:"",
homeAddress:{}};



var resetState={
availability:{
id:"",
hourRange:"FULL-TIME"},

id:"",
nodeId:"",
email:"",
homeAddress:{}};


var profileReviewReducer=(0,_reduxAction.createReducer)(initialState,(_createReducer={},_defineProperty(_createReducer,
SAVE_ID,function(actionPayload,state){
return _extends({},state,{id:actionPayload});
}),_defineProperty(_createReducer,
SAVE_AVAILABILITY_DATA,function(actionPayload,state){
return _extends({},state,{availability:actionPayload});
}),_defineProperty(_createReducer,
SAVE_CONTACT_INFO_DATA,function(actionPayload,state){
var email=actionPayload.email;
var phoneNumber=actionPayload.phoneNumber;
return _extends({},state,{email:email,phoneNumber:phoneNumber});
}),_defineProperty(_createReducer,
SAVE_HOME_ADDRESS_ACTION,function(actionPayload,state){
return _extends({},state,{homeAddress:actionPayload});
}),_defineProperty(_createReducer,
CLEAR_USER,function(actionPayload,state){
return{resetState:resetState,homeAddress:{}};
}),_createReducer));exports.default=


profileReviewReducer;