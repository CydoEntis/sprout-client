import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllTaskListsByCategory } from "../../../api/services/task-list.services";

// TODO: Possibly remove since I'm using query options and not hooks.
export const useGetAllCategories = (category: string) => {
  return useQuery(getAllTaskListsInCategoryQueryOptions(category));
};

export const getAllTaskListsInCategoryQueryOptions = (category: string) =>
  queryOptions({
    queryKey: ["categories", category],
    queryFn: () => getAllTaskListsByCategory(category),
    enabled: !!category,
  });
