import { z } from "zod";
import { newTaskListItemSchema, updateTaskListItemSchema } from "./task-list-item.schemas";

export type NewTaskListItemRequest = z.infer<typeof newTaskListItemSchema>;
export type UpdateTaskListItemRequest = z.infer<typeof updateTaskListItemSchema>;

export type ReorderedTaskListItemRequest = {
  taskListId: number;
  items: ListItemOrder[];
};

type ListItemOrder = {
  id: number;
  position: number;
};

type ListItemStatus = {
  id: number;
  isCompleted: boolean;
};
export type UpdateStatusTaskListItemRequest = {
  taskListId: number;
  items: ListItemStatus[];
};

export type NewTaskListItemResponse = {
  taskListId: string;
  message: string;
};

export type UpdateTaskListItemResponse = NewTaskListItemResponse;

export type ReorderedTaskListItemResponse = NewTaskListItemResponse;
export type UpdateStatusTaskListItemResponse = NewTaskListItemResponse;
