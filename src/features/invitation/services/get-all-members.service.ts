import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { Member } from "../../shared/shared.types";

const getAllMembers = async (taskListId: number): Promise<Member[]> => {
  return apiRequest<Member[]>("get", `${endpoints.tasklist}/${taskListId}/members`);
};

export const getAllMembersQueryOptions = (taskListId: number) =>
  queryOptions({
    queryKey: ["task-list-members"],
    queryFn: () => getAllMembers(taskListId),
    staleTime: 0,
  });

export const useGetAllMembers = (taskListId: number) => {
  return useQuery(getAllMembersQueryOptions(taskListId));
};
