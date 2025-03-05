import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { NewTaskListItemRequest, NewTaskListItemResponse } from "../shared/task-list-item.types";

const createTaskListItem = async (newTaskListItem: NewTaskListItemRequest): Promise<NewTaskListItemResponse> => {
  return apiRequest<NewTaskListItemResponse>("post", `${endpoints.taskList}/${newTaskListItem.taskListId}/items`, newTaskListItem);
};

export function useCreateTaskListItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTaskListItem: NewTaskListItemRequest): Promise<NewTaskListItemResponse> => {
      return await createTaskListItem(newTaskListItem);
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
