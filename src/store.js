/* @flow */
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";

//const loggerMiddleware = createLogger();

const initialState = {};

const createStoreWithMiddleware = applyMiddleware(
    logger(),
    thunkMiddleware,
    //loggerMiddleware
)(createStore);

const store = createStoreWithMiddleware(rootReducer, initialState);


export default store;
