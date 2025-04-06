import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { TaskListInfo } from "../../shared/tasks.types";

export const getFavoritedTaskLists = async (): Promise<TaskListInfo[]> => {
  return apiRequest<TaskListInfo[]>("get", `${endpoints.tasklist}/favorites`);
};

export const getFavoritedTaskListsQueryOptions = () =>
  queryOptions({
    queryKey: ["task-lists", "favorites"],
    queryFn: getFavoritedTaskLists,
    staleTime: 1000 * 60 * 5,
  });

export const useGetFavoritedTaskLists = () => {
  return useQuery(getFavoritedTaskListsQueryOptions());
};
