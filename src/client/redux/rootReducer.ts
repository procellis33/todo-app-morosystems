import { combineReducers } from "redux";
import tasksSlice from "./reducers/tasksSlice";

const rootReducer = combineReducers({
  tasks: tasksSlice,
});

export default rootReducer;
