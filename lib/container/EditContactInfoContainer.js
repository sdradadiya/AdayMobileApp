Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _myProfileModule=require("../modules/myProfile-module");
var _EditContactInfoComponent=require("../components/EditContactInfoComponent");var _EditContactInfoComponent2=_interopRequireDefault(_EditContactInfoComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
updateContactInfo:function updateContactInfo(data){
dispatch(_myProfileModule.actions.saveContactInfoData(data));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_EditContactInfoComponent2.default);