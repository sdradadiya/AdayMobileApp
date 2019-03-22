import {createAction, createReducer} from "redux-action";

const initialState = {
    shiftDetails: {    }
};

export const UPDATE_SHIFT_DATA = "UPDATE_SHIFT_DATA";

const  updateShiftDetails = createAction(UPDATE_SHIFT_DATA, userCredentials => userCredentials);

export const actions = {
    updateShiftDetails
};

const shiftDetailsReducer = createReducer(initialState, ({
}));

export default shiftDetailsReducer;
