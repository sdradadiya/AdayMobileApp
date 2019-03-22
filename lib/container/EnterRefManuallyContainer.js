Object.defineProperty(exports,"__esModule",{value:true});


var _reactRedux=require("react-redux");
var _myReferenceModule=require("../modules/myReference-module");
var _EnterRefManuallyComponent=require("../components/ReferenceComponent/EnterRefManuallyComponent");var _EnterRefManuallyComponent2=_interopRequireDefault(_EnterRefManuallyComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{
references:store.myReferences.myReferences,
store:store};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
saveReferenceData:function saveReferenceData(data){
dispatch(_myReferenceModule.actions.saveReferenceData(data));
},
updateReferenceData:function updateReferenceData(data){
dispatch(_myReferenceModule.actions.updateReferenceData(data));
},
removeReferenceData:function removeReferenceData(data){
dispatch(_myReferenceModule.actions.removeReference(data));
},
addContacts:function addContacts(data){
dispatch(_myReferenceModule.actions.addContacts(data));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_EnterRefManuallyComponent2.default);