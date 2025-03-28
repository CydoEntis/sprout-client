import { queryOptions, useQuery } from "@tanstack/react-query";
import endpoints from "../../../../api/endpoints";
import { apiRequest } from "../../../../api/apiRequest";
import { TasklistDetails } from "../../shared/tasks.types";

export const getTasklistDetailsById = async (id: number): Promise<TasklistDetails> => {
  return apiRequest<TasklistDetails>("get", `${endpoints.Tasklist}/${id}`);
};

export const getTasklistByIdQueryOptions = (TasklistId: number) =>
  queryOptions({
    queryKey: ["task-lists", TasklistId],
    queryFn: () => getTasklistDetailsById(TasklistId),
    enabled: !!TasklistId,
    staleTime: 0,
  });

export const useGetAllTasklistsForCategory = (TasklistId: number) => {
  return useQuery(getTasklistByIdQueryOptions(TasklistId));
};
