import { SuccessMessage } from "../../shared/shared.types";

export type DecodedInviteToken = {
  TasklistName: string;
  TasklistId: string;
  category: string;
  inviteDate: string;
  inviter: string;
  inviterEmail: string;
  members: string | null;
};

export type InviteAccepted = SuccessMessage & {
  TasklistId: number;
  categoryName: string;
};
