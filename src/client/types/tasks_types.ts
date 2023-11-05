export interface TTask {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate?: number;
}

export type TTaskError = string;

export type TCreateTask = string;

export type TDeleteTask = string;

export interface TModifyTask {
  text: string;
  id: string;
}

export interface TToggleTaskStatus {
  completed: boolean;
  id: string;
}
