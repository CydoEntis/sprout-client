import { useQuery } from "@tanstack/react-query";
import { Paginated } from "../../../../util/types/shared.types";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { ItemsDuePerCategory } from "../../shared/tasks.types";

export const getTaskListItemsDueToday = async (page: number): Promise<Paginated<ItemsDuePerCategory>> => {
  return apiRequest<Paginated<ItemsDuePerCategory>>("get", `${endpoints.tasklist}/today`, {
    params: { page },
  });
};

export const getTaskListItemsDueTodayQueryOptions = (page: number) => ({
  queryKey: ["task-list", "today", page],
  queryFn: () => getTaskListItemsDueToday(page),
  staleTime: 0,
});

export const useTaskListItemsDueToday = (page: number) => {
  return useQuery(getTaskListItemsDueTodayQueryOptions(page));
};
