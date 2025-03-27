import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { CreatedTasklistWithCategory, CreateTasklistWithCategory } from "../../shared/tasks.types";

export const createCategoryWithTaskList = async (
  request: CreateTasklistWithCategory
): Promise<CreatedTasklistWithCategory> => {
  return apiRequest<CreatedTasklistWithCategory>("post", endpoints.taskList + "/with-category", request);
};

export function useCreateTasklistWithCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryWithTaskList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories", "list"] });
      queryClient.invalidateQueries({ queryKey: ["categories", "list-with-count"] });
      queryClient.invalidateQueries({ queryKey: ["task-lists", "list"] });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "lime",
        position: "top-right",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
        position: "top-right",
      });
    },
  });
}
