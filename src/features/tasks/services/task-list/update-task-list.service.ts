import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { UpdatedTasklist, UpdateTasklist } from "../../shared/tasks.types";

const updateTasklist = async (updatedTasklist: UpdateTasklist): Promise<UpdatedTasklist> => {
  return apiRequest<UpdatedTasklist>("put", `${endpoints.Tasklist}`, updatedTasklist);
};

export function useUpdateTasklistMutation(categoryName: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTasklist: UpdateTasklist): Promise<UpdatedTasklist> => {
      return await updateTasklist(updatedTasklist);
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["task-lists", categoryName],
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
