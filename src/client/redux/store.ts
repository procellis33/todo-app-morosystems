import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, type AllEffect, type Effect } from "redux-saga/effects";
import rootReducer from "./rootReducer";
import getTasksSaga from "./sagas/getTasksSaga";
import getCompletedTask from "./sagas/getCompletedTaskSaga";
import createTaskSaga from "./sagas/createTaskSaga";
import deleteTaskSaga from "./sagas/deleteTaskSaga";
import modifyTaskSaga from "./sagas/modifyTaskSaga";
import toggleTaskStatusSaga from "./sagas/toggleTaskStatusSaga";

const saga = createSagaMiddleware();

// * Combining all saga effects
function* rootSaga(): Generator<
  AllEffect<Generator<Effect<any, any>, void, unknown>>,
  void,
  unknown
> {
  yield all([
    getTasksSaga(),
    getCompletedTask(),
    createTaskSaga(),
    deleteTaskSaga(),
    modifyTaskSaga(),
    toggleTaskStatusSaga(),
  ]);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
