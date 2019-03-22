Object.defineProperty(exports,"__esModule",{value:true});var _react=require("react");var _react2=_interopRequireDefault(_react);
var _reactRedux=require("react-redux");
var _myProfileModule=require("../modules/myProfile-module");
var _aboutMeContainer=require("../modules/aboutMe-container");
var _myReferenceModule=require("../modules/myReference-module");
var _languagesModule=require("../modules/languages-module");
var _SettingsComponent=require("../components/SettingsComponent/SettingsComponent");var _SettingsComponent2=_interopRequireDefault(_SettingsComponent);
var _homeAddressModule=require("../modules/homeAddress-module");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
state:state};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
clearUserData:function clearUserData(data){
dispatch(_myReferenceModule.actions.clearReferences());
dispatch(_homeAddressModule.actions.clearHomeAddressAction());
dispatch(_myProfileModule.actions.clearUserData());
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_SettingsComponent2.default);