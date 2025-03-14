import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { notifications } from "@mantine/notifications";

const acceptInvite = async (inviteToken: string): Promise<string> => {
  return apiRequest<string>("post", `${endpoints.invite}/${inviteToken}/accept`);
};

export function useAcceptInviteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inviteToken: string): Promise<string> => {
      return await acceptInvite(inviteToken);
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
