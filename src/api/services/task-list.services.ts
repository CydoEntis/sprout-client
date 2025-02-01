import {
  NewTaskListRequest,
  NewTaskListResponse,
} from "../../features/task-list/shared/task-list.types";
import apiClient from "../apiClient";
import endpoints from "../endpoints";

export const createTaskList = async (
  newTaskList: NewTaskListRequest
): Promise<NewTaskListResponse> => {
  const response = (await apiClient.post(`${endpoints.taskList}`, newTaskList))
    .data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};
