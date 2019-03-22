Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require("react-redux");
var _opportunitiesModule=require("../modules/opportunities-module");
var _OpportunitiesComponent=require("../components/OpportunitiesComponent");var _OpportunitiesComponent2=_interopRequireDefault(_OpportunitiesComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
state:state};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_OpportunitiesComponent2.default);