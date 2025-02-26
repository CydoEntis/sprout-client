import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { DeleteCategoryResponse } from "../shared/category.types";
import endpoints from "../../../api/endpoints";
import { apiRequest } from "../../../api/apiRequest";

export const deleteCategory = async (categoryId: number): Promise<DeleteCategoryResponse> => {
  return apiRequest<DeleteCategoryResponse>("delete", `${endpoints.category}/${categoryId}`);
};

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId: number): Promise<DeleteCategoryResponse> => {
      return await deleteCategory(categoryId);
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
