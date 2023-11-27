import { call, type Effect, takeEvery } from "redux-saga/effects";

import { type IToggleTaskStatus } from "../../interfaces-types/tasks";

import { type PayloadAction } from "@reduxjs/toolkit";
import { modifyTaskSuccess } from "../reducers/tasksSlice";
import postApi from "../../api/postApi";
import { handleApiResponse } from "../../api/handleApiResponce";

function* workToggleStatus(
  action: PayloadAction<IToggleTaskStatus>,
): Generator<any, void, any> {
  const { completed, id } = action.payload;
  const apiMethod = completed ? "incomplete" : "complete";

  const response: Response = yield call(postApi, `/tasks/${id}/${apiMethod}`);
  yield handleApiResponse(response, modifyTaskSuccess);
}

function* toggleTaskStatusSaga(): Generator<Effect, void, unknown> {
  yield takeEvery(
    "tasks/toggleTaskStatusFetch",
    (action: PayloadAction<IToggleTaskStatus>) => workToggleStatus(action),
  );
}

export default toggleTaskStatusSaga;
