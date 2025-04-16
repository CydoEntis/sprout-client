import { createCategorySchema, selectCategorySchema, updateCategorySchema } from "./category.schemas";
import { z } from "zod";
import { ValidIconTags } from "../../../util/types/valid-icon.types";
import { ValidColor } from "../../../util/types/valid-color.types";

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

export type CategoryAndRecentTaskLists = Category & {
  recentTaskLists: TaskListMetadata[];
};

export type CategoryWithTaskListCount = {
  id: number;
  name: string;
  tag: string;
  color: string;
  totalTaskLists: number;
};

export type CreatedCategory = {
  message: string;
};

export type UpdatedCategory = {
  message: string;
  categoryId: number;
};

export type DeletedCategory = UpdatedCategory;
