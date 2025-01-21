import { z } from "zod";
import { newCategorySchema } from "./category.schemas";
import { validCategoryTags } from "./category.constants";

export type NewCategoryRequest = z.infer<typeof newCategorySchema>;

export type CategoryIcon = {
  id: number;
  tag: string;
  icon: React.ReactNode;
};

export type NewCategoryResponse = {
  message: string;
};

export type ValidCategoryTags = typeof validCategoryTags[number];