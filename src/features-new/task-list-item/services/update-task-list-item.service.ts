import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { UpdateTaskListItemRequest, UpdateTaskListItemResponse } from "../shared/task-list-item.types";

const updateTaskListItem = async (
  updatedTaskListItem: UpdateTaskListItemRequest
): Promise<UpdateTaskListItemResponse> => {
  return apiRequest<UpdateTaskListItemResponse>("put", `${endpoints.taskListItem}`, updatedTaskListItem);
};

export function useUpdateTaskListItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTaskListItem: UpdateTaskListItemRequest): Promise<UpdateTaskListItemResponse> => {
      return await updateTaskListItem(updatedTaskListItem);
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
