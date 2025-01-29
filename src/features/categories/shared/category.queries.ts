import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../api/services/category.services";

export const getAllCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["categories", "list"],
    queryFn: () => getAllCategories(),
  });

// TODO: Possibly remove since I'm using query options and not hooks.
export const useGetAllCategories = () => {
  return useQuery(getAllCategoriesQueryOptions());
};
