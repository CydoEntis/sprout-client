/* eslint-disable @typescript-eslint/no-explicit-any */
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { UpdatedTaskListItemStatus, UpdateTaskListItemStatus } from "../../shared/tasks.types";

const updateTaskListStatusItem = async (
  request: UpdateTaskListItemStatus
): Promise<UpdatedTaskListItemStatus> => {
  return apiRequest("put", `${endpoints.tasklist}/${request.taskListId}/items/status`, request);
};

export function useUpdateTaskListStatusItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskListStatusItem,

    // ✅ Optimistic update before mutation runs
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: ["task-list", "due-by-date"] });

      const previousData = queryClient.getQueryData(["task-list", "due-by-date"]);

      queryClient.setQueryData(["task-list", "due-by-date"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          items: oldData.items.map((category: any) => ({
            ...category,
            items: category.items.map((item: any) =>
              item.id === updatedItem.id
                ? { ...item, isCompleted: updatedItem.isCompleted }
                : item
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (error, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["task-list", "due-by-date"], context.previousData);
      }

      notifications.show({
        title: "Update Failed",
        message: error.message || "There was a problem updating the task.",
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },


    onSuccess: (data) => {
      notifications.show({
        title: "Success",
        message: data.message,
        color: "lime",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
