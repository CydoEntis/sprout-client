import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../../api/apiRequest";
import endpoints from "../../../api/endpoints";
import { notifications } from "@mantine/notifications";
import { TaskListRole } from "../shared/invite.schemas";

type UpdateMemberRoleParams = {
  userId: string;
  newRole: TaskListRole;
};

const updateMemberRole = async (tasklistId: number, { userId, newRole }: UpdateMemberRoleParams): Promise<void> => {
  console.log(newRole)
  console.log(userId)

  return apiRequest<void>("put", `${endpoints.tasklist}/${tasklistId}/members/role`, { userId, newRole });
};

export function useUpdateMemberRole(tasklistId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateMemberRoleParams) => updateMemberRole(tasklistId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-list-members"] });
      queryClient.invalidateQueries({ queryKey: ["task-list-members", tasklistId] });
      queryClient.invalidateQueries({ queryKey: ["task-list", tasklistId] });

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
