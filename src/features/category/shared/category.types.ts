import { ReactElement } from "react";
import { newCategorySchema, updateCategorySchema } from "./category.schemas";
import { z } from "zod";
import { categoryColors, validCategoryTags } from "./category.constants";

export type NewCategoryRequest = z.infer<typeof newCategorySchema>;
export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;

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

export type NewCategoryResponse = {
  message: string;
};

export type CategoryResponse = {
  id: number;
  name: string;
  tag: ValidCategoryTags;
  taskListCount: number;
  color: CategoryColor;
};

export type UpdateCategoryResponse = {
  message: string;
  categoryId: number;
};

export type DeleteCategoryResponse = UpdateCategoryResponse;

export type ValidCategoryTags = (typeof validCategoryTags)[number];
export type CategoryColor = (typeof categoryColors)[number];

export type CategoryIcon = {
  id: number;
  icon: ReactElement;
  tag: ValidCategoryTags;
};
