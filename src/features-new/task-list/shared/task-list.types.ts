import { z } from "zod";
import { newTaskListSchema, updateTaskListSchema } from "./task-list.schemas";

export type NewTaskListRequest = z.infer<typeof newTaskListSchema>;
export type UpdateTaskListRequest = z.infer<typeof updateTaskListSchema>;

export type NewTaskListResponse = {
  id: string;
  message: string;
};

export type SuccessResponse = {
  id?: number;
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
