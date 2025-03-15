import { SuccessMessage } from "../../shared/shared.types";

export type DecodedInviteToken = {
  taskListName: string;
  taskListId: string;
  category: string;
  inviteDate: string;
  inviter: string;
  inviterEmail: string;
  members: string | null;
};

export type InviteAccepted = SuccessMessage & {
  taskListId: number;
  categoryName: string;
};
