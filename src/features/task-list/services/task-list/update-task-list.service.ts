import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { UpdatedTaskList, UpdateTaskList } from "../../shared/tasks.types";

const updateTaskList = async (updatedTaskList: UpdateTaskList): Promise<UpdatedTaskList> => {
  return apiRequest<UpdatedTaskList>("put", `${endpoints.tasklist}`, updatedTaskList);
};

export function useUpdateTaskListMutation(categoryName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTaskList: UpdateTaskList): Promise<UpdatedTaskList> => {
      return await updateTaskList(updatedTaskList);
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["task-lists", categoryName],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.taskListId],
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
