import { createCategorySchema, selectCategorySchema, updateCategorySchema } from "./category.schemas";
import { z } from "zod";
import { ValidIconTags } from "../../../util/types/valid-icon.types";
import { ValidColor } from "../../../util/types/valid-color.types";
import { Member } from "../../shared/shared.types";

export type CreateCategory = z.infer<typeof createCategorySchema>;
export type SelectCategory = z.infer<typeof selectCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;

export type Category = {
  id: number;
  name: string;
  tag: ValidIconTags;
  color: ValidColor;
};

export type TaskListMetadata = {
  taskListId: number;
  tasklistName: string;
};

export type PaginatedCategoriesWithTaskListCount = {
  items: CategoryWithTaskListCount[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
};

export type CategoryAndRecentTaskLists = Category & {
  recentTaskLists: TaskListMetadata[];
};

export type CategoryWithTaskListCount = {
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

export type CreatedCategory = {
  message: string;
};

export type UpdatedCategory = {
  message: string;
  categoryId: number;
};

export type DeletedCategory = UpdatedCategory;
