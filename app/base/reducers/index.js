/**
 * @fileOverview 合并所有reducer的返回值，组合整个state
 */
import { combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutablejs';
import CreateReducer from './CreateReducer';
import * as models from 'busModels';
const rootReducer = combineReducers(models);
export default rootReducer;
