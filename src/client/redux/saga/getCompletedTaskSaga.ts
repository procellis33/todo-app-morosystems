import { call, put, takeEvery, type Effect } from "redux-saga/effects";

import { tasksFailure, getCompletedTasksSuccess } from "../reducers/tasksSlice";
import { BASE_API_LINK } from "../../constants";
import { type TaskError, type TaskList } from "../../types/tasks_types";

function* workGetTasksFetch(): Generator<any, void, any> {
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

  if (
    response.ok &&
    contentType !== null &&
    contentType.includes("application/json")
  ) {
    const tasksArray: TaskList[] = yield response.json();
    yield put(getCompletedTasksSuccess(tasksArray));
  } else if (
    !response.ok &&
    contentType !== null &&
    contentType.includes("text/html")
  ) {
    const text: TaskError = yield response.text();
    yield put(tasksFailure(text));
  } else yield put(tasksFailure("Oops, something went wrong"));
}

function* getCompletedTasks(): Generator<Effect, void, unknown> {
  yield takeEvery("tasks/getCompletedTasksFetch", workGetTasksFetch);
}

export default getCompletedTasks;
