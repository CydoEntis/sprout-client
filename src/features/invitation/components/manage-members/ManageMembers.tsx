import { useState } from "react";
import { Group, Stack, Avatar, Text, Badge, Select, ActionIcon, Button } from "@mantine/core";
import { TaskListRole } from "../../shared/invite.schemas";
import { useGetAllMembers } from "../../services/get-all-members.service";
import { useUpdateMemberRole } from "../../services/update-member-role.service";
import { useRemoveMember } from "../../services/remove-member.service";
import { Settings, Trash2 } from "lucide-react";
import useAuthStore from "../../../../stores/useAuthStore";

const roleOptions = [
  { value: TaskListRole.Editor.toString(), label: "Editor" },
  { value: TaskListRole.Viewer.toString(), label: "Viewer" },
];

const getBadgeColor = (role: TaskListRole) => {
  switch (role) {
    case TaskListRole.Owner:
      return "lime";
    case TaskListRole.Editor:
      return "blue";
    case TaskListRole.Viewer:
      return "gray";
    default:
      return "gray";
  }
};

type ManageMembersProps = {
  tasklistId: number;
  currentUserRole: TaskListRole;
};

function ManageMembers({ tasklistId, currentUserRole }: ManageMembersProps) {
  const { user } = useAuthStore();
  const { data: members, isLoading } = useGetAllMembers(tasklistId);
  const updateMemberRole = useUpdateMemberRole(tasklistId);
  const removeMember = useRemoveMember();
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (isLoading) return <Text>Loading members...</Text>;

  const canEdit = currentUserRole === TaskListRole.Owner || currentUserRole === TaskListRole.Editor;

  return (
    <Stack>
      {canEdit && (
        <Button leftSection={<Settings size={16} />} onClick={() => setSettingsOpen((prev) => !prev)}>
          Manage Members
        </Button>
      )}

      {settingsOpen &&
        members?.map((member) => (
          <Group key={member.userId} justify="space-between">
            <Group>
              <Avatar size="md" name={member.name} color="initials" />
              <Stack gap={0}>
                <Text>{member.name}</Text>
              </Stack>
            </Group>
            <Group>
              {canEdit && member.role !== TaskListRole.Owner ? (
                <>
                  <Select
                    data={roleOptions}
                    value={member.role.toString()}
                    onChange={(newRole) => {
                      if (newRole && newRole !== TaskListRole.Owner.toString()) {
                        updateMemberRole.mutateAsync({
                          userId: member.userId,
                          newRole: parseInt(newRole, 10) as TaskListRole,
                        });
                      }
                    }}
                  />
                  {member.userId !== user?.id && (
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => removeMember.mutateAsync({ tasklistId, userId: member.userId })}
                    >
                      <Trash2 size={18} />
                    </ActionIcon>
                  )}
                </>
              ) : (
                <Badge color={getBadgeColor(member.role)}>{TaskListRole[member.role]}</Badge>
              )}
            </Group>
          </Group>
        ))}
    </Stack>
  );
}

export default ManageMembers;
