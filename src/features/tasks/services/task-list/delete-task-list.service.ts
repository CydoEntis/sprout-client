import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { DeletedTaskList } from "../../shared/tasks.types";

const deleteTaskList = async (tasklistId: number): Promise<DeletedTaskList> => {
  return apiRequest<DeletedTaskList>("delete", `${endpoints.tasklist}/${tasklistId}`);
};

export function useDeleteTaskListMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tasklistId: number): Promise<DeletedTaskList> => {
      return await deleteTaskList(tasklistId);
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
