/**
 * Created by Vardan on 7/17/2017.
 */
import {createAction, createReducer} from "redux-action";
export const ADD_SHIFT_DATA = "ADD_SHIFT_DATA";
export const UPDATE_SHIFT_DATA = "UPDATE_SHIFT_DATA";

const addShiftData = createAction(ADD_SHIFT_DATA, data => data);


const initialState = {
};

export const actions = {
    addShiftData
};

const schedulesReducer = createReducer(initialState, ({
    [ADD_SHIFT_DATA]: (actionPayload, store) => {
        actionPayload.map((schedule) =>{
            store[schedule.shiftId] = schedule;
            });
        return {...store};
    },
    [UPDATE_SHIFT_DATA]: (actionPayload, store) => {
       store[actionPayload.id] = actionPayload;
        return {...store};
    }
}));

export default schedulesReducer;
