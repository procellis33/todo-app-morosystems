import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, type AllEffect, type Effect } from "redux-saga/effects";
import rootReducer from "./rootReducer";
import getTasksSaga from "./saga/getTasksSaga";
import getCompletedTasks from "./saga/getCompletedTaskSaga";

const saga = createSagaMiddleware();
function* rootSaga(): Generator<
  AllEffect<Generator<Effect<any, any>, void, unknown>>,
  void,
  unknown
> {
  yield all([getTasksSaga(), getCompletedTasks()]);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
