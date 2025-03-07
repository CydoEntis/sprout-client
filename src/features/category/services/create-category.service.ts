import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { NewCategoryRequest, NewCategoryResponse } from "../shared/category.types";
import { notifications } from "@mantine/notifications";

export const createCategory = async (newCategory: NewCategoryRequest): Promise<NewCategoryResponse> => {
  return apiRequest<NewCategoryResponse>("post", endpoints.category, newCategory);
};

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCategory: NewCategoryRequest): Promise<NewCategoryResponse> => {
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
