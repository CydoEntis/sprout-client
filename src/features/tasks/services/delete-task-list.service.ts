import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { TaskListDeletedResponse } from "../shared/task-list.types";

const deleteTaskList = async (taskListId: number): Promise<TaskListDeletedResponse> => {
  return apiRequest<TaskListDeletedResponse>("delete", `${endpoints.taskList}/${taskListId}`);
};

export function useDeleteTaskListMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskListId: number): Promise<TaskListDeletedResponse> => {
      return await deleteTaskList(taskListId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.taskListId],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: (data) => {
      notifications.show({
        title: "Task List Deletion Failed",
        message: data.message,
        color: "red",
        position: "top-right",
      });
    },
  });
}
