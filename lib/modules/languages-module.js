Object.defineProperty(exports,"__esModule",{value:true});exports.actions=undefined;var _createReducer;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var SAVE_LANGUAGE="SAVE_LANGUAGE";
var DELETE_LANGUAGE="DELETE_LANGUAGE";

var saveLanguage=(0,_reduxAction.createAction)(SAVE_LANGUAGE,function(data){return data;});
var deleteLanguage=(0,_reduxAction.createAction)(DELETE_LANGUAGE,function(data){return data;});

var actions=exports.actions={
saveLanguage:saveLanguage,
deleteLanguage:deleteLanguage};


var initialState={
languages:[]};


var languageReducer=(0,_reduxAction.createReducer)(initialState,(_createReducer={},_defineProperty(_createReducer,
SAVE_LANGUAGE,function(actionPayload,state){
var languages=state.languages.slice();
var index=languages.findIndex(function(language){return language.id===actionPayload.id;});

if(actionPayload.length===0){
return _extends({},state);
}
if(actionPayload.length){
return _extends({},state,{languages:actionPayload});
}

if(index!==-1){
languages[index]=actionPayload;
}else{
languages.push(actionPayload);
}

return _extends({},state,{languages:languages});
}),_defineProperty(_createReducer,
DELETE_LANGUAGE,function(actionPayload,state){
var languages=state.languages.slice();
var index=languages.findIndex(function(language){return language.id===actionPayload;});
if(index!==-1){
languages.splice(index,1);
}
return _extends({},state,{languages:languages});
}),_createReducer));exports.default=


languageReducer;