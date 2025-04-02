import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { notifications } from "@mantine/notifications";

type RemoveMemberParams = {
  memberId: number;
};

const removeMember = async ({ memberId }: RemoveMemberParams): Promise<void> => {
  return apiRequest<void>("delete", `${endpoints.tasklist}/${memberId}`);
};

export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: RemoveMemberParams) => await removeMember(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-list-members"] });

      notifications.show({
        title: "Member Removed",
        message: "Member has been removed successfully.",
        color: "lime",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Removal Failed",
        message: "Could not remove member.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
