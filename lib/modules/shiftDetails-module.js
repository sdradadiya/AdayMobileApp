Object.defineProperty(exports,"__esModule",{value:true});exports.actions=exports.UPDATE_SHIFT_DATA=undefined;var _reduxAction=require("redux-action");

var initialState={
shiftDetails:{}};


var UPDATE_SHIFT_DATA=exports.UPDATE_SHIFT_DATA="UPDATE_SHIFT_DATA";

var updateShiftDetails=(0,_reduxAction.createAction)(UPDATE_SHIFT_DATA,function(userCredentials){return userCredentials;});

var actions=exports.actions={
updateShiftDetails:updateShiftDetails};


var shiftDetailsReducer=(0,_reduxAction.createReducer)(initialState,{});exports.default=


shiftDetailsReducer;