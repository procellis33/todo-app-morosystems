import { call, type Effect, put, takeEvery } from "redux-saga/effects";

import {
  type TCreateTask,
  type ITask,
  type TTaskError,
} from "../../interfaces-types/tasks";

import { type PayloadAction } from "@reduxjs/toolkit";
import { BASE_API_LINK } from "../../constants";
import { createTaskSuccess, tasksFailure } from "../reducers/tasksSlice";

function* workCreateTask(
  action: PayloadAction<TCreateTask>,
): Generator<any, void, any> {
  const response: Response = yield call(fetch, BASE_API_LINK + "/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: action.payload,
    }),
  });

  const contentType = response.headers.get("content-type");

  // * Checking response headers. Showing custom error or error from server
  if (
    response.ok &&
    contentType !== null &&
    contentType.includes("application/json")
  ) {
    const newTask: ITask = yield response.json();
    yield put(createTaskSuccess(newTask));
  } else if (
    !response.ok &&
    contentType !== null &&
    contentType.includes("text/html")
  ) {
    const text: TTaskError = yield response.text();
    yield put(tasksFailure(text));
  } else yield put(tasksFailure("Oops, something went wrong"));
}

function* createTaskSaga(): Generator<Effect, void, unknown> {
  yield takeEvery(
    "tasks/createTaskFetch",
    (action: PayloadAction<TCreateTask>) => workCreateTask(action),
  );
}

export default createTaskSaga;
