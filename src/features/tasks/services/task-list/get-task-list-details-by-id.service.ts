import { queryOptions, useQuery } from "@tanstack/react-query";
import { TaskList } from "../../shared/tasks.types";
import endpoints from "../../../../api/endpoints";
import { apiRequest } from "../../../../api/apiRequest";

export const getTaskListDetailsById = async (id: number): Promise<TaskList> => {
  return apiRequest<TaskList>("get", `${endpoints.taskList}/${id}`);
};

export const getTaskListByIdQueryOptions = (taskListId: number) =>
  queryOptions({
    queryKey: ["task-lists", taskListId],
    queryFn: () => getTaskListDetailsById(taskListId),
    enabled: !!taskListId,
    staleTime: 0,
  });

export const useGetAllTaskListsForCategory = (taskListId: number) => {
  return useQuery(getTaskListByIdQueryOptions(taskListId));
};
