import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { DeleteTaskListItemResponse } from "../shared/task-list-item.types";

const deleteTaskListItem = async (taskListId: number, taskListItemId: number): Promise<DeleteTaskListItemResponse> => {
  return apiRequest<DeleteTaskListItemResponse>(
    "delete",
    `${endpoints.taskList}/${taskListId}/items/${taskListItemId}`
  );
};

export function useDeleteTaskListItemMutation(taskListId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskListItemId: number): Promise<DeleteTaskListItemResponse> => {
      return await deleteTaskListItem(taskListId, taskListItemId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.taskListId],
      });
    },
  });
}
