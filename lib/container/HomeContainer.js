Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require("react-redux");


var _homeModule=require("../modules/home-module");


var _HomeComponent=require("../components/HomeComponent/HomeComponent");var _HomeComponent2=_interopRequireDefault(_HomeComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
state:state};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{}};};exports.default=


(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_HomeComponent2.default);