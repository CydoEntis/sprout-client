import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { Category } from "../shared/category.types";

const getAllCategories = async (): Promise<Category[]> => {
  return apiRequest<Category[]>("get", endpoints.category);
};

export const getAllCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["categories", "list"],
    queryFn: () => getAllCategories(),
  });

export const useGetAllCategories = () => {
  return useQuery(getAllCategoriesQueryOptions());
};
