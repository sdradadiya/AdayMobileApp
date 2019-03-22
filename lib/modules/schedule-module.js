Object.defineProperty(exports,"__esModule",{value:true});exports.actions=exports.UPDATE_SHIFT_DATA=exports.ADD_SHIFT_DATA=undefined;var _createReducer;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};


var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}
var ADD_SHIFT_DATA=exports.ADD_SHIFT_DATA="ADD_SHIFT_DATA";
var UPDATE_SHIFT_DATA=exports.UPDATE_SHIFT_DATA="UPDATE_SHIFT_DATA";

var addShiftData=(0,_reduxAction.createAction)(ADD_SHIFT_DATA,function(data){return data;});


var initialState={};


var actions=exports.actions={
addShiftData:addShiftData};


var schedulesReducer=(0,_reduxAction.createReducer)(initialState,(_createReducer={},_defineProperty(_createReducer,
ADD_SHIFT_DATA,function(actionPayload,store){
actionPayload.map(function(schedule){
store[schedule.id]=schedule;
});
return _extends({},store);
}),_defineProperty(_createReducer,
UPDATE_SHIFT_DATA,function(actionPayload,store){
store[actionPayload.id]=actionPayload;
return _extends({},store);
}),_createReducer));exports.default=


schedulesReducer;