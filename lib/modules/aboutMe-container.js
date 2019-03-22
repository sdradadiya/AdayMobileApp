Object.defineProperty(exports,"__esModule",{value:true});exports.actions=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};
var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var SAVE_ABOUT_ME_DATA="SAVE_ABOUT_ME_DATA";

var saveAboutMeData=(0,_reduxAction.createAction)(SAVE_ABOUT_ME_DATA,function(data){return data;});

var actions=exports.actions={
saveAboutMeData:saveAboutMeData};


var initialState={
id:'id',
firstName:'First Name',
lastName:'Last Name',
aboutMeText:'About Me',
userEmail:'',
avatarUrl:''};


var aboutMeReducer=(0,_reduxAction.createReducer)(initialState,_defineProperty({},
SAVE_ABOUT_ME_DATA,function(actionPayload,state){
return _extends({},state,actionPayload);
}));exports.default=


aboutMeReducer;