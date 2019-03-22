/**
 * Created by Robert on 2/11/2017.
 */
import {createAction, createReducer} from "redux-action";

const SAVE_ID = "SAVE_ID";

const SAVE_AVAILABILITY_DATA = "SAVE_AVAILABILITY_DATA";

const SAVE_CONTACT_INFO_DATA = "SAVE_CONTACT_INFO_DATA";

const CLEAR_USER = "CLEAR_USER_DATA";

export const SAVE_HOME_ADDRESS_ACTION = "SAVE_HOME_ADDRESS_ACTION";

const saveId = createAction(SAVE_ID, data => data);

const saveAvailabilityData = createAction(SAVE_AVAILABILITY_DATA, id => id);

const saveContactInfoData = createAction(SAVE_CONTACT_INFO_DATA, data => data);

const saveHomeAddressData = createAction(SAVE_HOME_ADDRESS_ACTION, homeAddress =>  homeAddress);

const clearUserData = createAction(CLEAR_USER);


export const actions = {
    saveId,
    saveAvailabilityData,
    saveContactInfoData,
    saveHomeAddressData,
    clearUserData,
};

// this state is hard coded for testing! (currently not relevant)
// id used to query myProfile data is id prop passed down from Account

const initialState = {

    availability: {
        id: "",
        hourRange: "FULL-TIME"
    },
    id: "",
    nodeId: "",
    email: "",
    homeAddress: {},

};

const resetState = {
    availability: {
        id: "",
        hourRange: "FULL-TIME"
    },
    id: "",
    nodeId: "",
    email: "",
    homeAddress: {},
};

const profileReviewReducer = createReducer(initialState, ({
    [SAVE_ID]: (actionPayload, state) => {
        return {...state, id: actionPayload};
    },
    [SAVE_AVAILABILITY_DATA]: (actionPayload, state) => {
        return {...state, availability: actionPayload};
    },
    [SAVE_CONTACT_INFO_DATA]: (actionPayload, state) => {
        let email = actionPayload.email;
        let phoneNumber = actionPayload.phoneNumber;
        return {...state, email: email, phoneNumber: phoneNumber};
    },
    [SAVE_HOME_ADDRESS_ACTION]: (actionPayload, state) => {
        return {...state, homeAddress: actionPayload};
    },
    [CLEAR_USER]: (actionPayload, state) => {
        return { resetState, homeAddress: {} };
    },
}));

export default profileReviewReducer;
