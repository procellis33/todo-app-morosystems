import { call, type Effect, put, takeEvery } from "redux-saga/effects";

import {
  type TModifyTask,
  type TTask,
  type TTaskError,
} from "../../types/tasks_types";

import { type PayloadAction } from "@reduxjs/toolkit";
import { BASE_API_LINK } from "../../constants";
import { modifyTaskSuccess, tasksFailure } from "../reducers/tasksSlice";

function* workModifyTaskSaga(
  action: PayloadAction<TModifyTask>,
): Generator<any, void, any> {
  const { text, id } = action.payload;
  const response: Response = yield call(fetch, BASE_API_LINK + "/tasks/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

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

function* modifyTaskSaga(): Generator<Effect, void, unknown> {
  yield takeEvery(
    "tasks/modifyTaskFetch",
    (action: PayloadAction<TModifyTask>) => workModifyTaskSaga(action),
  );
}

export default modifyTaskSaga;
