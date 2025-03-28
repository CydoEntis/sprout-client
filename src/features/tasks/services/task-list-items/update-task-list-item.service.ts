import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import {
  UpdateTasklistItemRequest,
  UpdateTasklistItemResponse,
} from "../../../task-list-item/shared/task-list-item.types";

const updateTasklistItem = async (
  updatedTasklistItem: UpdateTasklistItemRequest
): Promise<UpdateTasklistItemResponse> => {
  return apiRequest<UpdateTasklistItemResponse>(
    "put",
    `${endpoints.Tasklist}/${updatedTasklistItem.TasklistId}/items`,
    updatedTasklistItem
  );
};

export function useUpdateTasklistItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTasklistItem: UpdateTasklistItemRequest): Promise<UpdateTasklistItemResponse> => {
      return await updateTasklistItem(updatedTasklistItem);
    },
    onSuccess: (data) => {
      console.log(data);

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
        title: "Task List Creation Failed",
        message: data.message,
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
