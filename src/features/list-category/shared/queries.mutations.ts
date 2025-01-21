import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewCategoryRequest, NewCategoryResponse } from "./category.types";
import { createCategory } from "../../../api/services/category.services";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      newCategory: NewCategoryRequest
    ): Promise<NewCategoryResponse> => {
      return await createCategory(newCategory);
    },
    onSuccess: (data) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["quests", "list"],
      //   });

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
