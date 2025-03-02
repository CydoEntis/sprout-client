import { z } from "zod";
import { newTaskListItemSchema } from "./task-list-item.schemas";

export type NewTaskListRequest = z.infer<typeof newTaskListItemSchema>;
