import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { Paginated, PaginationParams } from "../../../../util/types/shared.types";
import { FavoritedTaskList } from "../../shared/tasks.types";

export const getFavoritedTaskLists = async (params: PaginationParams): Promise<Paginated<FavoritedTaskList>> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const queryParams = new URLSearchParams(params as Record<string, string>);
  return apiRequest("get", `${endpoints.tasklist}/favorites?${queryParams.toString()}`);
};

export const getFavoritedTaskListsQueryOptions = (params: PaginationParams) =>
  queryOptions({
    queryKey: ["task-lists", "favorites", params],
    queryFn: () => getFavoritedTaskLists(params),
    staleTime: 1000 * 60 * 5,
  });

export const useGetFavoritedTaskLists = (params: PaginationParams) => {
  return useQuery(getFavoritedTaskListsQueryOptions(params));
};
