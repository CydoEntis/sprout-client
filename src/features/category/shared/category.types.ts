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

export type TasklistMetadata = {
  tasklistId: number;
  tasklistName: string;
};

export type PaginatedCategoriesWithTasklistCount = {
  items: CategoryWithTasklistCount[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
};

export type CategoryAndRecentTasklists = Category & {
  recentTasklists: TasklistMetadata[];
};

export type CategoryWithTasklistCount = Category & {
  totalTasklists: number;
};

export type CreatedCategory = {
  message: string;
};

export type UpdatedCategory = {
  message: string;
  categoryId: number;
};

export type DeletedCategory = UpdatedCategory;
