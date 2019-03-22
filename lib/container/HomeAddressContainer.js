Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _myProfileModule=require("../modules/myProfile-module");
var _HomeAddressComponent=require("../components/HomeAddressComponent");var _HomeAddressComponent2=_interopRequireDefault(_HomeAddressComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
state:state};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
saveHomeAddress:function saveHomeAddress(homeAddress){
dispatch(_myProfileModule.actions.saveHomeAddressData(homeAddress));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_HomeAddressComponent2.default);