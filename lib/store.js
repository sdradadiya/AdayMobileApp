Object.defineProperty(exports,"__esModule",{value:true});
var _redux=require("redux");
var _reduxThunk=require("redux-thunk");var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reducers=require("./reducers");var _reducers2=_interopRequireDefault(_reducers);
var _reduxLogger=require("redux-logger");var _reduxLogger2=_interopRequireDefault(_reduxLogger);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}



var initialState={};

var createStoreWithMiddleware=(0,_redux.applyMiddleware)(
(0,_reduxLogger2.default)(),_reduxThunk2.default)(_redux.createStore);




var store=createStoreWithMiddleware(_reducers2.default,initialState);exports.default=


store;