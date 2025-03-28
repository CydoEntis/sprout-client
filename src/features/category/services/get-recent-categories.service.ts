import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import { CategoryAndRecentTasklists } from "../shared/category.types";
import endpoints from "../../../api/endpoints";

const getRecentCategories = async (): Promise<CategoryAndRecentTasklists[]> => {
  return apiRequest<CategoryAndRecentTasklists[]>("get", `${endpoints.category}/recent`);
};

export const getRecentCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["categories", "recent"],
    queryFn: () => getRecentCategories(),
  });

export const useGetRecentCategories = () => {
  return useQuery(getRecentCategoriesQueryOptions());
};
