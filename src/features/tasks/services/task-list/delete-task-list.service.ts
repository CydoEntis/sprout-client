import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { DeletedTasklist } from "../../shared/tasks.types";

const deleteTasklist = async (tasklistId: number): Promise<DeletedTasklist> => {
  return apiRequest<DeletedTasklist>("delete", `${endpoints.tasklist}/${tasklistId}`);
};

export function useDeleteTasklistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tasklistId: number): Promise<DeletedTasklist> => {
      return await deleteTasklist(tasklistId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.id],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "lime",
        position: "top-right",
        className: "notification",
      });
    },
    onError: (data) => {
      notifications.show({
        title: "Task List Deletion Failed",
        message: data.message,
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
