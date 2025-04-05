import { TaskListRole } from "../invitation/shared/invite.schemas";

export type SuccessMessage = {
  message: string;
};

export type Member = {
  userId: string;
  name: string;
  role: TaskListRole;
};
