import { z } from "zod";
import { newTaskListSchema } from "./task-list.schemas";

export type NewTaskListRequest = z.infer<typeof newTaskListSchema>;
