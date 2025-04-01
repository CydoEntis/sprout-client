import { Button, Group, Stack, Select, TagsInput, Flex } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { InviteUser } from "../../shared/invitation.types";
import { inviteUserSchema, TaskListRole } from "../../shared/invite.schemas";
import { useInviteUserMutation } from "../../services/invite-user.service";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");
const emailsArraySchema = z.array(emailSchema);

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
      invitedUserEmails: [],
      tasklistId,
      role: TaskListRole.Viewer,
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async (data: InviteUser) => {
    try {
      const parsedEmails = emailsArraySchema.safeParse(data.invitedUserEmails);
      if (!parsedEmails.success) {
        form.setErrors({ invitedUserEmails: "Please enter valid emails" });
        return;
      }

      console.log("Submitting: ", {
        ...data,
        role: Number(data.role),
        invitedUserEmails: parsedEmails.data,
      });

      await inviteUser.mutateAsync({
        ...data,
        role: Number(data.role),
        invitedUserEmails: parsedEmails.data,
      });

      form.reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        <Flex w="100%" gap={8} align="end">
          <TagsInput
            classNames={{
              input: "input",
            }}
            w="100%"
            label="User Emails"
            placeholder="Enter emails and press Enter"
            {...form.getInputProps("invitedUserEmails")}
            data={[]}
          />
          {form.errors.invitedUserEmails && <span style={{ color: "red" }}>{form.errors.invitedUserEmails}</span>}
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
          <Button type="submit" color="lime" w="25%">
            Invite
          </Button>
        </Flex>
        <Group gap={8} justify="end"></Group>
      </Stack>
    </form>
  );
};

export default InviteUserForm;
