import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { Paginated, PaginationParams } from "../../../util/types/shared.types";
import { CategoryWithTaskListCount } from "../shared/category.types";

const getCategoriesWithTaskListCount = async (
  params: PaginationParams
): Promise<Paginated<CategoryWithTaskListCount>> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const queryParams = new URLSearchParams(params as Record<string, string>);
  return apiRequest<Paginated<CategoryWithTaskListCount>>(
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
