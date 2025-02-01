import {
  NewTaskListRequest,
  NewTaskListResponse,
  TaskListResponse,
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

export const getAllTaskListsByCategory = async (
  category: string
): Promise<TaskListResponse[]> => {
  const response = (await apiClient.get(`${endpoints.category}/${category}`))
    .data;
  if (!response.success) throw new Error(response.message);
  return response.data;
};
