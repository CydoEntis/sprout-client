import { z } from "zod";
import {
  createTaskListItemSchema,
  createTaskListSchema,
  updateTaskListItemSchema,
  updateTaskListSchema,
} from "./tasks.schemas";
import { Member, SuccessMessage } from "../../shared/shared.types";

export type CreateTaskList = z.infer<typeof createTaskListSchema>;

export type CreatedTaskList = SuccessMessage & {
  taskList: TaskList;
};

export type UpdateTaskList = z.infer<typeof updateTaskListSchema>;

export type UpdatedTaskList = CreateTaskList;

export type DeletedTaskList = SuccessMessage & {
  id: number;
};

type CategoryDetail = {
  id: number;
  name: string;
  tag: string;
  color: string;
}

export type TaskListPreview = {
  id: number;
  name: string;
  description: string;
  categoryDetail: CategoryDetail
  createdAt: Date;
  updatedAt: Date;
  categoryName: string;
  members: Member[];
  totalTasksCount: number;
  completedTasksCount: number;
  taskCompletionPercentage: number;
};

export type TaskList = {
  id: number;
  name: string;
  description: string;
  categoryName: string;
  isCompleted: boolean;
  members: Member[];
  taskListItems: TaskListItem[];
  totalTasksCount: number;
  completedTasksCount: number;
  createdAt: Date;
  updatedAt: Date;
};

// Task List Item Types

export type CreateTaskListItem = z.infer<typeof createTaskListItemSchema>;

export type CreatedTaskListItem = SuccessMessage & {
  taskListId: number;
  taskListItemDetail: TaskListItem;
};

export type CreatedTaskListItems = SuccessMessage & {
  taskListId: number;
  taskListItemDetails: TaskListItem[];
};

export type UpdateTaskListItem = z.infer<typeof updateTaskListItemSchema>;

export type UpdatedTaskListItem = CreatedTaskListItem;

export type ReorderTaskListItems = {
  items: TaskListItemPosition[];
};

export type TaskListItemStatus = {
  id: number;
  isCompleted: boolean;
};

export type TaskListItemPosition = {
  id: number;
  position: number;
};

export type TaskListItem = {
  id: number;
  description: string;
  isCompleted: boolean;
  position: number;
};
