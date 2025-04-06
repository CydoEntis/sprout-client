import { Flex, Group, Button, Text } from "@mantine/core";

type InviteFooterProps = {
  onAccept: () => void;
  onDecline: () => void;
};

function InviteFooter({ onAccept, onDecline }: InviteFooterProps) {
  return (
    <Flex justify="space-between" align="center" gap={16} mt={24}>
      <Text c="dimmed" size="xs" fs="italic" td="underline">
        Your invitation expires in 7 days.
      </Text>
      <Group gap={8}>
        <Button onClick={onDecline} variant="outline" color="red">
          Decline
        </Button>
        <Button onClick={onAccept} variant="light" color="lime">
          Accept Invite
        </Button>
      </Group>
    </Flex>
  );
}

export default InviteFooter;
