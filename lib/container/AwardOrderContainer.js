Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _AwardOrderComponent=require("../components/AwardOrderComponent");var _AwardOrderComponent2=_interopRequireDefault(_AwardOrderComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{
store:store};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{}};};exports.default=




(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_AwardOrderComponent2.default);