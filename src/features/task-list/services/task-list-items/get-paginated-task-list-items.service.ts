import { useQuery } from "@tanstack/react-query";
import endpoints from "../../../../api/endpoints";
import { apiRequest } from "../../../../api/apiRequest";
import { TaskListItem } from "../../shared/tasks.types";
import { Paginated } from "../../../../util/types/shared.types";

export const getPaginatedTaskListItems = async (taskListId: number, page: number): Promise<Paginated<TaskListItem>> => {
  return apiRequest("get", `${endpoints.tasklist}/${taskListId}/items`, { params: { page } });
};

export const getPaginatedTaskListItemsQueryOptions = (taskListId: number, page: number) => ({
  queryKey: ["task-list-items", taskListId, page],
  queryFn: () => getPaginatedTaskListItems(taskListId, page),
  enabled: !!taskListId,
  staleTime: 0,
});

export const useGetPaginatedTaskListItems = (taskListId: number, page: number) => {
  return useQuery(getPaginatedTaskListItemsQueryOptions(taskListId, page));
};
