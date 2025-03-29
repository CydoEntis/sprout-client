import { queryOptions, useQuery } from "@tanstack/react-query";
import endpoints from "../../../../api/endpoints";
import { apiRequest } from "../../../../api/apiRequest";
import { TasklistDetails } from "../../shared/tasks.types";

export const getTasklistDetailsById = async (id: number): Promise<TasklistDetails> => {
  return apiRequest<TasklistDetails>("get", `${endpoints.tasklist}/${id}`);
};

export const getTasklistByIdQueryOptions = (tasklistid: number) =>
  queryOptions({
    queryKey: ["task-lists", tasklistid],
    queryFn: () => getTasklistDetailsById(tasklistid),
    enabled: !!tasklistid,
    staleTime: 0,
  });

export const useGetAllTasklistsForCategory = (tasklistid: number) => {
  return useQuery(getTasklistByIdQueryOptions(tasklistid));
};
