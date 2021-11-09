//qui vanno messi i reducers
import { combineReducers } from "redux";
import userReducer from "./UserReducer";

export default combineReducers({
    userReducer: userReducer,
});
