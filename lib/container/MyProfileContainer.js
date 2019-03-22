Object.defineProperty(exports,"__esModule",{value:true});var _react=require("react");var _react2=_interopRequireDefault(_react);
var _reactRedux=require("react-redux");
var _myProfileModule=require("../modules/myProfile-module");
var _aboutMeContainer=require("../modules/aboutMe-container");
var _myReferenceModule=require("../modules/myReference-module");
var _languagesModule=require("../modules/languages-module");
var _MyProfileComponent=require("../components/MyProfileComponent");var _MyProfileComponent2=_interopRequireDefault(_MyProfileComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(state){
return{
state:state,
shiftDetails:state.shiftDetails.shiftDetails};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
saveAvailabilityData:function saveAvailabilityData(data){
dispatch(_myProfileModule.actions.saveAvailabilityData(data));
},
saveContactInfo:function saveContactInfo(data){
dispatch(_myProfileModule.actions.saveContactInfoData(data));
},
saveReferences:function saveReferences(data){
dispatch(_myReferenceModule.actions.saveReferenceData(data));
},
clearReferences:function clearReferences(data){
dispatch(_myReferenceModule.actions.clearReferences());
},
saveHomeAddress:function saveHomeAddress(data){
dispatch(_myProfileModule.actions.saveHomeAddressData(data));
},
clearUserData:function clearUserData(data){
dispatch(_myProfileModule.actions.clearUserData());
},
saveAboutMeData:function saveAboutMeData(data){
dispatch(_aboutMeContainer.actions.saveAboutMeData(data));
},
saveLanguage:function saveLanguage(data){
dispatch(_languagesModule.actions.saveLanguage(data));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_MyProfileComponent2.default);