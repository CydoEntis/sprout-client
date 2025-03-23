import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { notifications } from "@mantine/notifications";
import { CreateCategory } from "../../category/shared/category.types";
import { InviteAccepted as InviteAccepted } from "../shared/invitation.types";

type AcceptInviteParams = {
  inviteToken: string;
  newCategory?: CreateCategory | null;
  categoryId?: number | null;
};

const acceptInvite = async ({ inviteToken, newCategory, categoryId }: AcceptInviteParams): Promise<InviteAccepted> => {
  const payload = { categoryId, newCategory };
  return apiRequest<InviteAccepted>("post", `${endpoints.invite}/${inviteToken}/accept`, payload);
};

export function useAcceptInviteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: AcceptInviteParams): Promise<InviteAccepted> => {
      return await acceptInvite(params);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task-list-members"] });

      notifications.show({
        title: "Invite Accepted",
        message: data.message || "You have joined the task list.",
        color: "lime",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Invite Acceptance Failed",
        message: "Could not accept invite.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
