import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreateTaskListItem, CreatedTaskListItems } from "../../shared/tasks.types";

const createTaskListItems = async (
  taskListId: number,
  newTaskListItems: CreateTaskListItem[]
): Promise<CreatedTaskListItems> => {
  console.log(taskListId);
  console.log(newTaskListItems);

  return apiRequest<CreatedTaskListItems>("post", `${endpoints.taskList}/${taskListId}/items`, {
    taskListItems: newTaskListItems,
  });
};

export function useCreateTaskListItemsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskListData: {
      taskListId: number;
      newTaskListItems: CreateTaskListItem[];
    }): Promise<CreatedTaskListItems> => {
      return await createTaskListItems(taskListData.taskListId, taskListData.newTaskListItems);
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
