import { put } from "redux-saga/effects";
import { type TDeleteTask, type TTaskError } from "@interfaces-types/tasks";
import { deleteTaskSuccess, tasksFailure } from "@redux/reducers/tasksSlice";

export function* handleDeleteApiResponse(
  response: Response,
  task: TDeleteTask,
): Generator<any, void, any> {
  const contentType = response.headers.get("content-type");

  // * Checking response headers. Showing custom error or error from server
  if (response.ok) {
    yield put(deleteTaskSuccess(task));
  } else if (
    !response.ok &&
    contentType !== null &&
    contentType.includes("text/html")
  ) {
    const text: TTaskError = yield response.text();
    yield put(tasksFailure(text));
  } else yield put(tasksFailure("Oops, something went wrong"));
}
