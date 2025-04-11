import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { PaginatedCategoriesWithTaskListCount } from "../shared/category.types";
import { PaginationParams } from "../../../util/types/shared.types";

const getCategoriesWithTaskListCount = async (
  params: PaginationParams
): Promise<PaginatedCategoriesWithTaskListCount> => {
  const queryParams = new URLSearchParams(params as Record<string, string>);
  return apiRequest<PaginatedCategoriesWithTaskListCount>(
    "get",
    `${endpoints.category}/details?${queryParams.toString()}`
  );
};

export const getCategoriesWithTaskListCountQueryOptions = (params: PaginationParams) =>
  queryOptions({
    queryKey: ["categories", "list-with-count", params],
    queryFn: () => getCategoriesWithTaskListCount(params),
    staleTime: 0,
  });

export const useGetCategoriesWithTaskListCount = (params: PaginationParams) => {
  return useQuery(getCategoriesWithTaskListCountQueryOptions(params));
};
