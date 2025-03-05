import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { UpdateStatusTaskListItemRequest, UpdateStatusTaskListItemResponse } from "../shared/task-list-item.types";

const updateTaskListStatusItem = async (
  taskListId: number,
  updatedTaskListItem: UpdateStatusTaskListItemRequest
): Promise<UpdateStatusTaskListItemResponse> => {
  return apiRequest<UpdateStatusTaskListItemResponse>(
    "put",
    `${endpoints.taskList}/${taskListId}/items/status`,
    updatedTaskListItem
  );
};

export function useUpdateTaskListStatusItemMutation(taskListId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      updatedTaskListItem: UpdateStatusTaskListItemRequest
    ): Promise<UpdateStatusTaskListItemResponse> => {
      return await updateTaskListStatusItem(taskListId, updatedTaskListItem);
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
