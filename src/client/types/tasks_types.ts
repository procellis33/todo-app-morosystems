export interface TaskList {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate?: number;
}

export type TaskError = string;
