import { z } from "zod";
import { newTaskListSchema, updateTaskListSchema } from "./task-list.schemas";

export type NewTaskListRequest = z.infer<typeof newTaskListSchema>;
export type UpdateTaskListRequest = z.infer<typeof updateTaskListSchema>;

export type NewTaskListResponse = {
  id: string;
  message: string;
};

//TODO: Come up with a better success response.
export type SuccessResponse = {
  taskListId?: number;
  message: string;
}

export type TaskListDeletedResponse = {
  taskListId?: number;
  message: string;
}

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
