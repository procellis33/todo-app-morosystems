export interface ITask {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate?: number;
}

export type TTaskError = string;

export type TCreateTask = string;

export type TDeleteTask = string;

export interface IModifyTask {
  text: string;
  id: string;
}

export interface IToggleTaskStatus {
  completed: boolean;
  id: string;
}
