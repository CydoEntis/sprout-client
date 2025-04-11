import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { Category } from "../shared/category.types";

const getCategory = async (categoryName: string): Promise<Category> => {
  return apiRequest<Category>("get", `${endpoints.category}/${encodeURIComponent(categoryName)}`);
};

export const getCategoryQueryOptions = (categoryName: string) =>
  queryOptions({
    queryKey: ["category", categoryName],
    queryFn: () => getCategory(categoryName),
    staleTime: 0,
  });

export const useGetCategory = (categoryName: string) => {
  return useQuery(getCategoryQueryOptions(categoryName));
};
