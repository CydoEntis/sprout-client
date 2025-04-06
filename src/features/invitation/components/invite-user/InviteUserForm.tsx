import { Button, Stack, Select, TagsInput, Flex, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import { z } from "zod";
import { useState } from "react";
import { useInviteUserMutation } from "../../services/invite-user.service";
import { InviteUser } from "../../shared/invitation.types";
import { TaskListRole } from "../../shared/invite.schemas";

const emailSchema = z.string().email("Invalid email address");

const roleOptions = [
  { value: String(TaskListRole.Owner), label: "Owner" },
  { value: String(TaskListRole.Editor), label: "Editor" },
  { value: String(TaskListRole.Viewer), label: "Viewer" },
];

type InviteUserFormProps = {
  taskListId: number;
  onClose: () => void;
};

const InviteUserForm = ({ taskListId, onClose }: InviteUserFormProps) => {
  const inviteUser = useInviteUserMutation();
  const [emailError, setEmailError] = useState<string | null>(null);

  const form = useForm<InviteUser>({
    initialValues: {
      invitedUserEmails: [],
      taskListId,
      role: TaskListRole.Viewer,
    },
    validate: undefined,
  });

  const clearEmailErrors = () => {
    if (emailError) {
      setEmailError(null);
    }
  };

  const validateEmails = (emails: string[]) => {
    if (emails.length === 0) {
      return "Please provide at least one email";
    }

    for (const email of emails) {
      const result = emailSchema.safeParse(email);
      if (!result.success) {
        return "Invalid email";
      }
    }

    return null;
  };

  const handleSubmit = async (data: InviteUser) => {
    try {
      const error = validateEmails(data.invitedUserEmails);
      if (error) {
        setEmailError(error);
        return;
      }

      console.log("Submitting: ", {
        ...data,
        role: Number(data.role),
        invitedUserEmails: data.invitedUserEmails,
      });

      await inviteUser.mutateAsync({
        ...data,
        role: Number(data.role),
      });

      form.reset();
      setEmailError(null);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} style={{ padding: "1rem 0" }}>
      <Stack gap={16}>
        <Flex w="100%" gap={8} align="start" direction="column">
          <Flex w="100%" gap={8} align="end">
            <TagsInput
              classNames={{
                input: "input",
                wrapper: "overflow-hidden",
                root: "overflow-hidden",
              }}
              styles={{
                wrapper: {
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                },
                input: {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
              }}
              w="100%"
              label="User Emails"
              placeholder="Enter emails and press Enter"
              {...form.getInputProps("invitedUserEmails")}
              data={[]}
              error={false}
              onFocus={clearEmailErrors}
              onChange={(value) => {
                clearEmailErrors();
                form.setFieldValue("invitedUserEmails", value);
              }}
              clearable
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

            <Button type="submit" color="lime" w="25%">
              Invite
            </Button>
          </Flex>

          {emailError && (
            <Text c="red" size="xs" mt={2} mb={8}>
              {emailError}
            </Text>
          )}
        </Flex>
      </Stack>
    </form>
  );
};

export default InviteUserForm;
