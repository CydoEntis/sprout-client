import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { SuccessResponse, UpdateTaskListRequest } from "../shared/task-list.types";

const updateTaskList = async (updatedTaskList: UpdateTaskListRequest): Promise<SuccessResponse> => {
  return apiRequest<SuccessResponse>("put", `${endpoints.taskList}`, updatedTaskList);
};

export function useUpdateTaskListMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTaskList: UpdateTaskListRequest): Promise<SuccessResponse> => {
      return await updateTaskList(updatedTaskList);
    },
    onSuccess: (data) => {
      console.log(data);

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
        title: "Task List Creation Failed",
        message: data.message,
        color: "red",
        position: "top-right",
      });
    },
  });
}
