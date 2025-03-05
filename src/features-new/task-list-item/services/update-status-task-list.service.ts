import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { UpdateStatusTaskListItemRequest, UpdateStatusTaskListItemResponse } from "../shared/task-list-item.types";

const updateTaskListStatusItem = async (
  updatedTaskListItem: UpdateStatusTaskListItemRequest
): Promise<UpdateStatusTaskListItemResponse> => {
  return apiRequest<UpdateStatusTaskListItemResponse>(
    "put",
    `${endpoints.taskListItem}/${updatedTaskListItem.taskListId}/items`,
    updatedTaskListItem
  );
};

export function useUpdateTaskListStatusItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      updatedTaskListItem: UpdateStatusTaskListItemRequest
    ): Promise<UpdateStatusTaskListItemResponse> => {
      return await updateTaskListStatusItem(updatedTaskListItem);
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
