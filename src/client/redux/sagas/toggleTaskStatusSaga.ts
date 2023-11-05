import { call, type Effect, put, takeEvery } from "redux-saga/effects";

import {
  type TTask,
  type TTaskError,
  type TToggleTaskStatus,
} from "../../types/tasks_types";

import { type PayloadAction } from "@reduxjs/toolkit";
import { BASE_API_LINK } from "../../constants";
import { modifyTaskSuccess, tasksFailure } from "../reducers/tasksSlice";

function* workToggleStatusSaga(
  action: PayloadAction<TToggleTaskStatus>,
): Generator<any, void, any> {
  const { completed, id } = action.payload;
  const apiMethod = completed ? "incomplete" : "complete";
  const response: Response = yield call(
    fetch,
    BASE_API_LINK + "/tasks/" + id + "/" + apiMethod,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const contentType = response.headers.get("content-type");

  if (
    response.ok &&
    contentType !== null &&
    contentType.includes("application/json")
  ) {
    const modifiedTask: TTask = yield response.json();
    yield put(modifyTaskSuccess(modifiedTask));
  } else if (
    !response.ok &&
    contentType !== null &&
    contentType.includes("text/html")
  ) {
    const text: TTaskError = yield response.text();
    yield put(tasksFailure(text));
  } else yield put(tasksFailure("Oops, something went wrong"));
}

function* toggleTaskStatusSaga(): Generator<Effect, void, unknown> {
  yield takeEvery(
    "tasks/toggleTaskStatusFetch",
    (action: PayloadAction<TToggleTaskStatus>) => workToggleStatusSaga(action),
  );
}

export default toggleTaskStatusSaga;
