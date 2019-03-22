import {createAction, createReducer} from "redux-action";

export const SAVE_HOME_ADDRESS_ACTION = "SAVE_HOME_ADDRESS_ACTION";
export const CLEAR_HOME_ADDRESS_ACTION = "CLEAR_HOME_ADDRESS_ACTION"; 

const initialState = {};

const clearHomeAddressAction = createAction(CLEAR_HOME_ADDRESS_ACTION);
export const actions = {
    clearHomeAddressAction: clearHomeAddressAction
};

const homeAddressReducer = createReducer(initialState, ({
    [CLEAR_HOME_ADDRESS_ACTION]: (actionPayload, state) => {
        return {};
    }
}));

export default homeAddressReducer;
