import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { UpdatedTasklistItem, UpdateTasklistItem } from "../../shared/tasks.types";

const updateTasklistItem = async (updatedTasklistItem: UpdateTasklistItem): Promise<UpdatedTasklistItem> => {
  return apiRequest<UpdatedTasklistItem>(
    "put",
    `${endpoints.tasklist}/${updatedTasklistItem.tasklistId}/items`,
    updatedTasklistItem
  );
};

export function useUpdateTasklistItemMutation(page: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTasklistItem: UpdateTasklistItem): Promise<UpdatedTasklistItem> => {
      return await updateTasklistItem(updatedTasklistItem);
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
    onError: (data) => {
      notifications.show({
        title: "Task List Creation Failed",
        message: data.message,
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
