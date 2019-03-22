Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require("react-redux");
var _opportunitiesModule=require("../modules/opportunities-module");
var _OpportunitiesListing=require("../components/OpportunitiesComponent/OpportunitiesListing");var _OpportunitiesListing2=_interopRequireDefault(_OpportunitiesListing);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
data:state.opportunities.data};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_OpportunitiesListing2.default);