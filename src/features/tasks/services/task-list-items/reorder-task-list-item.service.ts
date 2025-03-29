import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { ReorderedTasklistItemRequest, ReorderedTasklistItemResponse } from "../../../task-list-item/shared/task-list-item.types";

const reorderTasklistItems = async (request: ReorderedTasklistItemRequest): Promise<ReorderedTasklistItemResponse> => {
  return apiRequest<ReorderedTasklistItemResponse>(
    "put",
    `${endpoints.tasklist}/${request.TasklistId}/items/reorder`,
    request
  );
};

export function useReorderTasklistItemsMutation() {
  return useMutation({
    mutationFn: async (request: ReorderedTasklistItemRequest): Promise<ReorderedTasklistItemResponse> => {
      return await reorderTasklistItems(request);
    },
  });
}
