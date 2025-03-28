import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import {
  UpdateStatusTasklistItemResponse,
  UpdateTasklistItemStatusRequest,
} from "../../../task-list-item/shared/task-list-item.types";

const updateTasklistStatusItem = async (
  request: UpdateTasklistItemStatusRequest
): Promise<UpdateStatusTasklistItemResponse> => {
  return apiRequest<UpdateStatusTasklistItemResponse>(
    "put",
    `${endpoints.Tasklist}/${request.TasklistId}/items/status`,
    request
  );
};

export function useUpdateTasklistStatusItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: UpdateTasklistItemStatusRequest): Promise<UpdateStatusTasklistItemResponse> => {
      return await updateTasklistStatusItem(request);
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
        title: "Task List Creation Failed",
        message: data.message,
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
