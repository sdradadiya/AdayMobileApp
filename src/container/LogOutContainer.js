import React, {Component} from "react";
import {connect} from "react-redux";
import {actions} from "../modules/myProfile-module";
import {actions as aboutMeActions} from "../modules/aboutMe-container";
import {actions as referencesActions} from "../modules/myReference-module";
import {actions as languagesActions} from "../modules/languages-module";
import SettingsComponent from "../components/SettingsComponent/SettingsComponent";
import {actions as homeActions} from "../modules/homeAddress-module";

const mapStateToProps = (state) => {
    return ({
        state: state
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        clearUserData: (data) => {
            dispatch(referencesActions.clearReferences());
            dispatch(homeActions.clearHomeAddressAction());
            dispatch(actions.clearUserData());
        },
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsComponent);