import {createAction, createReducer} from "redux-action";

export const LOGIN_ACTION = "LOGIN_ACTION";

const initialState = {};

const loginAction = createAction(LOGIN_ACTION, (phoneNumber, password) => {
    return {phoneNumber: phoneNumber, password: password};
});

export const actions = {
    loginAction
};

const loginReducer = createReducer(initialState, ({
    [LOGIN_ACTION]: (actionPayload, state) => {
        return {...state, phoneNumber: actionPayload.phoneNumber, password: actionPayload.password};
    }
}));

export default loginReducer;
