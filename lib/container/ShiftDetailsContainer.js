Object.defineProperty(exports,"__esModule",{value:true});var _react=require("react");var _react2=_interopRequireDefault(_react);
var _reactRedux=require("react-redux");
var _shiftDetailsModule=require("../modules/shiftDetails-module");
var _ShiftDetailsComponent=require("../components/ShiftDetailsComponent/ShiftDetailsComponent");var _ShiftDetailsComponent2=_interopRequireDefault(_ShiftDetailsComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
shiftDetails:state.shiftDetails.shiftDetails,
state:state};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
updateShiftDetails:function updateShiftDetails(credentials){
dispatch(_shiftDetailsModule.actions.updateShiftDetails(credentials));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_ShiftDetailsComponent2.default);