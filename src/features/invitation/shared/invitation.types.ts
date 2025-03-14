export type DecodedInviteToken = {
  taskListName: string;
  taskListId: string;
  category: string;
  inviteDate: string;
  inviter: string;
  inviterEmail: string;
  members: string | null; 
};