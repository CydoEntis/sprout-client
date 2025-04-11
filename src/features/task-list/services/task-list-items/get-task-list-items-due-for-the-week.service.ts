import { useQuery } from "@tanstack/react-query";
import { Paginated } from "../../../../util/types/shared.types";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { TaskListItemsDueThisWeekByCategory } from "../../shared/tasks.types";

export const getTaskListItemsDueForTheWeek = async (
  page: number
): Promise<Paginated<TaskListItemsDueThisWeekByCategory>> => {
  return apiRequest<Paginated<TaskListItemsDueThisWeekByCategory>>("get", `${endpoints.tasklist}/coming-up`, {
    params: { page },
  });
};

export const getTaskListItemsDueForTheWeekQueryOptions = (page: number) => ({
  queryKey: ["task-list", "coming-up", page],
  queryFn: () => getTaskListItemsDueForTheWeek(page),
  staleTime: 0,
});

export const useTaskListItemsDueForTheWeek = (page: number) => {
  return useQuery(getTaskListItemsDueForTheWeekQueryOptions(page));
};
