import { Button, Group, Stack, TextInput, Select } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { InviteUser } from "../../shared/invitation.types";
import { inviteUserSchema, TaskListRole } from "../../shared/invite.schemas";
import { useInviteUserMutation } from "../../services/invite-user.service";

const roleOptions = [
  { value: String(TaskListRole.Owner), label: "Owner" },
  { value: String(TaskListRole.Editor), label: "Editor" },
  { value: String(TaskListRole.Viewer), label: "Viewer" },
];

type InviteUserFormProps = {
  tasklistId: number;
  onClose: () => void;
};

const InviteUserForm = ({ tasklistId, onClose }: InviteUserFormProps) => {
  const inviteUser = useInviteUserMutation();

  const form = useForm<InviteUser>({
    validate: zodResolver(inviteUserSchema),
    initialValues: {
      invitedUserEmail: "",
      tasklistId,
      role: TaskListRole.Viewer,
    },
  });

  const handleSubmit = async (data: InviteUser) => {
    try {
      console.log(data);
      console.log("Data: ", { ...data, role: Number(data.role) });

      await inviteUser.mutateAsync({ ...data, role: Number(data.role) });
      form.reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        <TextInput
          classNames={{
            input: "input",
          }}
          label="User Email"
          placeholder="Enter user email"
          {...form.getInputProps("invitedUserEmail")}
        />
        <Select
          classNames={{
            input: "input",
          }}
          label="Role"
          data={roleOptions}
          placeholder="Select a role"
          value={String(form.values.role)}
          onChange={(value) => form.setFieldValue("role", Number(value))}
        />
        <Group gap={8} justify="end">
          <Button type="submit" color="lime">
            Send Invitation
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default InviteUserForm;
