import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import endpoints from "../../../api/endpoints";
import { apiRequest } from "../../../api/apiRequest";
import { DeletedCategory } from "../shared/category.types";

export const deleteCategory = async (categoryId: number): Promise<DeletedCategory> => {
  return apiRequest<DeletedCategory>("delete", `${endpoints.category}/${categoryId}`);
};

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId: number): Promise<DeletedCategory> => {
      return await deleteCategory(categoryId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });

      notifications.show({
        title: "Success",
        message: data.message,
        color: "lime",
        position: "top-right",
        className: "notification",
      });
    },
    onError: (data) => {
      notifications.show({
        title: "Unsuccessful",
        message: data.message,
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
