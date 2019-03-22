Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require("react-redux");
var _loginModule=require("../modules/login-module");
var _LoginComponent=require("../components/LoginComponent");var _LoginComponent2=_interopRequireDefault(_LoginComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
state:state};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
loginAction:function loginAction(email,password){
dispatch(_loginModule.actions.loginAction(email,password));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_LoginComponent2.default);