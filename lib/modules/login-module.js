Object.defineProperty(exports,"__esModule",{value:true});exports.actions=exports.LOGIN_ACTION=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var LOGIN_ACTION=exports.LOGIN_ACTION="LOGIN_ACTION";

var initialState={};

var loginAction=(0,_reduxAction.createAction)(LOGIN_ACTION,function(phoneNumber,password){
return{phoneNumber:phoneNumber,password:password};
});

var actions=exports.actions={
loginAction:loginAction};


var loginReducer=(0,_reduxAction.createReducer)(initialState,_defineProperty({},
LOGIN_ACTION,function(actionPayload,state){
return _extends({},state,{phoneNumber:actionPayload.phoneNumber,password:actionPayload.password});
}));exports.default=


loginReducer;