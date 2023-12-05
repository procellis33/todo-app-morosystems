import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type TCreateTask,
  type TTaskError,
  type ITask,
  type TDeleteTask,
  type IModifyTask,
  type IToggleTaskStatus,
} from "@interfaces-types/tasks";

interface IInitialState {
  tasks: ITask[];
  completedTasks: ITask[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: IInitialState = {
  tasks: [],
  completedTasks: [],
  isLoading: false,
  errorMessage: "",
};

const createFetchAction = (state: IInitialState): void => {
  state.isLoading = true;
  state.errorMessage = "";
};

const createSuccessAction = (state: IInitialState): void => {
  state.isLoading = false;
  state.errorMessage = "";
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskStatusFetch: (
      state,
      _action: PayloadAction<IToggleTaskStatus>,
    ) => {
      createFetchAction(state);
    },
    modifyTaskFetch: (state, _action: PayloadAction<IModifyTask>) => {
      createFetchAction(state);
    },
    modifyTaskSuccess: (state, action: PayloadAction<ITask>) => {
      createSuccessAction(state);
      const updatedTask = action.payload;

      state.tasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      );
    },
    deleteTaskFetch: (state, _action: PayloadAction<TDeleteTask>) => {
      createFetchAction(state);
    },
    deleteTaskSuccess: (state, action: PayloadAction<TDeleteTask>) => {
      createSuccessAction(state);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    createTaskFetch: (state, _action: PayloadAction<TCreateTask>) => {
      createFetchAction(state);
    },
    createTaskSuccess: (state, action: PayloadAction<ITask>) => {
      createSuccessAction(state);
      state.tasks.unshift(action.payload);
    },
    getCompletedTasksFetch: (state) => {
      createFetchAction(state);
    },
    getCompletedTasksSuccess: (state, action: PayloadAction<ITask[]>) => {
      createSuccessAction(state);
      state.completedTasks = action.payload;
    },
    getTasksFetch: (state) => {
      createFetchAction(state);
    },
    getTasksSuccess: (state, action: PayloadAction<ITask[]>) => {
      createSuccessAction(state);
      state.tasks = action.payload
        .slice()
        .sort((a, b) => b.createdDate - a.createdDate);
    },
    tasksFailure: (state, action: PayloadAction<TTaskError>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

// * Renaming some reducers for better usability in code
export const {
  getTasksFetch: getTasks,
  getTasksSuccess,
  tasksFailure,
  getCompletedTasksSuccess,
  getCompletedTasksFetch: getCompletedTasks,
  createTaskFetch: createTask,
  createTaskSuccess,
  deleteTaskSuccess,
  deleteTaskFetch: deleteTask,
  modifyTaskFetch: modifyTask,
  modifyTaskSuccess,
  toggleTaskStatusFetch: toggleTaskStatus,
} = tasksSlice.actions;
export default tasksSlice.reducer;
