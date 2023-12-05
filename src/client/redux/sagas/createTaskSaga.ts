import { call, type Effect, takeEvery } from "redux-saga/effects";

import { type TCreateTask } from "@interfaces-types/tasks";

import { type PayloadAction } from "@reduxjs/toolkit";
import { createTaskSuccess } from "../reducers/tasksSlice";
import postApi from "@api/postApi";
import { handleApiResponse } from "@api/handleApiResponce";

function* workCreateTask(
  action: PayloadAction<TCreateTask>,
): Generator<any, void, any> {
  const response: Response = yield call(postApi, "/tasks", {
    text: action.payload,
  });
  yield handleApiResponse(response, createTaskSuccess);
}

function* createTaskSaga(): Generator<Effect, void, unknown> {
  yield takeEvery(
    "tasks/createTaskFetch",
    (action: PayloadAction<TCreateTask>) => workCreateTask(action),
  );
}

export default createTaskSaga;
