Object.defineProperty(exports,"__esModule",{value:true});exports.actions=exports.CLEAR_HOME_ADDRESS_ACTION=exports.SAVE_HOME_ADDRESS_ACTION=undefined;var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var SAVE_HOME_ADDRESS_ACTION=exports.SAVE_HOME_ADDRESS_ACTION="SAVE_HOME_ADDRESS_ACTION";
var CLEAR_HOME_ADDRESS_ACTION=exports.CLEAR_HOME_ADDRESS_ACTION="CLEAR_HOME_ADDRESS_ACTION";

var initialState={};

var clearHomeAddressAction=(0,_reduxAction.createAction)(CLEAR_HOME_ADDRESS_ACTION);
var actions=exports.actions={
clearHomeAddressAction:clearHomeAddressAction};


var homeAddressReducer=(0,_reduxAction.createReducer)(initialState,_defineProperty({},
CLEAR_HOME_ADDRESS_ACTION,function(actionPayload,state){
return{};
}));exports.default=


homeAddressReducer;