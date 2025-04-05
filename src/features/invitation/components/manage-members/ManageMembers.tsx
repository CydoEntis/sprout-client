import { useState } from "react";
import {
  Group,
  Stack,
  Avatar,
  Text,
  Badge,
  Select,
  ActionIcon,
  Button,
  Switch,
  Title,
  Divider,
  Flex,
} from "@mantine/core";
import { TaskListRole } from "../../shared/invite.schemas";
import { useGetAllMembers } from "../../services/get-all-members.service";
import { useUpdateMemberRole } from "../../services/update-member-role.service";
import { useRemoveMember } from "../../services/remove-member.service";
import { X } from "lucide-react";
import useAuthStore from "../../../../stores/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import { useTransferOwnership } from "../../services/transfer-ownership.service";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();
  const { data: members, isLoading } = useGetAllMembers(tasklistId);
  console.log(members);

  const updateMemberRole = useUpdateMemberRole(tasklistId);
  const removeMember = useRemoveMember();
  const transferOwnership = useTransferOwnership();
  const [editMode, setEditMode] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [transferMode, setTransferMode] = useState(false);
  const [newOwnerId, setNewOwnerId] = useState<string | null>(null);

  if (isLoading) return <Text>Loading members...</Text>;

  const canEdit = currentUserRole === TaskListRole.Owner || currentUserRole === TaskListRole.Editor;

  const sortedMembers = [...(members ?? [])].sort((a, b) => a.role - b.role);

  return (
    <Stack style={{ overflow: "hidden" }}>
      <Group justify="space-between" align="center">
        <Title size="sm">Members</Title>
        {canEdit && (
          <Switch
            checked={editMode}
            color="lime"
            onChange={() => setEditMode((prev) => !prev)}
            size="sm"
            label="Edit mode"
          />
        )}
      </Group>
      <Divider />

      {sortedMembers.map((member) => (
        <Group key={member.userId} justify="space-between">
          <Group>
            <Avatar size="md" name={member.name} color="initials" />
            <Stack gap={0}>
              <Group gap={8} align="center">
                <Text>{member.name}</Text>
                {member.userId === user?.id && (
                  <Text size="xs" c="dimmed">
                    (you)
                  </Text>
                )}
              </Group>
            </Stack>
          </Group>

          <Group>
            {(!editMode || member.role === TaskListRole.Owner) && (
              <Badge color={getBadgeColor(member.role)}>{TaskListRole[member.role]}</Badge>
            )}

            {editMode && canEdit && member.role !== TaskListRole.Owner && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100%" }}
                transition={{ duration: 0.3 }}
              >
                <Group gap={4}>
                  <Select
                    data={roleOptions}
                    value={member.role.toString()}
                    onChange={(newRole) => {
                      if (newRole && newRole !== TaskListRole.Owner.toString()) {
                        updateMemberRole.mutateAsync({
                          userId: member.userId,
                          newRole: parseInt(newRole, 10),
                        });
                      }
                    }}
                  />
                  {member.userId !== user?.id && (
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      onClick={() => removeMember.mutateAsync({ tasklistId, userId: member.userId })}
                    >
                      <X size={18} />
                    </ActionIcon>
                  )}
                </Group>
              </motion.div>
            )}
          </Group>
        </Group>
      ))}

      {currentUserRole === TaskListRole.Owner && (
        <>
          <Divider />
          <Stack mt={8}>
            <Flex justify="space-between">
              <Title size="sm">Manage Ownership</Title>
              <Switch
                color="lime"
                checked={transferMode}
                onChange={() => setTransferMode((prev) => !prev)}
                size="sm"
                label="Transfer"
              />
            </Flex>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: transferMode ? 1 : 0, y: transferMode ? 0 : -20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {transferMode && (
                <Stack gap={8}>
                  <Select
                    classNames={{
                      input: "input",
                    }}
                    data={sortedMembers
                      .filter((member) => member.role !== TaskListRole.Owner)
                      .map((member) => ({
                        value: member.userId,
                        label: member.name,
                      }))}
                    onChange={setNewOwnerId}
                    placeholder="Select new owner"
                  />
                  <Group>
                    <Button
                      color="lime"
                      disabled={!newOwnerId}
                      onClick={() => {
                        if (newOwnerId) {
                          transferOwnership.mutateAsync({ tasklistId, newOwnerId }).then(() => {
                            setTransferMode(false);
                            setNewOwnerId(null);
                          });
                        }
                      }}
                    >
                      Confirm
                    </Button>
                    <Button color="gray" variant="subtle" onClick={() => setTransferMode(false)}>
                      Cancel
                    </Button>
                  </Group>
                </Stack>
              )}
            </motion.div>
          </Stack>
        </>
      )}

      {currentUserRole !== TaskListRole.Owner && (
        <Group justify="end">
          {confirmLeave ? (
            <>
              <Button
                color="red"
                onClick={() => {
                  if (user) {
                    removeMember.mutateAsync({ tasklistId, userId: user.id }).then(() => {
                      navigate({ to: `/categories` });
                    });
                  }
                }}
              >
                Are you sure?
              </Button>
              <Button color="gray" variant="subtle" onClick={() => setConfirmLeave(false)}>
                Nevermind
              </Button>
            </>
          ) : (
            <Button color="gray" variant="subtle" onClick={() => setConfirmLeave(true)}>
              Leave list
            </Button>
          )}
        </Group>
      )}
    </Stack>
  );
}

export default ManageMembers;
