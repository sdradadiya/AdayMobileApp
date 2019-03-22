/**
 * Created by vardan on 3/7/2017.
 */
import {createAction, createReducer} from "redux-action";

const ADD_NOTIFICATION = "ADD_NOTIFICATION";

const addNotification = createAction(ADD_NOTIFICATION, notification => notification);

export const actions = {
    addNotification
};

const initialState = {
    notifications: []
};

const educationHistoryReducer = createReducer(initialState, ({
    [ADD_NOTIFICATION]: (actionPayload, state) => {
        let educationHistory = state.educationHistory.slice();
        educationHistory.push(actionPayload);
        return {...state, educationHistory:educationHistory};
    }
}));

export default addNotification;