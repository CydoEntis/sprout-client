import { MemberResponse, TaskListItemDetailResponse } from "../../../features-old/task-list/shared/task-list.types";

export type TaskListDetails = {
  id: number;
  name: string;
  description: string;
  completedTasksCount: number;
  totalTasksCount: number;
  isCompleted: boolean;
  members: MemberResponse[]; // Fix
  taskListItems: TaskListItemDetailResponse[]; // Fix
};