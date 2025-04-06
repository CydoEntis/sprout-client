import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { notifications } from "@mantine/notifications";
import { TaskListRole } from "../shared/invite.schemas";

type UpdateMemberRoleParams = {
  userId: string;
  newRole: TaskListRole;
};

const updateMemberRole = async (taskListId: number, { userId, newRole }: UpdateMemberRoleParams): Promise<void> => {
  console.log(newRole)
  console.log(userId)

  return apiRequest<void>("put", `${endpoints.tasklist}/${taskListId}/members/role`, { userId, newRole });
};

export function useUpdateMemberRole(taskListId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateMemberRoleParams) => updateMemberRole(taskListId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-list-members"] });
      queryClient.invalidateQueries({ queryKey: ["task-list-members", taskListId] });
      queryClient.invalidateQueries({ queryKey: ["task-list", taskListId] });

      notifications.show({
        title: "Role Updated",
        message: "Member role has been updated successfully.",
        color: "lime",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Update Failed",
        message: "Could not update member role.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
