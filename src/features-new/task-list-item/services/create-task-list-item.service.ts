import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { NewTaskListItemRequest, NewTaskListItemResponse } from "../shared/task-list-item.types";

const createTaskListItem = async (newTaskListItem: NewTaskListItemRequest): Promise<NewTaskListItemResponse> => {
  return apiRequest<NewTaskListItemResponse>("post", `${endpoints.taskList}`, newTaskListItem);
};

export function useCreateTaskListItemMutation(categoryName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCategory: NewTaskListItemRequest): Promise<NewTaskListItemResponse> => {
      return await createTaskListItem(newCategory);
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
