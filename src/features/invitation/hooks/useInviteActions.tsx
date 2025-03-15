import { useAcceptInviteMutation } from "../services/accept-invite.service";
import { useDeclineInviteMutation } from "../services/decline-invite.service";
import { useNavigate } from "@tanstack/react-router";
import { DecodedInviteToken } from "../shared/invitation.types";
import { CreateCategory } from "../../category/shared/category.types";

export function useInviteActions(inviteToken: string, invite: DecodedInviteToken | null) {
  const navigate = useNavigate();
  const { mutateAsync: acceptInviteAsync } = useAcceptInviteMutation();
  const { mutateAsync: declineInviteAsync } = useDeclineInviteMutation();

  const acceptInvite = async ({
    newCategory,
    selectedCategoryId,
  }: {
    newCategory?: CreateCategory | null;
    selectedCategoryId?: number | null;
  }) => {
    const requestData = newCategory
      ? { inviteToken, newCategory }
      : { inviteToken, categoryId: selectedCategoryId };

    const response = await acceptInviteAsync(requestData);

    if (invite) {
      navigate({ to: `/categories/${invite.category}/${invite.taskListId}` });
    }
  };

  const declineInvite = async () => {
    await declineInviteAsync(inviteToken);
    navigate({ to: "/categories" });
  };

  return { acceptInvite, declineInvite };
}
