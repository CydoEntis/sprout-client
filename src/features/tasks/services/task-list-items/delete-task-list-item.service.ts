import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { DeleteTaskListItemResponse } from "../../../task-list-item/shared/task-list-item.types";

export type DeleteTaskListItemRequest = {
  taskListId: number;
  taskListItemId: number;
};

const deleteTaskListItem = async (request: DeleteTaskListItemRequest): Promise<DeleteTaskListItemResponse> => {
  return apiRequest<DeleteTaskListItemResponse>(
    "delete",
    `${endpoints.taskList}/${request.taskListId}/items/${request.taskListItemId}`
  );
};

export function useDeleteTaskListItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: DeleteTaskListItemRequest): Promise<DeleteTaskListItemResponse> => {
      return await deleteTaskListItem(request);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.taskListId],
      });
    },
  });
}
