import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { TaskList } from "../shared/task-list-details.types";

export const getTaskListDetailsById = async (id: number): Promise<TaskList> => {
  return apiRequest<TaskList>("get", `${endpoints.taskList}/${id}`);
};

export const getTaskListByIdQueryOptions = (taskListId: number) =>
  queryOptions({
    queryKey: ["task-lists", taskListId],
    queryFn: () => getTaskListDetailsById(taskListId),
    enabled: !!taskListId,
  });

export const useGetAllTaskListsForCategory = (taskListId: number) => {
  return useQuery(getTaskListByIdQueryOptions(taskListId));
};