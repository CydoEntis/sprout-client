import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";

export type DeleteTasklistItemRequest = {
  TasklistId: number;
  TasklistItemId: number;
};

const deleteTasklistItem = async (request: DeleteTasklistItemRequest): Promise<DeleteTasklistItemResponse> => {
  return apiRequest<DeleteTasklistItemResponse>(
    "delete",
    `${endpoints.Tasklist}/${request.TasklistId}/items/${request.TasklistItemId}`
  );
};

export function useDeleteTasklistItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: DeleteTasklistItemRequest): Promise<DeleteTasklistItemResponse> => {
      return await deleteTasklistItem(request);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.TasklistId],
      });
    },
  });
}
