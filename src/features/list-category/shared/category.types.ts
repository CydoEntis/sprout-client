import { z } from "zod";
import { newCategorySchema } from "./category.schemas";

export type NewCategoryRequest = z.infer<typeof newCategorySchema>;

export type CategoryIcon = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

export type NewCategoryResponse = {
  message: string;
};