import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { FavoritedTasklist } from "../../shared/tasks.types";

const favoriteTasklist = async (taskListId: number): Promise<FavoritedTasklist> => {
  return apiRequest("put", `${endpoints.tasklist}/${taskListId}/favorite`);
};

export function useFavoriteTasklistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskListId: number): Promise<FavoritedTasklist> => {
      return await favoriteTasklist(taskListId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["task-lists", data.taskListId],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-lists", "list"],
      });

      notifications.show({
        title: data.isFavorited ? "Added to Favorites" : "Removed from Favorites",
        message: `Task List ID: ${data.taskListId} is now ${data.isFavorited ? "favorited" : "unfavorited"}.`,
        color: data.isFavorited ? "lime" : "red",
        position: "top-right",
        className: "notification",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Action Failed",
        message: error?.message || "There was an issue with the request.",
        color: "red",
        position: "top-right",
        className: "notification",
      });
    },
  });
}
