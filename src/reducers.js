/* @flow */
import homeReducer from "./modules/home-module";
import signUpFormReducer from "./modules/signUpForm-module";
import zipCodeReducer from "./modules/zipCode-module";
import accountReducer from "./modules/account-module";
import homeAddressReducer from "./modules/homeAddress-module";
import addReferenceReducer from "./modules/myReference-module";
import aboutMeReducer from "./modules/aboutMe-container";
import myStoreReducer from "./modules/myStore-module";
import notificationsReducer from './modules/addNotification-module'
import shiftDetailsReducer from './modules/shiftDetails-module'
import changePasswordReducer from './modules/changePassword-module';
import alertsSettingsReducer from './modules/alertsSettings-module';
import profileReviewReducer from './modules/myProfile-module';
import languageReducer from './modules/languages-module';
import schedulesReducer from './modules/schedule-module';
import opportunitiesReducer from './modules/opportunities-module';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    home: homeReducer,
    zipCode: zipCodeReducer,
    accountReducer: accountReducer,
    homeAddress: homeAddressReducer,
    userCredentials: signUpFormReducer,
    myReferences: addReferenceReducer,
    aboutMe: aboutMeReducer,
    myStore: myStoreReducer,
    notifications: notificationsReducer,
    shiftDetails: shiftDetailsReducer,
    changePassword: changePasswordReducer,
    alertsSettings: alertsSettingsReducer,
    myProfile: profileReviewReducer,
    languages: languageReducer,
    schedules: schedulesReducer,
    opportunities: opportunitiesReducer,
});

export default rootReducer;
