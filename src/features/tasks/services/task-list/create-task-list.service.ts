import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreateTaskList, CreateTaskListResponse } from "../../shared/tasks.types";

const createTaskList = async (request: CreateTaskList): Promise<CreateTaskListResponse> => {
  return apiRequest<CreateTaskListResponse>("post", `${endpoints.taskList}`, request);
};

export function useCreateTaskListMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: CreateTaskList): Promise<CreateTaskListResponse> => {
      return await createTaskList(request);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.taskListDetails.categoryName],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Task List Creation Failed",
        message: "Quest could not be created.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
