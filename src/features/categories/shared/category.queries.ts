import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getAllTaskListsForCategory,
} from "../../../api/services/category.services";

export const getAllCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["categories", "list"],
    queryFn: () => getAllCategories(),
  });

export const useGetAllCategories = () => {
  return useQuery(getAllCategoriesQueryOptions());
};

export const getAllTaskListsForCategoryQueryOptions = (category: string) =>
  queryOptions({
    queryKey: ["categories", category],
    queryFn: () => getAllTaskListsForCategory(category),
    enabled: !!category,
  });

export const useGetAllTaskListsForCategory = (category: string) => {
  return useQuery(getAllTaskListsForCategoryQueryOptions(category));
};
