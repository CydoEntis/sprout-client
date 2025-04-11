import { useQuery } from "@tanstack/react-query";
import { Paginated } from "../../../../util/types/shared.types";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { ItemsDuePerCategory } from "../../shared/tasks.types";

export const getTaskListItemsDueByDate = async (
  date: string,
  page: number
): Promise<Paginated<ItemsDuePerCategory>> => {
  return apiRequest<Paginated<ItemsDuePerCategory>>("get", `${endpoints.tasklist}/due-by-date`, {
    params: { date, page },
  });
};

export const getTaskListItemsDueByDateQueryOptions = (date: string, page: number) => ({
  queryKey: ["task-list", "due-by-date", date, page],
  queryFn: () => getTaskListItemsDueByDate(date, page),
  staleTime: 0,
});

export const useTaskListItemsDueByDate = (date: string, page: number) => {
  return useQuery(getTaskListItemsDueByDateQueryOptions(date, page));
};
