import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreateTaskListItem, CreatedTaskListItems } from "../../shared/tasks.types";

const createTaskListItems = async (
  taskListId: number,
  newTaskListItems: CreateTaskListItem[]
): Promise<CreatedTaskListItems> => {
  return apiRequest<CreatedTaskListItems>("post", `${endpoints.tasklist}/${taskListId}/items`, {
    TaskListItems: newTaskListItems,
  });
};

export function useCreateTaskListItemsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (TaskListData: {
      taskListId: number;
      newTaskListItems: CreateTaskListItem[];
    }): Promise<CreatedTaskListItems> => {
      return await createTaskListItems(TaskListData.taskListId, TaskListData.newTaskListItems);
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.taskListId],
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
