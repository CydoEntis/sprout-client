/* eslint-disable @typescript-eslint/no-explicit-any */
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { UpdatedTaskListItemStatus, UpdateTaskListItemStatus } from "../../shared/tasks.types";

const updateTaskListStatusItem = async (request: UpdateTaskListItemStatus): Promise<UpdatedTaskListItemStatus> => {
  return apiRequest("put", `${endpoints.tasklist}/${request.taskListId}/items/status`, request);
};

export function useUpdateTaskListStatusItemForComingUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskListStatusItem,

    onMutate: async (updatedItem) => {
      const comingUpKey = ["task-list", "coming-up"];

      await queryClient.cancelQueries({ queryKey: comingUpKey });

      const previousComingUp = queryClient.getQueryData(comingUpKey);

      console.log("Previous data:", previousComingUp);

      queryClient.setQueryData(comingUpKey, (oldData: any) => {
        console.log("Old Data Structure:", oldData);

        if (!oldData || !oldData.items) {
          console.warn("No items data found, returning original data.");
          return oldData;
        }

        return {
          ...oldData,
          items: oldData.items.map((item: any) => {
            if (!item.categories) {
              console.warn("No categories found for item", item);
              return item;
            }

            const updatedCategories = item.categories.map((category: any) => ({
              ...category,
              items: category.items.map((taskItem: any) =>
                taskItem.id === updatedItem.id ? { ...taskItem, isCompleted: updatedItem.isCompleted } : taskItem
              ),
            }));

            return {
              ...item,
              categories: updatedCategories, 
            };
          }),
        };
      });

      return { previousComingUp };
    },

    onError: (error, _vars, context) => {
      const comingUpKey = ["task-list", "coming-up"]; 

      if (context?.previousComingUp) {
        queryClient.setQueryData(comingUpKey, context.previousComingUp);
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
