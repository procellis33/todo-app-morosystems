import { call, takeEvery, type Effect } from "redux-saga/effects";

import { getCompletedTasksSuccess } from "../reducers/tasksSlice";
import getApi from "@api/getApi";
import { handleApiResponse } from "@api/handleApiResponce";

function* workGetCompletedTasksFetch(): Generator<any, void, any> {
  const response: Response = yield call(getApi, "/tasks/completed");
  yield handleApiResponse(response, getCompletedTasksSuccess);
}

function* getCompletedTask(): Generator<Effect, void, unknown> {
  yield takeEvery("tasks/getCompletedTasksFetch", workGetCompletedTasksFetch);
}

export default getCompletedTask;
