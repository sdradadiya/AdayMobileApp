Object.defineProperty(exports,"__esModule",{value:true});exports.actions=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var initialState={
userCredentials:{}};


var SAVE_DATA="SAVE_DATA";

var saveSignUpData=(0,_reduxAction.createAction)(SAVE_DATA,function(userCredentials){return userCredentials;});

var actions=exports.actions={
saveSignUpData:saveSignUpData};


var signUpReducer=(0,_reduxAction.createReducer)(initialState,_defineProperty({},
SAVE_DATA,function(actionPayload,state){
var userCredentials=state.userCredentials?state.userCredentials:{};
var userNewCredentials=_extends(userCredentials,actionPayload);
return newState=_extends({},state,{userCredentials:userNewCredentials});
}));exports.default=


signUpReducer;