import { z } from "zod";

// Task List Schemas
export const createTasklistSchema = z.object({
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

export const updateTasklistSchema = createTasklistSchema.extend({
  id: z.number().min(1, "Task list ID is required"),
  categoryName: z.string().min(1, "Category is required"),
});

export const createTasklistWithCategorySchema = z
  .object({
    tasklistName: z.string().min(1, "Task list name is required"),
    tasklistDescription: z.string().optional(),
    categoryId: z.string().optional(),
    categoryName: z.string().optional(),
    categoryTag: z.string().optional(),
    categoryColor: z.string().optional(),
  })
  .refine(
    (data) => {
      // If creating a new category, require categoryName, categoryTag, and categoryColor
      if (data.categoryId === undefined) {
        return !!(data.categoryName && data.categoryName.trim() !== "");
      }
      return true;
    },
    {
      message: "Category name is required when creating a new category.",
      path: ["categoryName"],
    }
  )
  .refine(
    (data) => {
      // If creating a new category, require categoryTag
      if (data.categoryId === undefined) {
        return !!(data.categoryTag && data.categoryTag.trim() !== "");
      }
      return true;
    },
    {
      message: "Category tag is required when creating a new category.",
      path: ["categoryTag"],
    }
  )
  .refine(
    (data) => {
      // If creating a new category, require categoryColor
      if (data.categoryId === undefined) {
        return !!(data.categoryColor && data.categoryColor.trim() !== "");
      }
      return true;
    },
    {
      message: "Category color is required when creating a new category.",
      path: ["categoryColor"],
    }
  );

// Task List Item Schemas
export const createTasklistItemSchema = z.object({
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long.")
    .max(100, "Description must be at most 100 characters long."),
  tasklistId: z.number().min(1, "Task list ID is required"),
});

export const updateTasklistItemSchema = createTasklistItemSchema.extend({
  id: z.number().min(1, "Task list item ID is required"),
  isCompleted: z.boolean(),
  position: z.number().min(1, "Position is required"),
});
