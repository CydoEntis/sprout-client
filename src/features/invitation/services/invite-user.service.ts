import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { notifications } from "@mantine/notifications";
import { InviteUser, InvitedUser } from "../shared/invitation.types";

const inviteUser = async (params: InviteUser): Promise<InvitedUser> => {
  return apiRequest<InvitedUser>("post", `${endpoints.tasklist}/${params.taskListId}/invite`, params);
};

export function useInviteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task-list-members"] });

      notifications.show({
        title: "Invitation Sent",
        message: data.message || "User has been invited.",
        color: "lime",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Invitation Failed",
        message: "Could not send invitation.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
