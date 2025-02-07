import {
  NewTaskListRequest,
  NewTaskListResponse,
  TaskListDetailResponse,
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

export const getTaskListById = async (
  id: number
): Promise<TaskListDetailResponse> => {
  const response = (await apiClient.get(`${endpoints.taskList}/${id}`)).data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};
