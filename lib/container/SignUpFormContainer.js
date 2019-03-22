Object.defineProperty(exports,"__esModule",{value:true});

var _react=require("react");var _react2=_interopRequireDefault(_react);


var _reactRedux=require("react-redux");


var _signUpFormModule=require("../modules/signUpForm-module");


var _SignUpFormComponent=require("../components/SignUpFormComponent");var _SignUpFormComponent2=_interopRequireDefault(_SignUpFormComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
state:state};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
saveSignUpData:function saveSignUpData(credentials){
dispatch(_signUpFormModule.actions.saveSignUpData(credentials));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_SignUpFormComponent2.default);