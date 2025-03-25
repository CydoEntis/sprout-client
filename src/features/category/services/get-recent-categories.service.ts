import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import { CategoryAndRecentTaskLists } from "../shared/category.types";
import endpoints from "../../../api/endpoints";

const getRecentCategories = async (): Promise<CategoryAndRecentTaskLists[]> => {
  return apiRequest<CategoryAndRecentTaskLists[]>("get", `${endpoints.category}/recent`);
};

export const getRecentCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["categories", "recent"],
    queryFn: () => getRecentCategories(),
  });

export const useGetRecentCategories = () => {
  return useQuery(getRecentCategoriesQueryOptions());
};
