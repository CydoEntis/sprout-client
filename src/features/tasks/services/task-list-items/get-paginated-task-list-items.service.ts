import { useQuery } from "@tanstack/react-query";
import endpoints from "../../../../api/endpoints";
import { apiRequest } from "../../../../api/apiRequest";
import { TaskListItem } from "../../shared/tasks.types";
import { Paginated } from "../../../../util/types/shared.types";

export const getPaginatedTaskListItems = async (tasklistId: number, page: number): Promise<Paginated<TaskListItem>> => {
  return apiRequest("get", `${endpoints.tasklist}/${tasklistId}/items`, { params: { page } });
};

export const getPaginatedTaskListItemsQueryOptions = (tasklistId: number, page: number) => ({
  queryKey: ["task-list-items", tasklistId, page],
  queryFn: () => getPaginatedTaskListItems(tasklistId, page),
  enabled: !!tasklistId,
  staleTime: 0,
});

export const useGetPaginatedTaskListItems = (tasklistId: number, page: number) => {
  return useQuery(getPaginatedTaskListItemsQueryOptions(tasklistId, page));
};
