import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { NewTaskListRequest, NewTaskListResponse } from "../shared/task-list.types";

const createTaskList = async (newTaskList: NewTaskListRequest): Promise<NewTaskListResponse> => {
  return apiRequest<NewTaskListResponse>("post", `${endpoints.taskList}`, newTaskList);
};

export function useCreateTaskListMutation(categoryName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCategory: NewTaskListRequest): Promise<NewTaskListResponse> => {
      return await createTaskList(newCategory);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", categoryName],
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
