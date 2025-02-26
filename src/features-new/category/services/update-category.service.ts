import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { NewCategoryResponse, UpdateCategoryRequest, UpdateCategoryResponse } from "../shared/category.types";

const updateCategory = async (updatedCategory: UpdateCategoryRequest): Promise<UpdateCategoryResponse> => {
  return apiRequest<UpdateCategoryResponse>("put", endpoints.category, updatedCategory);
};

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedCategory: UpdateCategoryRequest): Promise<NewCategoryResponse> => {
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
