import { z } from "zod";

export const taskListSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(25, "Title must be at most 25 characters long."),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long.")
    .max(100, "Description must be at most 100 characters long."),
  tasks: z
    .array(
      z.object({
        task: z.string().min(1, "Task description cannot be empty."),
        category: z.string().min(1, "Category cannot be empty."),
      })
    )
    .min(1, "At least one task must be added."),
});
