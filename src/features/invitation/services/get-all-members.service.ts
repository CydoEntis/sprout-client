import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { Member } from "../../shared/shared.types";

const getAllMembers = async (tasklistId: number): Promise<Member[]> => {
  return apiRequest<Member[]>("get", `${endpoints.tasklist}/${tasklistId}/members`);
};

export const getAllMembersQueryOptions = (tasklistId: number) =>
  queryOptions({
    queryKey: ["task-list-members"],
    queryFn: () => getAllMembers(tasklistId),
    staleTime: 0,
  });

export const useGetAllMembers = (tasklistId: number) => {
  return useQuery(getAllMembersQueryOptions(tasklistId));
};
