import { z } from "zod";
import { newCategorySchema } from "./category.schemas";
import { validCategoryTags } from "./category.constants";
import { ReactElement } from "react";

export type NewCategoryRequest = z.infer<typeof newCategorySchema>;

export type CategoryIcon = {
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
};

export type UpdateCategoryResponse = {
  message: string;
  categoryId: number;
};

export type ValidCategoryTags = (typeof validCategoryTags)[number];
