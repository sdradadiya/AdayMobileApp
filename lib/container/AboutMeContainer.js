Object.defineProperty(exports,"__esModule",{value:true});
var _reactRedux=require("react-redux");
var _aboutMeContainer=require("../modules/aboutMe-container");
var _AboutMeComponent=require("../components/AboutMeComponent");var _AboutMeComponent2=_interopRequireDefault(_AboutMeComponent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var mapStateToProps=function mapStateToProps(store){
return{
store:store,
aboutMe:store.aboutMe};

};


var mapDispatchToProps=function mapDispatchToProps(dispatch){return{
actions:{
saveAboutMeData:function saveAboutMeData(data){
dispatch(_aboutMeContainer.actions.saveAboutMeData(data));
}}};};exports.default=



(0,_reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(_AboutMeComponent2.default);