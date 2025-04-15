import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { Paginated, PaginationParams } from "../../../../util/types/shared.types";
import { TaskListItemsDueThisWeekByCategory } from "../../shared/tasks.types";

export const getTaskListItemsDueForTheWeek = async (
  params: PaginationParams
): Promise<Paginated<TaskListItemsDueThisWeekByCategory>> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const queryParams = new URLSearchParams(params as Record<string, string>);
  return apiRequest<Paginated<TaskListItemsDueThisWeekByCategory>>(
    "get",
    `${endpoints.tasklist}/coming-up?${queryParams.toString()}`
  );
};

export const getTaskListItemsDueForTheWeekQueryOptions = (params: PaginationParams) =>
  queryOptions({
    queryKey: ["task-list", "coming-up", params],
    queryFn: () => getTaskListItemsDueForTheWeek(params),
    staleTime: 0,
  });

export const useTaskListItemsDueForTheWeek = (params: PaginationParams) => {
  return useQuery(getTaskListItemsDueForTheWeekQueryOptions(params));
};
