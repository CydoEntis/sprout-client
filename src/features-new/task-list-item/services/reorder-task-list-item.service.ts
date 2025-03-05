import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { ReorderedTaskListItemRequest, ReorderedTaskListItemResponse } from "../shared/task-list-item.types";

const reorderTaskListItems = async (request: ReorderedTaskListItemRequest): Promise<ReorderedTaskListItemResponse> => {
  return apiRequest<ReorderedTaskListItemResponse>(
    "put",
    `${endpoints.taskList}/${request.taskListId}/items/reorder`,
    request
  );
};

export function useReorderTaskListItemsMutation() {
  return useMutation({
    mutationFn: async (request: ReorderedTaskListItemRequest): Promise<ReorderedTaskListItemResponse> => {
      return await reorderTaskListItems(request);
    },
    onSuccess: (data) => {
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
