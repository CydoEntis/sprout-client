import { z } from "zod";
import { newTaskListSchema } from "./task-list.schemas";

export type NewTaskListRequest = z.infer<typeof newTaskListSchema>;

export type NewTaskListResponse = {
  id: string;
  message: string;
};

export type TaskListResponse = {
  id: number;
  name: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  members: MemberResponse[];
  totalTasksCount: number;
  completedTasksCount: number;
  taskCompletionPercentage: number;
};

export type MemberResponse = {
  userId: string;
  name: string;
};

export type TaskListDetailResponse = {
  id: number;
  name: string;
  description: string;
  completedTasksCount: number;
  totalTasksCount: number;
  isCompleted: boolean;
  members: MemberResponse[];
  taskListItems: TaskListItemDetailResponse[];
};

export type TaskListItemDetailResponse = {
  id: number;
  description: string;
  isCompleted: boolean;
};
