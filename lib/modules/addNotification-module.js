Object.defineProperty(exports,"__esModule",{value:true});exports.actions=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};


var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var ADD_NOTIFICATION="ADD_NOTIFICATION";

var addNotification=(0,_reduxAction.createAction)(ADD_NOTIFICATION,function(notification){return notification;});

var actions=exports.actions={
addNotification:addNotification};


var initialState={
notifications:[]};


var educationHistoryReducer=(0,_reduxAction.createReducer)(initialState,_defineProperty({},
ADD_NOTIFICATION,function(actionPayload,state){
var educationHistory=state.educationHistory.slice();
educationHistory.push(actionPayload);
return _extends({},state,{educationHistory:educationHistory});
}));exports.default=


addNotification;