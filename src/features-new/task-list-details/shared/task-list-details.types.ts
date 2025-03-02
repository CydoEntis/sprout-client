import { Member } from "../../task-list/shared/task-list.types";

export type TaskListDetails = {
  id: number;
  name: string;
  description: string;
  completedTasksCount: number;
  totalTasksCount: number;
  isCompleted: boolean;
  members: Member[];
  taskListItems: TaskListItemDetail[];
};

export type TaskListItemDetail = {
  id: number;
  description: string;
  isCompleted: boolean;
};
