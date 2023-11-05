import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type TCreateTask,
  type TTaskError,
  type TTask,
  type TDeleteTask,
  type TModifyTask,
  type TToggleTaskStatus,
} from "../../types/tasks_types";

interface TInitialState {
  tasks: TTask[];
  completedTasks: TTask[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: TInitialState = {
  tasks: [],
  completedTasks: [],
  isLoading: false,
  errorMessage: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskStatusFetch: (
      state,
      _action: PayloadAction<TToggleTaskStatus>,
    ) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    modifyTaskFetch: (state, _action: PayloadAction<TModifyTask>) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    modifyTaskSuccess: (state, action: PayloadAction<TTask>) => {
      const updatedTask = action.payload;

      state.tasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      );

      state.isLoading = false;
      state.errorMessage = "";
    },
    deleteTaskFetch: (state, _action: PayloadAction<TDeleteTask>) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    deleteTaskSuccess: (state, action: PayloadAction<TDeleteTask>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.isLoading = false;
      state.errorMessage = "";
    },
    createTaskFetch: (state, _action: PayloadAction<TCreateTask>) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    createTaskSuccess: (state, action: PayloadAction<TTask>) => {
      state.tasks.unshift(action.payload);
      state.isLoading = false;
      state.errorMessage = "";
    },
    getCompletedTasksFetch: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    getCompletedTasksSuccess: (state, action: PayloadAction<TTask[]>) => {
      state.completedTasks = action.payload;
      state.isLoading = false;
      state.errorMessage = "";
    },
    getTasksFetch: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    getTasksSuccess: (state, action: PayloadAction<TTask[]>) => {
      state.tasks = action.payload
        .slice()
        .sort((a, b) => b.createdDate - a.createdDate);
      state.isLoading = false;
      state.errorMessage = "";
    },
    tasksFailure: (state, action: PayloadAction<TTaskError>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getTasksFetch,
  getTasksSuccess,
  tasksFailure,
  getCompletedTasksSuccess,
  getCompletedTasksFetch,
  createTaskFetch,
  createTaskSuccess,
  deleteTaskSuccess,
  deleteTaskFetch,
  modifyTaskFetch,
  modifyTaskSuccess,
  toggleTaskStatusFetch,
} = tasksSlice.actions;
export default tasksSlice.reducer;
