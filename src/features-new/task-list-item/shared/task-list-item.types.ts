import { z } from "zod";
import { createTaskListItemSchema, updateTaskListItemSchema } from "./task-list-item.schemas";
import { TaskListItemDetail } from "../../task-list-details/shared/task-list-details.types";

export type CreateTaskListItemRequest = z.infer<typeof createTaskListItemSchema>;
export type UpdateTaskListItemRequest = z.infer<typeof updateTaskListItemSchema>;

export type TaskListItem = {
  id: number;
  description: string;
  isCompleted: boolean;
};

export type ReorderedTaskListItemRequest = {
  taskListId: number;
  items: ListItemOrder[];
};

type ListItemOrder = {
  id: number;
  position: number;
};

export type UpdateTaskListItemStatusRequest = {
  taskListId: number;
  id: number;
  isCompleted: boolean;
};

export type TaskListItemResponse = {
  taskListId: number;
  message: string;
};

export type CreateTaskListItemResponse = TaskListItemResponse & {
  taskListItemDetail: TaskListItemDetail;
};

export type UpdateTaskListItemResponse = TaskListItemResponse;

export type ReorderedTaskListItemResponse = TaskListItemResponse;
export type UpdateStatusTaskListItemResponse = TaskListItemResponse;
export type DeleteTaskListItemResponse = TaskListItemResponse;
