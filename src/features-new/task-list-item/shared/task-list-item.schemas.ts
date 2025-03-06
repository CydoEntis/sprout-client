import { z } from "zod";

export const createTaskListItemSchema = z.object({
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long.")
    .max(100, "Description must be at most 100 characters long."),
  taskListId: z.number().min(1, "Task list ID is required"),
});

export const updateTaskListItemSchema = createTaskListItemSchema.extend({
  id: z.number().min(1, "Task list item ID is required"),
  isCompleted: z.boolean(),
});
