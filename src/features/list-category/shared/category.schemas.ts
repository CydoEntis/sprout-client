import { z } from "zod";

export const iconList = [
  "shopping",
  "work",
  "home",
  "health",
  "finance",
  "travel",
] as const;

export const listCategorySchema = z.object({
  category: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(25, "Title must be at most 25 characters long."),
  icon: z.enum(iconList, {
    errorMap: () => ({ message: "You must select a valid icon from the list." }),
  }),
});
