Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _zipCodeModule=require("../modules/zipCode-module");
var _ZipCodeComponent=require("../components/ZipCodeComponent");var _ZipCodeComponent2=_interopRequireDefault(_ZipCodeComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{
state:store};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
getZipCodeLocation:function getZipCodeLocation(zipCode,addressName){
dispatch(_zipCodeModule.actions.getZipCodeLocation(zipCode,addressName));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_ZipCodeComponent2.default);