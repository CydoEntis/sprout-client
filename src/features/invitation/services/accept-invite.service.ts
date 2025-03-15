import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { notifications } from "@mantine/notifications";
import { CreateCategory } from "../../category/shared/category.types";

type AcceptInviteParams = {
  inviteToken: string;
  newCategory?: CreateCategory | null;
  categoryId?: number | null;
};

const acceptInvite = async ({ inviteToken, newCategory, categoryId }: AcceptInviteParams): Promise<string> => {
  const payload = newCategory ? { newCategory } : { categoryId };

  return apiRequest<string>("post", `${endpoints.invite}/${inviteToken}/accept`, payload);
};

export function useAcceptInviteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: AcceptInviteParams): Promise<string> => {
      return await acceptInvite(params);
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ["task-list-members"] });

      notifications.show({
        title: "Invite Accepted",
        message: message || "You have joined the task list.",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Invite Acceptance Failed",
        message: "Could not accept the invite.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
