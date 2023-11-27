import { call, type Effect, takeEvery } from "redux-saga/effects";

import { type IModifyTask } from "../../interfaces-types/tasks";

import { type PayloadAction } from "@reduxjs/toolkit";
import { modifyTaskSuccess } from "../reducers/tasksSlice";
import postApi from "../../api/postApi";
import { handleApiResponse } from "../../api/handleApiResponce";

function* workModifyTask(
  action: PayloadAction<IModifyTask>,
): Generator<any, void, any> {
  const { text, id } = action.payload;
  const response: Response = yield call(postApi, `/tasks/${id}`, { text });
  yield handleApiResponse(response, modifyTaskSuccess);
}

function* modifyTaskSaga(): Generator<Effect, void, unknown> {
  yield takeEvery(
    "tasks/modifyTaskFetch",
    (action: PayloadAction<IModifyTask>) => workModifyTask(action),
  );
}

export default modifyTaskSaga;
