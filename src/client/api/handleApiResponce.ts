import { put } from "redux-saga/effects";
import { type ITask, type TTaskError } from "@interfaces-types/tasks";
import {
  createTaskSuccess,
  getCompletedTasksSuccess,
  getTasksSuccess,
  modifyTaskSuccess,
  tasksFailure,
} from "@redux/reducers/tasksSlice";

type SuccessAction =
  | typeof createTaskSuccess
  | typeof getCompletedTasksSuccess
  | typeof getTasksSuccess
  | typeof modifyTaskSuccess;

export function* handleApiResponse(
  response: Response,
  successAction: SuccessAction,
): Generator<any, void, any> {
  const contentType = response.headers.get("content-type");

  if (
    response.ok &&
    contentType !== null &&
    contentType.includes("application/json")
  ) {
    const data: ITask | ITask[] = yield response.json();
    if (successAction === createTaskSuccess) {
      yield put(successAction(data as ITask));
    } else if (
      successAction === getCompletedTasksSuccess ||
      successAction === getTasksSuccess
    ) {
      yield put(successAction(data as ITask[]));
    } else if (successAction === modifyTaskSuccess) {
      yield put(successAction(data as ITask));
    }
  } else if (
    !response.ok &&
    contentType !== null &&
    contentType.includes("text/html")
  ) {
    const text: TTaskError = yield response.text();
    yield put(tasksFailure(text));
  } else {
    yield put(tasksFailure("Oops, something went wrong"));
  }
}
