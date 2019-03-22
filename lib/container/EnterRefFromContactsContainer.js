Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _myReferenceModule=require("../modules/myReference-module");
var _EnterRefFromContacts=require("../components/ReferenceComponent/EnterRefFromContacts");var _EnterRefFromContacts2=_interopRequireDefault(_EnterRefFromContacts);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{
references:store.myReferences.myReferences};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
saveReferenceData:function saveReferenceData(data){
dispatch(_myReferenceModule.actions.saveReferenceData(data));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_EnterRefFromContacts2.default);