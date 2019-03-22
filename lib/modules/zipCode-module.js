Object.defineProperty(exports,"__esModule",{value:true});exports.actions=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};


var _reduxAction=require("redux-action");
var _axios=require("axios");var _axios2=_interopRequireDefault(_axios);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var GET_ZIP_CODE_LOCATION="GET_ZIP_CODE_LOCATION";

var getZipCodeLocation=(0,_reduxAction.createAction)(GET_ZIP_CODE_LOCATION,function(zipCode,addressName){
var url='http://maps.googleapis.com/maps/api/geocode/json?address='+zipCode;
return _axios2.default.get(url).
then(function(response){
var result=response.data;
var addressIndex=void 0;
var address=void 0;
for(var i=0;i<result.results.length;i++){
result.results[i].address_components[3]?addressIndex=i:addressIndex=null;
}
if(typeof addressIndex==='number'){
var responseAddressAComponents=result.results[addressIndex].address_components;
address=responseAddressAComponents[1].long_name+', '+responseAddressAComponents[2].short_name;
}else{
address='Invalid Zip Code';
}
return{
address:address,
zipCode:zipCode,
addressName:addressName};

});
});

var initialState={};

var actions=exports.actions={
getZipCodeLocation:getZipCodeLocation};


var zipCodeReducer=(0,_reduxAction.createReducer)(initialState,_defineProperty({},
GET_ZIP_CODE_LOCATION,function(actionPayload,state){var _extends2;

return _extends({},state,(_extends2={},_defineProperty(_extends2,actionPayload.addressName,actionPayload.address),_defineProperty(_extends2,"zipCode",actionPayload.zipCode),_extends2));
}));exports.default=


zipCodeReducer;