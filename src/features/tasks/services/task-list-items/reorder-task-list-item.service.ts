import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { ReorderedTasklistItem, ReorderTasklistItems } from "../../shared/tasks.types";


const reorderTasklistItems = async (request: ReorderTasklistItems): Promise<ReorderedTasklistItem> => {
  return apiRequest<ReorderedTasklistItem>(
    "put",
    `${endpoints.tasklist}/${request.tasklistId}/items/reorder`,
    request
  );
};

export function useReorderTasklistItemsMutation() {
  return useMutation({
    mutationFn: async (request: ReorderTasklistItems): Promise<ReorderedTasklistItem> => {
      return await reorderTasklistItems(request);
    },
  });
}
