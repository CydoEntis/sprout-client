import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { Paginated, PaginationParams } from "../../../util/types/shared.types";
import { TaskListOverview } from "../../task-list/shared/tasks.types";

const getAllTaskListsForCategory = async (
  categoryName: string,
  params: PaginationParams
): Promise<Paginated<TaskListOverview>> => {
  const queryParams = new URLSearchParams(params as Record<string, string>);
  return apiRequest<Paginated<TaskListOverview>>(
    "get",
    `${endpoints.category}/${encodeURIComponent(categoryName)}/task-lists?${queryParams.toString()}`
  );
};

export const getAllTaskListsForCategoryQueryOptions = (categoryName: string, params: PaginationParams) =>
  queryOptions({
    queryKey: ["task-lists", categoryName.toLowerCase(), params],
    queryFn: () => getAllTaskListsForCategory(categoryName, params),
    enabled: !!categoryName,
    staleTime: 0,
  });

export const useGetAllTaskListsForCategory = (categoryName: string, params: PaginationParams) => {
  return useQuery(getAllTaskListsForCategoryQueryOptions(categoryName, params));
};
