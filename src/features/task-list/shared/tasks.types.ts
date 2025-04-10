import { z } from "zod";
import {
  createTaskListItemSchema,
  createTaskListSchema,
  createTaskListWithCategorySchema,
  updateTaskListItemSchema,
  updateTaskListSchema,
} from "./tasks.schemas";
import { Member, SuccessMessage } from "../../shared/shared.types";
import { TaskListRole } from "../../invitation/shared/invite.schemas";

export type CreateTaskList = z.infer<typeof createTaskListSchema>;

export type CreatedTaskList = SuccessMessage & {
  message: string;
  taskListId: number;
};

export type UpdateTaskList = z.infer<typeof updateTaskListSchema>;

export type UpdatedTaskList = {
  message: string;
  taskListId: number;
};

export type DeleteTaskListItem = {
  taskListId: number;
  tasklistItemId: number;
};

export type DeletedTaskListItem = SuccessMessage & {
  id: number;
};

export type DeletedTaskList = SuccessMessage & {
  id: number;
};

export type TaskListOverview = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  members: Member[];
  remainingMembers: number;
  taskCompletionPercentage: number;
  isFavorited: boolean;
};

export type TaskListDetails = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  totalTasksCount: number;
  completedTasksCount: number;
  members: Member[];
  additionalMemberCount: number;
  tasklistItems: TaskListItem[];
  categoryColor: string;
  isFavorited: boolean;
  role: TaskListRole;
};

export type CategoryWithTaskList = {
  categoryId: number;
  categoryName: string;
  categoryTag: string;
  categoryColor: string;
  taskListOverviews: TaskListOverview[];
};

export type FavoritedTaskList = {
  taskListId: number;
  categoryName: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  members: Member[];
  remainingMembers: number;
  taskCompletionPercentage: number;
  isFavorited: boolean;
};

export type TaskList = {
  id: number;
  name: string;
  description: string;
};

export type CreateTaskListWithCategory = z.infer<typeof createTaskListWithCategorySchema>;

export interface CreatedTaskListWithCategory {
  categoryId: number;
  categoryName: string;
  taskListId: number;
  taskListName: string;
  message: string;
}

// Task List Item Types

export type CreateTaskListItem = z.infer<typeof createTaskListItemSchema>;

export type CreatedTaskListItem = SuccessMessage & {
  taskListId: number;
  tasklistItemDetail: TaskListItem;
};

export type CreatedTaskListItems = SuccessMessage & {
  taskListId: number;
  tasklistItemDetails: TaskListItem[];
};

export type UpdateTaskListItem = z.infer<typeof updateTaskListItemSchema>;

export type UpdatedTaskListItem = CreatedTaskListItem;

export type UpdateTaskListItemStatus = { taskListId: number; id: number; isCompleted: boolean };

export type UpdatedTaskListItemStatus = CreatedTaskListItem;

export type ReorderTaskListItems = {
  taskListId: number;
  items: TaskListItemPosition[];
};

export type ReorderedTaskListItem = {
  taskListId: number;
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
  dueDate?: string | null;
};

export type FavoriteTaskList = {
  taskListId: number;
  isFavorited: boolean;
};

export type DueTodayTaskListItem = {
  id: number;
  taskListId: number;
  taskListName: string;
  description: string | null;
  isCompleted: boolean;
  dueDate: Date;
};
export type ItemsDuePerCategory = {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
  categoryTag: string;
  dueCount: number;
  items: DueTodayTaskListItem[];
};
