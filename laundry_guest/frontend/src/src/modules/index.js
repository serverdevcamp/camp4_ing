import { combineReducers } from 'redux';
import profile from './profile';
import basket from './basket';

const rootReducer = combineReducers({
    profile, basket
});

export default rootReducer;