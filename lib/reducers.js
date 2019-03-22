Object.defineProperty(exports,"__esModule",{value:true});
var _homeModule=require("./modules/home-module");var _homeModule2=_interopRequireDefault(_homeModule);
var _signUpFormModule=require("./modules/signUpForm-module");var _signUpFormModule2=_interopRequireDefault(_signUpFormModule);
var _zipCodeModule=require("./modules/zipCode-module");var _zipCodeModule2=_interopRequireDefault(_zipCodeModule);
var _accountModule=require("./modules/account-module");var _accountModule2=_interopRequireDefault(_accountModule);
var _homeAddressModule=require("./modules/homeAddress-module");var _homeAddressModule2=_interopRequireDefault(_homeAddressModule);
var _myReferenceModule=require("./modules/myReference-module");var _myReferenceModule2=_interopRequireDefault(_myReferenceModule);
var _aboutMeContainer=require("./modules/aboutMe-container");var _aboutMeContainer2=_interopRequireDefault(_aboutMeContainer);
var _myStoreModule=require("./modules/myStore-module");var _myStoreModule2=_interopRequireDefault(_myStoreModule);
var _addNotificationModule=require("./modules/addNotification-module");var _addNotificationModule2=_interopRequireDefault(_addNotificationModule);
var _shiftDetailsModule=require("./modules/shiftDetails-module");var _shiftDetailsModule2=_interopRequireDefault(_shiftDetailsModule);
var _changePasswordModule=require("./modules/changePassword-module");var _changePasswordModule2=_interopRequireDefault(_changePasswordModule);
var _alertsSettingsModule=require("./modules/alertsSettings-module");var _alertsSettingsModule2=_interopRequireDefault(_alertsSettingsModule);
var _myProfileModule=require("./modules/myProfile-module");var _myProfileModule2=_interopRequireDefault(_myProfileModule);
var _languagesModule=require("./modules/languages-module");var _languagesModule2=_interopRequireDefault(_languagesModule);
var _scheduleModule=require("./modules/schedule-module");var _scheduleModule2=_interopRequireDefault(_scheduleModule);
var _opportunitiesModule=require("./modules/opportunities-module");var _opportunitiesModule2=_interopRequireDefault(_opportunitiesModule);
var _redux=require("redux");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var rootReducer=(0,_redux.combineReducers)({
home:_homeModule2.default,
zipCode:_zipCodeModule2.default,
accountReducer:_accountModule2.default,
homeAddress:_homeAddressModule2.default,
userCredentials:_signUpFormModule2.default,
myReferences:_myReferenceModule2.default,
aboutMe:_aboutMeContainer2.default,
myStore:_myStoreModule2.default,
notifications:_addNotificationModule2.default,
shiftDetails:_shiftDetailsModule2.default,
changePassword:_changePasswordModule2.default,
alertsSettings:_alertsSettingsModule2.default,
myProfile:_myProfileModule2.default,
languages:_languagesModule2.default,
schedules:_scheduleModule2.default,
opportunities:_opportunitiesModule2.default});exports.default=


rootReducer;