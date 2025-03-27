import { z } from "zod";
import { validIconTags } from "../../../util/constants/valid-icon.constants";
import { validColors } from "../../../util/constants/valid-colors.constants";

// Task List Schemas
export const createTaskListSchema = z.object({
  name: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(25, "Title must be at most 25 characters long."),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long.")
    .max(100, "Description must be at most 100 characters long."),
  categoryName: z.string().min(1, "Category name is required"),
});

export const updateTaskListSchema = createTaskListSchema.extend({
  id: z.number().min(1, "Task list ID is required"),
  categoryName: z.string().min(1, "Category is required"),
});

export const createTasklistWithCategorySchema = z.union([
  z.object({
    categoryId: z.undefined(),
    categoryName: z.string().min(1, "Category name is required"),
    categoryTag: z.enum(validIconTags, {
      errorMap: () => ({ message: "Invalid category tag" }),
    }),
    categoryColor: z.enum(validColors, {
      errorMap: () => ({ message: "Invalid category color" }),
    }),
    taskListName: z.string().min(1, "Task list name is required"),
    taskListDescription: z.string().optional(),
  }),

  z.object({
    categoryId: z.string().min(1, "Category selection is required"),
    categoryName: z.undefined(),
    categoryTag: z.undefined(),
    categoryColor: z.undefined(),
    taskListName: z.string().min(1, "Task list name is required"),
    taskListDescription: z.string().optional(),
  }),
]);

// Task List Item Schemas
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
  position: z.number().min(1, "Position is required"),
});
