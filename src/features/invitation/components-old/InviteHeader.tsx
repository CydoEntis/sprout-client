import { Badge, Flex, Text } from "@mantine/core";

type InviteHeaderProps = {
  inviteDate: string;
};

function InviteHeader({ inviteDate }: InviteHeaderProps) {
  return (
    <Flex gap={2} align="center" justify="space-between">
      <Badge size="lg" color="yellow" variant="light">
        Pending Invite
      </Badge>
      <Text size="xs" c="dimmed">
        {inviteDate}
      </Text>
    </Flex>
  );
}

export default InviteHeader;
