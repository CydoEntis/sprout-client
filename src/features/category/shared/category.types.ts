import { ReactElement } from "react";
import { createCategorySchema, updateCategorySchema } from "./category.schemas";
import { z } from "zod";
import { categoryColors, validCategoryTags } from "./category.constants";

export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;

export type Category = {
  id: number;
  name: string;
  tag: ValidCategoryTags;
  color: CategoryColor;
};

export type CategoryIdentifier = {
  id: number;
  tag: ValidCategoryTags;
  icon: ReactElement;
};

export type CreatedCategory = {
  message: string;
};

export type CategoryResponse = {
  id: number;
  name: string;
  tag: ValidCategoryTags;
  taskListCount: number;
  color: CategoryColor;
};

export type UpdatedCategory = {
  message: string;
  categoryId: number;
};

export type DeletedCategory = UpdatedCategory;

export type ValidCategoryTags = (typeof validCategoryTags)[number];
export type CategoryColor = (typeof categoryColors)[number];

export type CategoryIcon = {
  id: number;
  icon: ReactElement;
  tag: ValidCategoryTags;
};
