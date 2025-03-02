import { z } from "zod";
import { newTaskListItemSchema } from "./task-list-item.schemas";

export type NewTaskListItemRequest = z.infer<typeof newTaskListItemSchema>;

export type NewTaskListItemResponse = {
    taskListId: string;
    message: string;
  };