import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getAllTaskListsForCategory,
} from "./category.services";

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
    queryKey: ["task-lists", category],
    queryFn: () => getAllTaskListsForCategory(category),
    enabled: !!category,
  });

export const useGetAllTaskListsForCategory = (category: string) => {
  return useQuery(getAllTaskListsForCategoryQueryOptions(category));
};
