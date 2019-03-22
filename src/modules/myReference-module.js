/**
 * Created by Robert on 3/11/2017.
 */
import {createAction, createReducer} from "redux-action";

const SAVE_REFERENCE_DATA = "SAVE_REFERENCE_DATA";
const UPDATE_REFERENCE_DATA = "UPDATE_REFERENCE_DATA";
const REMOVE_REFERENCE = "REMOVE_REFERENCE";
const ADD_CONTACTS = "ADD_CONTACTS";
const CLEAR_REFERENCES = "CLEAR_REFERENCES";

const saveReferenceData = createAction(SAVE_REFERENCE_DATA, data => data);
const updateReferenceData = createAction(UPDATE_REFERENCE_DATA, data => data);
const removeReference = createAction(REMOVE_REFERENCE, data => data);
const addContacts = createAction(ADD_CONTACTS, data => data);
const clearReferences = createAction(CLEAR_REFERENCES);

export const actions = {
    saveReferenceData,
    updateReferenceData,
    removeReference,
    addContacts,
    clearReferences
};

const initialState = {
    myReferences: []
};

const myReferenceReducer = createReducer(initialState, ({
    [SAVE_REFERENCE_DATA]: (actionPayload, state) => {
        let myReferences = state.myReferences;
        if (actionPayload.length > 0) {
            actionPayload.map((ref) => {
                myReferences.push(ref);
            })
        } else if (actionPayload['firstName']){
                myReferences.push(actionPayload);
            
        } else {
            myReferences
        }
        return {...state, myReferences};
    },
    [UPDATE_REFERENCE_DATA]: (actionPayload, state) => {
        let myReferences = state.myReferences;
        for (let i = 0; i < myReferences.length; i++) {
            if (myReferences[i].id === actionPayload.id) {
                myReferences.splice(i, 1);
                myReferences.push(actionPayload);
                break;
            }
        }
        return {...state, myReferences};
    },
    [REMOVE_REFERENCE]: (actionPayload, state) => {
        let myReferences = state.myReferences;
        for (let i = 0; i < myReferences.length; i++) {
            if (myReferences[i].id === actionPayload) {
                myReferences.splice(i, 1);
                break;
            }
        }
        return {...state, myReferences};
    },
    [ADD_CONTACTS]: (actionPayload, state) => {
        let newList = state.myReferences.concat(actionPayload);
        return {...state, myReferences: newList}
    },
    [CLEAR_REFERENCES]: (actionPayload, state) => {
        return { myReferences: [] } 
    }
}));

export default myReferenceReducer;