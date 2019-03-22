import {createAction, createReducer} from "redux-action";

const SAVE_LANGUAGE = "SAVE_LANGUAGE";
const DELETE_LANGUAGE = "DELETE_LANGUAGE";

const saveLanguage = createAction(SAVE_LANGUAGE, data => data);
const deleteLanguage = createAction(DELETE_LANGUAGE, data => data);

export const actions = {
    saveLanguage,
    deleteLanguage
};

const initialState = {
    languages: [],
};

const languageReducer = createReducer(initialState, ({
    [SAVE_LANGUAGE]: (actionPayload, state) => {
        let languages = state.languages.slice();
        const index = languages.findIndex((language) => language.id === actionPayload.id);
        
        if(actionPayload.length === 0){
            return { ...state }
        }
        if(actionPayload.length){
            return { ...state, languages: actionPayload }
        }
    
        if (index !== -1) {
            languages[index] = actionPayload;
        } else {
            languages.push(actionPayload);
        }

        return {...state, languages: languages};
    },
    [DELETE_LANGUAGE]: (actionPayload, state) => {
        let languages = state.languages.slice();
        const index = languages.findIndex((language) => language.id === actionPayload);
        if (index !== -1) {
            languages.splice(index, 1);
        }
        return {...state, languages:languages};
    }
}));

export default languageReducer;
