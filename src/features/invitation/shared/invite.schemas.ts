import { z } from "zod";

export enum TaskListRole {
  Owner = 0,
  Editor = 1,
  Viewer = 2,
}

export const inviteUserSchema = z.object({
  invitedUserEmails: z.array(z.string().email("Invalid email")).min(1, "Please provide at least one email"),
  tasklistId: z.number(),
  role: z.nativeEnum(TaskListRole),
});
