import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreatedTasklistItem, CreateTasklistItem } from "../../shared/tasks.types";

const createTasklistItem = async (newTasklistItem: CreateTasklistItem): Promise<CreatedTasklistItem> => {
  return apiRequest<CreatedTasklistItem>(
    "post",
    `${endpoints.tasklist}/${newTasklistItem.tasklistId}/item`,
    newTasklistItem
  );
};

export function useCreateTasklistItemMutation(page: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTasklistItem: CreateTasklistItem): Promise<CreatedTasklistItem> => {
      return await createTasklistItem(newTasklistItem);
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.tasklistId],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.tasklistId, page],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "lime",
        position: "top-right",
        className: "notification",
      });
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Task List Creation Failed",
        message: "Quest could not be created.",
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
