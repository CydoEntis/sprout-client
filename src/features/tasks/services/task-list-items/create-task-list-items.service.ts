import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreateTaskListItem, CreatedTaskListItems } from "../../shared/tasks.types";

const createTaskListItems = async (
  TaskListId: number,
  newTaskListItems: CreateTaskListItem[]
): Promise<CreatedTaskListItems> => {
  console.log(TaskListId);
  console.log(newTaskListItems);

  return apiRequest<CreatedTaskListItems>("post", `${endpoints.tasklist}/${TaskListId}/items`, {
    TaskListItems: newTaskListItems,
  });
};

export function useCreateTaskListItemsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (TaskListData: {
      tasklistId: number;
      newTaskListItems: CreateTaskListItem[];
    }): Promise<CreatedTaskListItems> => {
      return await createTaskListItems(TaskListData.tasklistId, TaskListData.newTaskListItems);
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
