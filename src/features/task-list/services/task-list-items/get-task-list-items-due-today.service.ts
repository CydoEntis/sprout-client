/* eslint-disable @typescript-eslint/no-unused-vars */
import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { Paginated, PaginationParams } from "../../../../util/types/shared.types";
import { ItemsDuePerCategory } from "../../shared/tasks.types";

export const getTaskListItemsDueByDate = async (
  date: string,
  params: PaginationParams
): Promise<Paginated<ItemsDuePerCategory>> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const queryParams = new URLSearchParams(
    Object.entries({
      ...params,
      date,
    })
      .filter(([_, v]) => v !== undefined)
      .reduce<Record<string, string>>((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {})
  );

  return apiRequest("get", `${endpoints.tasklist}/due-by-date?${queryParams.toString()}`);
};

export const getTaskListItemsDueByDateQueryOptions = (date: string, params: PaginationParams) =>
  queryOptions({
    queryKey: ["task-list", "due-by-date"],
    queryFn: () => getTaskListItemsDueByDate(date, params),
    staleTime: 0,
  });

export const useTaskListItemsDueByDate = (date: string, params: PaginationParams) => {
  return useQuery(getTaskListItemsDueByDateQueryOptions(date, params));
};
