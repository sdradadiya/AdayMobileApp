import React, {Component} from "react";
import {connect} from "react-redux";
import {actions} from "../modules/myProfile-module";
import {actions as aboutMeActions} from "../modules/aboutMe-container";
import {actions as referencesActions} from "../modules/myReference-module";
import {actions as languagesActions} from "../modules/languages-module";
import MyProfileComponent from "../components/MyProfileComponent";

const mapStateToProps = (state) => {
    return ({
        state: state,
        shiftDetails: state.shiftDetails.shiftDetails
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        saveAvailabilityData: (data) => {
            dispatch(actions.saveAvailabilityData(data));
        },
        saveContactInfo: (data) => {
            dispatch(actions.saveContactInfoData(data));
        },
        saveReferences: (data) => {
            dispatch(referencesActions.saveReferenceData(data));
        },
        clearReferences: (data) => {
            dispatch(referencesActions.clearReferences());
        },
        saveHomeAddress: (data) => {
            dispatch(actions.saveHomeAddressData(data));
        },
        clearUserData: (data) => {
            dispatch(actions.clearUserData());
        },
        saveAboutMeData: (data) => {
            dispatch(aboutMeActions.saveAboutMeData(data));
        },
        saveLanguage: (data) => {
            dispatch(languagesActions.saveLanguage(data));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfileComponent);
