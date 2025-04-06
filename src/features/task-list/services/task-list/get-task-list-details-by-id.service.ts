import { queryOptions, useQuery } from "@tanstack/react-query";
import endpoints from "../../../../api/endpoints";
import { apiRequest } from "../../../../api/apiRequest";
import { TaskListDetails } from "../../shared/tasks.types";

export const getTaskListDetailsById = async (id: number): Promise<TaskListDetails> => {
  return apiRequest<TaskListDetails>("get", `${endpoints.tasklist}/${id}`);
};

export const getTaskListByIdQueryOptions = (tasklistid: number) =>
  queryOptions({
    queryKey: ["task-lists", tasklistid],
    queryFn: () => getTaskListDetailsById(tasklistid),
    enabled: !!tasklistid,
    staleTime: 0,
  });

export const useGetAllTaskListsForCategory = (tasklistid: number) => {
  return useQuery(getTaskListByIdQueryOptions(tasklistid));
};
