import { useQuery } from "@tanstack/react-query";
import { Paginated } from "../../../../util/types/shared.types";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { DueTodayTaskListItem } from "../../shared/tasks.types";

export const getTaskListItemsDueToday = async (
  page: number,
  pageSize = 20
): Promise<Paginated<DueTodayTaskListItem>> => {
  return apiRequest<Paginated<DueTodayTaskListItem>>("get", `${endpoints.tasklist}/today`, {
    params: { page, pageSize },
  });
};

export const getTaskListItemsDueTodayQueryOptions = (page: number, pageSize = 20) => ({
  queryKey: ["task-list", "today", page, pageSize],
  queryFn: () => getTaskListItemsDueToday(page, pageSize),
  staleTime: 0,
});

export const useTaskListItemsDueToday = (page: number, pageSize = 20) => {
  return useQuery(getTaskListItemsDueTodayQueryOptions(page, pageSize));
};
