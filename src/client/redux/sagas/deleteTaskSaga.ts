import { call, type Effect, put, takeEvery } from "redux-saga/effects";

import {
  type TDeleteTask,
  type TTaskError,
} from "../../interfaces-types/tasks";

import { type PayloadAction } from "@reduxjs/toolkit";
import { BASE_API_LINK } from "../../constants";
import { deleteTaskSuccess, tasksFailure } from "../reducers/tasksSlice";

function* workDeleteTask(
  action: PayloadAction<TDeleteTask>,
): Generator<any, void, any> {
  const response: Response = yield call(
    fetch,
    BASE_API_LINK + "/tasks/" + action.payload,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const contentType = response.headers.get("content-type");

  if (response.ok) {
    yield put(deleteTaskSuccess(action.payload));
  } else if (
    !response.ok &&
    contentType !== null &&
    contentType.includes("text/html")
  ) {
    const text: TTaskError = yield response.text();
    yield put(tasksFailure(text));
  } else yield put(tasksFailure("Oops, something went wrong"));
}

function* deleteTaskSaga(): Generator<Effect, void, unknown> {
  yield takeEvery(
    "tasks/deleteTaskFetch",
    (action: PayloadAction<TDeleteTask>) => workDeleteTask(action),
  );
}

export default deleteTaskSaga;
