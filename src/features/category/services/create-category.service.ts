import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { CreateCategory, CreatedCategory } from "../shared/category.types";
import { notifications } from "@mantine/notifications";

export const createCategory = async (newCategory: CreateCategory): Promise<CreatedCategory> => {
  return apiRequest<CreatedCategory>("post", endpoints.category, newCategory);
};

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCategory: CreateCategory): Promise<CreatedCategory> => {
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
