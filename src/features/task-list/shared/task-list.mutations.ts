import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewTaskListRequest, NewTaskListResponse } from "./task-list.types";
import { createTaskList } from "../../../api/services/task-list.services";
import { notifications } from "@mantine/notifications";

export function useCreateTaskList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      newCategory: NewTaskListRequest
    ): Promise<NewTaskListResponse> => {
      return await createTaskList(newCategory);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "list"],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Quest Creation Failed",
        message: "Quest could not be created.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
