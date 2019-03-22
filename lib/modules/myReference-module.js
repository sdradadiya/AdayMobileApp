Object.defineProperty(exports,"__esModule",{value:true});exports.actions=undefined;var _createReducer;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};


var _reduxAction=require("redux-action");function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var SAVE_REFERENCE_DATA="SAVE_REFERENCE_DATA";
var UPDATE_REFERENCE_DATA="UPDATE_REFERENCE_DATA";
var REMOVE_REFERENCE="REMOVE_REFERENCE";
var ADD_CONTACTS="ADD_CONTACTS";
var CLEAR_REFERENCES="CLEAR_REFERENCES";

var saveReferenceData=(0,_reduxAction.createAction)(SAVE_REFERENCE_DATA,function(data){return data;});
var updateReferenceData=(0,_reduxAction.createAction)(UPDATE_REFERENCE_DATA,function(data){return data;});
var removeReference=(0,_reduxAction.createAction)(REMOVE_REFERENCE,function(data){return data;});
var addContacts=(0,_reduxAction.createAction)(ADD_CONTACTS,function(data){return data;});
var clearReferences=(0,_reduxAction.createAction)(CLEAR_REFERENCES);

var actions=exports.actions={
saveReferenceData:saveReferenceData,
updateReferenceData:updateReferenceData,
removeReference:removeReference,
addContacts:addContacts,
clearReferences:clearReferences};


var initialState={
myReferences:[]};


var myReferenceReducer=(0,_reduxAction.createReducer)(initialState,(_createReducer={},_defineProperty(_createReducer,
SAVE_REFERENCE_DATA,function(actionPayload,state){
var myReferences=state.myReferences;
if(actionPayload.length>0){
actionPayload.map(function(ref){
myReferences.push(ref);
});
}else if(actionPayload['firstName']){
myReferences.push(actionPayload);

}else{
myReferences;
}
return _extends({},state,{myReferences:myReferences});
}),_defineProperty(_createReducer,
UPDATE_REFERENCE_DATA,function(actionPayload,state){
var myReferences=state.myReferences;
for(var i=0;i<myReferences.length;i++){
if(myReferences[i].id===actionPayload.id){
myReferences.splice(i,1);
myReferences.push(actionPayload);
break;
}
}
return _extends({},state,{myReferences:myReferences});
}),_defineProperty(_createReducer,
REMOVE_REFERENCE,function(actionPayload,state){
var myReferences=state.myReferences;
for(var i=0;i<myReferences.length;i++){
if(myReferences[i].id===actionPayload){
myReferences.splice(i,1);
break;
}
}
return _extends({},state,{myReferences:myReferences});
}),_defineProperty(_createReducer,
ADD_CONTACTS,function(actionPayload,state){
var newList=state.myReferences.concat(actionPayload);
return _extends({},state,{myReferences:newList});
}),_defineProperty(_createReducer,
CLEAR_REFERENCES,function(actionPayload,state){
return{myReferences:[]};
}),_createReducer));exports.default=


myReferenceReducer;