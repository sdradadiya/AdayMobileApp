Object.defineProperty(exports,"__esModule",{value:true});exports.actions=undefined;var _createReducer;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};



var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var ADD_POSITION="ADD_POSITION";
var ADD_INFO="ADD_INFO";
var REMOVE_POSITION="REMOVE_POSITION";

var addPosition=(0,_reduxAction.createAction)(ADD_POSITION,function(data){return data;});
var addInfo=(0,_reduxAction.createAction)(ADD_INFO,function(data){return data;});
var removePosition=(0,_reduxAction.createAction)(REMOVE_POSITION,function(data){return data;});

var actions=exports.actions={
addPosition:addPosition,
removePosition:removePosition,
addInfo:addInfo};


var initialState={
positions:[],
address:"",
franchiseStore:false,
franchiseCompany:false,
fullName:"",
phoneNumber:"",
companyName:"",
title:""};


var myStoreReducer=(0,_reduxAction.createReducer)(initialState,(_createReducer={},_defineProperty(_createReducer,
ADD_POSITION,function(actionPayload,state){
var positions=state.positions.slice();
positions.push(actionPayload);
return _extends({},state,{positions:positions});
}),_defineProperty(_createReducer,
REMOVE_POSITION,function(actionPayload,state){
var index=state.positions.indexOf(actionPayload);
state.positions.splice(index,1);
return _extends({},state);
}),_defineProperty(_createReducer,
ADD_INFO,function(actionPayload,state){
return _extends({},state,actionPayload);
}),_createReducer));exports.default=


myStoreReducer;