import { z } from "zod";
import { createTaskListSchema, updateTaskListSchema } from "./task-list.schemas";
import { TaskListDetails } from "../../task-list-details/shared/task-list-details.types";

export type CreateTaskListRequest = z.infer<typeof createTaskListSchema>;
export type UpdateTaskListRequest = z.infer<typeof updateTaskListSchema>;

export type CreateTaskListResponse = {
  message: string;
  taskListDetails: TaskListDetails;
};

//TODO: Come up with a better success response.
export type SuccessResponse = {
  taskListId?: number;
  message: string;
};

export type TaskListDeletedResponse = {
  taskListId?: number;
  message: string;
};

export type TaskList = {
  id: number;
  name: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  members: Member[];
  totalTasksCount: number;
  completedTasksCount: number;
  taskCompletionPercentage: number;
};

export type Member = {
  userId: string;
  name: string;
};
