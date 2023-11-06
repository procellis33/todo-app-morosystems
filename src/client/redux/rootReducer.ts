import { combineReducers } from "redux";
import tasksSlice from "./reducers/tasksSlice";

// * Combining all reducers
const rootReducer = combineReducers({
  tasks: tasksSlice,
});

export default rootReducer;
