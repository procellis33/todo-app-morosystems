import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type TaskError, type TaskList } from "../../types/tasks_types";

interface TInitialState {
  tasks: TaskList[];
  completedTasks: TaskList[];
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
    getCompletedTasksFetch: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    getCompletedTasksSuccess: (state, action: PayloadAction<TaskList[]>) => {
      state.completedTasks = action.payload;
      state.isLoading = true;
      state.errorMessage = "";
    },
    getTasksFetch: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    getTasksSuccess: (state, action: PayloadAction<TaskList[]>) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.errorMessage = "";
    },
    tasksFailure: (state, action: PayloadAction<TaskError>) => {
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
} = tasksSlice.actions;
export default tasksSlice.reducer;
