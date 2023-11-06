import { call, put, takeEvery, type Effect } from "redux-saga/effects";

import { tasksFailure, getCompletedTasksSuccess } from "../reducers/tasksSlice";
import { BASE_API_LINK } from "../../constants";
import { type TTaskError, type ITask } from "../../interfaces-types/tasks";

function* workGetCompletedTasksFetch(): Generator<any, void, any> {
  const response: Response = yield call(
    fetch,
    BASE_API_LINK + "/tasks/completed",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const contentType = response.headers.get("content-type");

  // * Checking response headers. Showing custom error or error from server
  if (
    response.ok &&
    contentType !== null &&
    contentType.includes("application/json")
  ) {
    const tasksArray: ITask[] = yield response.json();
    yield put(getCompletedTasksSuccess(tasksArray));
  } else if (
    !response.ok &&
    contentType !== null &&
    contentType.includes("text/html")
  ) {
    const text: TTaskError = yield response.text();
    yield put(tasksFailure(text));
  } else yield put(tasksFailure("Oops, something went wrong"));
}

function* getCompletedTask(): Generator<Effect, void, unknown> {
  yield takeEvery("tasks/getCompletedTasksFetch", workGetCompletedTasksFetch);
}

export default getCompletedTask;
