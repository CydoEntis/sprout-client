import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { UpdatedTaskListItem, UpdateTaskListItem } from "../../shared/tasks.types";

const updateTaskListItem = async (updatedTaskListItem: UpdateTaskListItem): Promise<UpdatedTaskListItem> => {
  return apiRequest<UpdatedTaskListItem>(
    "put",
    `${endpoints.tasklist}/${updatedTaskListItem.tasklistId}/items`,
    updatedTaskListItem
  );
};

export function useUpdateTaskListItemMutation(page: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTaskListItem: UpdateTaskListItem): Promise<UpdatedTaskListItem> => {
      return await updateTaskListItem(updatedTaskListItem);
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
