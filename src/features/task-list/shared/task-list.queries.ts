import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTaskListById } from "../../../api/services/task-list.services";

export const getTaskListByIdQueryOptions = (taskListId: number) =>
  queryOptions({
    queryKey: ["task-lists", taskListId],
    queryFn: () => getTaskListById(taskListId),
    enabled: !!taskListId,
  });

export const useGetAllTaskListsForCategory = (taskListId: number) => {
  return useQuery(getTaskListByIdQueryOptions(taskListId));
};
