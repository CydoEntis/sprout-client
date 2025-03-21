import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreatedTaskListItem, CreateTaskListItem } from "../../shared/tasks.types";

const createTaskListItem = async (newTaskListItem: CreateTaskListItem): Promise<CreatedTaskListItem> => {
  return apiRequest<CreatedTaskListItem>(
    "post",
    `${endpoints.taskList}/${newTaskListItem.taskListId}/item`,
    newTaskListItem
  );
};

export function useCreateTaskListItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTaskListItem: CreateTaskListItem): Promise<CreatedTaskListItem> => {
      return await createTaskListItem(newTaskListItem);
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
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Task List Creation Failed",
        message: "Quest could not be created.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
