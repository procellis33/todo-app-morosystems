import { call, takeEvery, type Effect } from "redux-saga/effects";

import { getTasksSuccess } from "../reducers/tasksSlice";
import getApi from "@api/getApi";
import { handleApiResponse } from "@api/handleApiResponce";

function* workGetTasksFetch(): Generator<any, void, any> {
  const response: Response = yield call(getApi, "/tasks");
  yield handleApiResponse(response, getTasksSuccess);
}

function* getTasksSaga(): Generator<Effect, void, unknown> {
  yield takeEvery("tasks/getTasksFetch", workGetTasksFetch);
}

export default getTasksSaga;
