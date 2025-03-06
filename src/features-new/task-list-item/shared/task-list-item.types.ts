import { z } from "zod";
import { newTaskListItemSchema, updateTaskListItemSchema } from "./task-list-item.schemas";
import { TaskListItemDetail } from "../../task-list-details/shared/task-list-details.types";

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

export type UpdateStatusTaskListItemRequest = {
  id: number;
  isCompleted: boolean;
};

export type TaskListItemResponse = {
  taskListId: string;
  message: string;
};

export type CreateTaskListItemResponse = TaskListItemResponse & {
  taskListItem: TaskListItemDetail;
}

export type UpdateTaskListItemResponse = TaskListItemResponse;

export type ReorderedTaskListItemResponse = TaskListItemResponse;
export type UpdateStatusTaskListItemResponse = TaskListItemResponse;
export type DeleteTaskListItemResponse = TaskListItemResponse;
