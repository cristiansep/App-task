import { combineReducers } from "redux";
import { taskReducer } from "./taskReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
    task: taskReducer,
    auth: authReducer
});