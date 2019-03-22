
import {createAction, createReducer} from "redux-action";

const SAVE_ABOUT_ME_DATA = "SAVE_ABOUT_ME_DATA";

const saveAboutMeData = createAction(SAVE_ABOUT_ME_DATA, data => data);

export const actions = {
    saveAboutMeData
};

const initialState = {
	id: 'id',
    firstName: 'First Name',
    lastName: 'Last Name',
    aboutMeText: 'About Me',
    userEmail: '',
    avatarUrl: ''
};

const aboutMeReducer = createReducer(initialState, ({
    [SAVE_ABOUT_ME_DATA]: (actionPayload, state) => {
        return {...state, ...actionPayload};
    }
}));

export default aboutMeReducer;
