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
}


export type NewTaskListItemResponse = {
  taskListId: string;
  message: string;
};

export type UpdateTaskListItemResponse = NewTaskListItemResponse;

export type ReorderedTaskListItemResponse = NewTaskListItemResponse;
