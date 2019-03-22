Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _accountModule=require("../modules/account-module");
var _myProfileModule=require("../modules/myProfile-module");
var _AccountComponent=require("../components/AccountComponent/AccountComponent");var _AccountComponent2=_interopRequireDefault(_AccountComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{
store:store};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
saveId:function saveId(id){
dispatch(_myProfileModule.actions.saveId(id));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_AccountComponent2.default);