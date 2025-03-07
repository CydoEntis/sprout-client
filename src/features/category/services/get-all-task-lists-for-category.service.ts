import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { TaskListPreview } from "../../tasks/shared/tasks.types";

const getAllTaskListsForCategory = async (category: string): Promise<TaskListPreview[]> => {
  return apiRequest<TaskListPreview[]>("get", `${endpoints.category}/${category}`);
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
