/**
 * Created by Robert on 2/14/2017.
 * Used with OpportunitiesComponent, do not delete
 */
import {createAction, createReducer} from "redux-action";

const ADD_POSITION = "ADD_POSITION";
const ADD_INFO = "ADD_INFO";
const REMOVE_POSITION = "REMOVE_POSITION";

const addPosition = createAction(ADD_POSITION, data => data);
const addInfo = createAction(ADD_INFO, data => data);
const removePosition = createAction(REMOVE_POSITION, data => data);

export const actions = {
    addPosition,
    removePosition,
    addInfo
};

const initialState = {
    positions:[],
    address:"",
    franchiseStore: false,
    franchiseCompany: false,
    fullName:"",
    phoneNumber:"",
    companyName:"",
    title:""
};

const myStoreReducer = createReducer(initialState, ({
    [ADD_POSITION]: (actionPayload, state) => {
        let positions = state.positions.slice();
        positions.push(actionPayload);
        return {...state, positions};
    },
    [REMOVE_POSITION]: (actionPayload, state) => {
        let index = state.positions.indexOf(actionPayload);
        state.positions.splice(index, 1);
        return {...state}
    },
    [ADD_INFO]: (actionPayload, state) => {
        return {...state, ...actionPayload}
    }
}));

export default myStoreReducer;
