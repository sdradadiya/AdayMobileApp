import React, {Component} from "react";
import {connect} from "react-redux";
import {actions} from "../modules/shiftDetails-module";
import ShiftDetailsComponent from "../components/ShiftDetailsComponent/ShiftDetailsComponent";

const mapStateToProps = (state) => {
    return ({
        shiftDetails: state.shiftDetails.shiftDetails,
        state: state
    });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
    actions: {
        updateShiftDetails: (credentials) => {
            dispatch(actions.updateShiftDetails(credentials));
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShiftDetailsComponent);
