import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreateTasklistItem, CreatedTasklistItems } from "../../shared/tasks.types";

const createTasklistItems = async (
  TasklistId: number,
  newTasklistItems: CreateTasklistItem[]
): Promise<CreatedTasklistItems> => {
  console.log(TasklistId);
  console.log(newTasklistItems);

  return apiRequest<CreatedTasklistItems>("post", `${endpoints.Tasklist}/${TasklistId}/items`, {
    TasklistItems: newTasklistItems,
  });
};

export function useCreateTasklistItemsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (TasklistData: {
      tasklistId: number;
      newTasklistItems: CreateTasklistItem[];
    }): Promise<CreatedTasklistItems> => {
      return await createTasklistItems(TasklistData.tasklistId, TasklistData.newTasklistItems);
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.tasklistId],
      });

      notifications.show({
        title: "Success",
        message: "Items added successfully",
        color: "lime",
        position: "top-right",
        className: "notification",
      });
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Task List Creation Failed",
        message: "Could not create task items.",
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
