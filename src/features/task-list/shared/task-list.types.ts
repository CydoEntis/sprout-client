import { z } from "zod";
import { newTaskListSchema } from "./task-list.schemas";

export type NewTaskListRequest = z.infer<typeof newTaskListSchema>;

export type NewTaskListResponse = {
  id: string;
  message: string;
};

export type TaskListResponse = {
  id: number;
  name: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  members: MemberResponse[];
};

export type MemberResponse = {
  userId: string;
  name: string;
};
