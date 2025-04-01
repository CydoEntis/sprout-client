import { z } from "zod";

export enum TaskListRole {
  Owner = 0,
  Editor = 1,
  Viewer = 2,
}

export const inviteUserSchema = z.object({
  invitedUserEmails: z.array(z.string().email("Invalid email")), // Updated to array of emails
  tasklistId: z.number(),
  role: z.nativeEnum(TaskListRole),
});
