/* @flow */

import React, {
    Component
} from "react";
import {
    connect
} from "react-redux";
import {
    actions
} from "../modules/signUpForm-module";
import SignUpFormComponent from "../components/SignUpFormComponent";

const mapStateToProps = (state) => {
    return ({
        state: state
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        saveSignUpData: (credentials) => {
            dispatch(actions.saveSignUpData(credentials));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpFormComponent);
