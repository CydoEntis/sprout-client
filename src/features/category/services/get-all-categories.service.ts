import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import { CategoryAndRecentTaskLists } from "../shared/category.types";
import endpoints from "../../../api/endpoints";

const getAllCategories = async (): Promise<CategoryAndRecentTaskLists[]> => {
  return apiRequest<CategoryAndRecentTaskLists[]>("get", endpoints.category);
};

export const getAllCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["categories", "list"],
    queryFn: () => getAllCategories(),
  });

export const useGetAllCategories = () => {
  return useQuery(getAllCategoriesQueryOptions());
};
