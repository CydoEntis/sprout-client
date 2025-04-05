import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { ReorderedTaskListItem, ReorderTaskListItems } from "../../shared/tasks.types";

const reorderTaskListItems = async (request: ReorderTaskListItems): Promise<ReorderedTaskListItem> => {
  return apiRequest<ReorderedTaskListItem>("put", `${endpoints.tasklist}/${request.tasklistId}/items/reorder`, request);
};

export function useReorderTaskListItemsMutation(page: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: ReorderTaskListItems): Promise<ReorderedTaskListItem> => {
      return await reorderTaskListItems(request);
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.tasklistId],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.tasklistId, page],
      });
    },
  });
}
