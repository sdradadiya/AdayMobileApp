import {createAction, createReducer} from "redux-action";

const initialState = {
    userCredentials: {}
};

const SAVE_DATA = "SAVE_DATA";

const  saveSignUpData = createAction(SAVE_DATA, userCredentials => userCredentials);

export const actions = {
    saveSignUpData
};

const signUpReducer = createReducer(initialState, ({
    [SAVE_DATA]: (actionPayload, state) => {
        let userCredentials = state.userCredentials ? state.userCredentials : {};
        const userNewCredentials = Object.assign(userCredentials, actionPayload);
        return newState = {...state, userCredentials: userNewCredentials};
    }
}));

export default signUpReducer;
