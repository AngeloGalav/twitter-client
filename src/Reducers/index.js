//qui vanno messi i reducers
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import tweetReducer from "./tweetReducer";
import filterReducer from "./filterReducer";
import streamReducer from "./streamReducer"

export default combineReducers({
    userReducer: userReducer,
    tweetReducer: tweetReducer,
    filterReducer: filterReducer,
    streamReducer: streamReducer,
});


