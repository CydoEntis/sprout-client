import { notifications } from "@mantine/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../../api/apiRequest";
import endpoints from "../../../../api/endpoints";
import { FavoriteTaskList } from "../../shared/tasks.types";

const favoriteTaskList = async (taskListId: number): Promise<FavoriteTaskList> => {
  return apiRequest("put", `${endpoints.tasklist}/${taskListId}/favorite`);
};

export function useFavoriteTaskListMutation(categoryName: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskListId: number): Promise<FavoriteTaskList> => {
      return await favoriteTaskList(taskListId);
    },
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["task-lists", categoryName.toLowerCase()],
      });

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
