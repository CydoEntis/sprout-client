import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";

const transferOwnership = async (taskListId: number, newOwnerId: string): Promise<void> => {
  return apiRequest<void>("put", `${endpoints.tasklist}/${taskListId}/transfer-ownership/${newOwnerId}`);
};

export function useTransferOwnership() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskListId, newOwnerId }: { taskListId: number; newOwnerId: string }) =>
      transferOwnership(taskListId, newOwnerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-list-members"] });

      notifications.show({
        title: "Ownership Transferred",
        message: "Ownership has been successfully transferred.",
        color: "lime",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Transfer Failed",
        message: "Could not transfer ownership.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
