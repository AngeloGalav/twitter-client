//qui vanno messi i reducers
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tweetReducer from "./tweetReducer";

export default combineReducers({
    userReducer: userReducer,
    tweetReducer: tweetReducer,
});
