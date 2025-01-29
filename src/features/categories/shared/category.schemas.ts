import { z } from "zod";
import { validCategoryTags } from "./category.constants";

export const newCategorySchema = z.object({
  name: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(25, "Title must be at most 25 characters long."),
  tag: z.enum(validCategoryTags, {
    errorMap: () => ({ message: "You must select a valid icon." }),
  }),
});
