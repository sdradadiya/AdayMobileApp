Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require("react-redux");
var _languagesModule=require("../modules/languages-module");
var _LanguagesComponent=require("../components/LanguagesComponent");var _LanguagesComponent2=_interopRequireDefault(_LanguagesComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{
store:store};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
saveLanguage:function saveLanguage(data){
dispatch(_languagesModule.actions.saveLanguage(data));
},
deleteLanguage:function deleteLanguage(data){
dispatch(_languagesModule.actions.deleteLanguage(data));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_LanguagesComponent2.default);