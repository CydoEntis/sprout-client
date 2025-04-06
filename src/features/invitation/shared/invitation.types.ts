import { z } from "zod";
import { SuccessMessage } from "../../shared/shared.types";
import { inviteUserSchema } from "./invite.schemas";

export type DecodedInviteToken = {
  taskListName: string;
  taskListId: string;
  category: string;
  inviteDate: string;
  inviter: string;
  inviterEmail: string;
  invitedUserEmail: string;
  members: string | null;
};

export type InviteAccepted = SuccessMessage & {
  taskListId: number;
  categoryName: string;
};

export type InvitedUser = {
  message: string;
};

export type InviteUser = z.infer<typeof inviteUserSchema>;
