import { z } from "zod";

export enum TaskListRole {
  Owner = 0,
  Editor = 1,
  Viewer = 2,
}

export const inviteUserSchema = z.object({
  invitedUserEmail: z.string().email("Invalid email"),
  tasklistId: z.number(),
  role: z.nativeEnum(TaskListRole),
});
