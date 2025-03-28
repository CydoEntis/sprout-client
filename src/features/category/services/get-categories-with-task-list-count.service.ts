import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { PaginatedCategoriesWithTasklistCount } from "../shared/category.types";

const getCategoriesWithTasklistCount = async (): Promise<PaginatedCategoriesWithTasklistCount> => {
  return apiRequest<PaginatedCategoriesWithTasklistCount>("get", endpoints.category + "/details");
};

export const getCategoriesWithTasklistCountQueryOptions = () =>
  queryOptions({
    queryKey: ["categories", "list-with-count"],
    queryFn: () => getCategoriesWithTasklistCount(),
    staleTime: 0
  });

export const useGetCategoriesWithTasklistCount = () => {
  return useQuery(getCategoriesWithTasklistCountQueryOptions());
};
