Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _changePasswordModule=require("../modules/changePassword-module");
var _ChangePassword=require("../components/SettingsComponent/ChangePassword");var _ChangePassword2=_interopRequireDefault(_ChangePassword);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{
store:store};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{}};};exports.default=




(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_ChangePassword2.default);