import { TaskListRole } from "../invitation/shared/invite.schemas";

export type SuccessMessage = {
  message: string;
};

export type Member = {
  id: string;
  name: string;
  role: TaskListRole;
};
