Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require("react-redux");
var _opportunitiesModule=require("../modules/opportunities-module");
var _OpportunitiesLocation=require("../components/OpportunitiesComponent/OpportunitiesLocation");var _OpportunitiesLocation2=_interopRequireDefault(_OpportunitiesLocation);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
opportunities:state.opportunities.data};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_OpportunitiesLocation2.default);