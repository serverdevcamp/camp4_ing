import { combineReducers } from 'redux';
import profile from './profile';
import basket from './basket';

// import { createStore } from 'redux';

const rootReducer = combineReducers({
    profile, basket
});

export default rootReducer;