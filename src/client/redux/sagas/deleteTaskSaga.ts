import { call, type Effect, takeEvery } from "redux-saga/effects";

import { type TDeleteTask } from "@interfaces-types/tasks";

import { type PayloadAction } from "@reduxjs/toolkit";
import deleteApi from "@api/deleteApi";
import { handleDeleteApiResponse } from "@api/handleDeleteApiResponce";

function* workDeleteTask(
  action: PayloadAction<TDeleteTask>,
): Generator<any, void, any> {
  const response: Response = yield call(deleteApi, `/tasks/${action.payload}`);
  yield handleDeleteApiResponse(response, action.payload);
}

function* deleteTaskSaga(): Generator<Effect, void, unknown> {
  yield takeEvery(
    "tasks/deleteTaskFetch",
    (action: PayloadAction<TDeleteTask>) => workDeleteTask(action),
  );
}

export default deleteTaskSaga;
