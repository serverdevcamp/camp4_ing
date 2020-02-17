import { combineReducers} from "redux";
import temp from './temp';
import profile from "./profile";

const rootReducer = combineReducers({
  temp,profile
});

export default rootReducer;