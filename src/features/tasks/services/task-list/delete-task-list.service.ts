import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { TasklistDeletedResponse } from "../../shared/tasks.types";

const deleteTasklist = async (TasklistId: number): Promise<TasklistDeletedResponse> => {
  return apiRequest<TasklistDeletedResponse>("delete", `${endpoints.Tasklist}/${TasklistId}`);
};

export function useDeleteTasklistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (TasklistId: number): Promise<TasklistDeletedResponse> => {
      return await deleteTasklist(TasklistId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.TasklistId],
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
