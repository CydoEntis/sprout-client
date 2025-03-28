import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { UpdateCategory, UpdatedCategory } from "../shared/category.types";

const updateCategory = async (updatedCategory: UpdateCategory): Promise<UpdatedCategory> => {
  return apiRequest<UpdatedCategory>("put", endpoints.category, updatedCategory);
};

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedCategory: UpdateCategory): Promise<UpdatedCategory> => {
      return await updateCategory(updatedCategory);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "list-with-count"],
      });
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
