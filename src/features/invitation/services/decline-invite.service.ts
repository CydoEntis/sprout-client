import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";

const declineInvite = async (inviteToken: string): Promise<string> => {
  return apiRequest<string>("post", `${endpoints.invite}/${inviteToken}/decline`);
};

export function useDeclineInviteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inviteToken: string): Promise<string> => {
      return await declineInvite(inviteToken);
    },
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ["pending-invites"] });

      notifications.show({
        title: "Invite Declined",
        message: message || "You have declined the invite.",
        color: "yellow",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Invite Decline Failed",
        message: "Could not decline the invite.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
