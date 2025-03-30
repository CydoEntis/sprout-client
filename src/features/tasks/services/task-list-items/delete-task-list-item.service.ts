import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { DeletedTasklist, DeletedTasklistItem, DeleteTasklistItem } from "../../shared/tasks.types";

const deleteTasklistItem = async (request: DeleteTasklistItem): Promise<DeletedTasklistItem> => {
  return apiRequest<DeletedTasklist>(
    "delete",
    `${endpoints.tasklist}/${request.tasklistId}/items/${request.tasklistItemId}`
  );
};

export function useDeleteTasklistItemMutation(page: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: DeleteTasklistItem): Promise<DeletedTasklistItem> => {
      return await deleteTasklistItem(request);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.id, page],
      });
    },
  });
}
