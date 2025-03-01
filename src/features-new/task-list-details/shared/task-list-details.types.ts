import { Member } from "../../task-list/shared/task-list.types";

export type TaskListDetails = {
  id: number;
  name: string;
  description: string;
  completedTasksCount: number;
  totalTasksCount: number;
  isCompleted: boolean;
  members: Member[]; // Fix
  // taskListItems: TaskListItemDetail[]; // Fix
};
