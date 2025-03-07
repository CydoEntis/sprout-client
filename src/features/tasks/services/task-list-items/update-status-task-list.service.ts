import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { UpdateStatusTaskListItemResponse, UpdateTaskListItemStatusRequest } from "../../../task-list-item/shared/task-list-item.types";

const updateTaskListStatusItem = async (
  request: UpdateTaskListItemStatusRequest
): Promise<UpdateStatusTaskListItemResponse> => {
  return apiRequest<UpdateStatusTaskListItemResponse>(
    "put",
    `${endpoints.taskList}/${request.taskListId}/items/status`,
    request
  );
};

export function useUpdateTaskListStatusItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: UpdateTaskListItemStatusRequest): Promise<UpdateStatusTaskListItemResponse> => {
      return await updateTaskListStatusItem(request);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.taskListId],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: (data) => {
      notifications.show({
        title: "Task List Creation Failed",
        message: data.message,
        color: "red",
        position: "top-right",
      });
    },
  });
}
