import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { DeletedTaskList, DeletedTaskListItem, DeleteTaskListItem } from "../../shared/tasks.types";

const deleteTaskListItem = async (request: DeleteTaskListItem): Promise<DeletedTaskListItem> => {
  return apiRequest<DeletedTaskList>(
    "delete",
    `${endpoints.tasklist}/${request.tasklistId}/items/${request.tasklistItemId}`
  );
};

export function useDeleteTaskListItemMutation(page: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: DeleteTaskListItem): Promise<DeletedTaskListItem> => {
      return await deleteTaskListItem(request);
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
