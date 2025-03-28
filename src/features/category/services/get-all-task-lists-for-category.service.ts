import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { CategoryWithTasklists } from "../../tasks/shared/tasks.types";

const getAllTasklistsForCategory = async (categoryName: string): Promise<CategoryWithTasklists> => {
  return apiRequest<CategoryWithTasklists>("get", `${endpoints.category}/${categoryName}`);
};

export const getAllTasklistsForCategoryQueryOptions = (categoryName: string) =>
  queryOptions({
    queryKey: ["task-lists", categoryName.toLowerCase()],
    queryFn: () => getAllTasklistsForCategory(categoryName),
    enabled: !!categoryName,
    staleTime: 0,
  });

export const useGetAllTasklistsForCategory = (categoryName: string) => {
  return useQuery(getAllTasklistsForCategoryQueryOptions(categoryName));
};
