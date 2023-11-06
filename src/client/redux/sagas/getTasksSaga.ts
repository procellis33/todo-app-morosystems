import { call, put, takeEvery, type Effect } from "redux-saga/effects";

import { tasksFailure, getTasksSuccess } from "../reducers/tasksSlice";
import { BASE_API_LINK } from "../../constants";
import { type TTaskError, type ITask } from "../../interfaces-types/tasks";

function* workGetTasksFetch(): Generator<any, void, any> {
  const response: Response = yield call(fetch, BASE_API_LINK + "/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const contentType = response.headers.get("content-type");

  if (
    response.ok &&
    contentType !== null &&
    contentType.includes("application/json")
  ) {
    const tasksArray: ITask[] = yield response.json();
    yield put(getTasksSuccess(tasksArray));
  } else if (
    !response.ok &&
    contentType !== null &&
    contentType.includes("text/html")
  ) {
    const text: TTaskError = yield response.text();
    yield put(tasksFailure(text));
  } else yield put(tasksFailure("Oops, something went wrong"));
}

function* getTasksSaga(): Generator<Effect, void, unknown> {
  yield takeEvery("tasks/getTasksFetch", workGetTasksFetch);
}

export default getTasksSaga;
