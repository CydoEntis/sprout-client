import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import { CategoryWithTaskListCount } from "../shared/category.types";
import endpoints from "../../../api/endpoints";

const getCategoriesWithTasklistCount = async (): Promise<CategoryWithTaskListCount> => {
  return apiRequest<CategoryWithTaskListCount>("get", endpoints.category);
};

export const getCategoriesWithTasklistCountQueryOptions = () =>
  queryOptions({
    queryKey: ["categories", "list"],
    queryFn: () => getCategoriesWithTasklistCount(),
  });

export const useGetCategoriesWithTaskListCount = () => {
  return useQuery(getCategoriesWithTasklistCountQueryOptions());
};
