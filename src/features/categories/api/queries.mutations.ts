import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  NewCategoryRequest,
  NewCategoryResponse,
  UpdateCategoryRequest,
} from "../shared/category.types";
import { createCategory, updateCategory } from "./category.services";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      newCategory: NewCategoryRequest
    ): Promise<NewCategoryResponse> => {
      return await createCategory(newCategory);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: (data) => {
      notifications.show({
        title: "Unsuccessful",
        message: data.message,
        color: "red",
        position: "top-right",
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      updatedCategory: UpdateCategoryRequest
    ): Promise<NewCategoryResponse> => {
      return await updateCategory(updatedCategory);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: (data) => {
      notifications.show({
        title: "Unsuccessful",
        message: data.message,
        color: "red",
        position: "top-right",
      });
    },
  });
}
