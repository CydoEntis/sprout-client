import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { ReorderedTaskListItemRequest, ReorderedTaskListItemResponse } from "../../../task-list-item/shared/task-list-item.types";

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
  });
}
