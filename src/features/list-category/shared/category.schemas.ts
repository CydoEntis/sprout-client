import { z } from "zod";

export const tagList = [
  "shopping",
  "work",
  "home",
  "health",
  "finance",
  "travel",
] as const;

export const newCategorySchema = z.object({
  category: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(25, "Title must be at most 25 characters long."),
  tag: z.enum(tagList, {
    errorMap: () => ({ message: "You must select a valid icon." }),
  }),
});
