import { Avatar, Badge, Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Route = createFileRoute("/_authenticated/invite/$token")({
  component: InvitePage,
});

type InviteToken = {
  taskListName: string;
  category: string;
  inviteDate: string;
  inviter: string;
  inviterEmail: string;
  members: string | null; // Members are stored as a JSON string in the token
};

function InvitePage() {
  const { token } = useParams({ from: "/_authenticated/invite/$token" });
  const [decodedToken, setDecodedToken] = useState<InviteToken | null>(null);
  const [members, setMembers] = useState<string[]>([]); // Store parsed members separately

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<InviteToken>(token);
        setDecodedToken(decoded);

        // Ensure members are always an array
        const parsedMembers = decoded.members ? JSON.parse(decoded.members) : [];
        setMembers(Array.isArray(parsedMembers) ? parsedMembers : []);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  if (!decodedToken) {
    return <div>Loading...</div>;
  }

  return (
    <Card maw={500} mx="auto" withBorder radius="md" shadow="md">
      <Flex gap={2} align="center" justify="space-between">
        <Badge size="lg" color="yellow.3" variant="light">
          Pending Invite
        </Badge>
        <Text size="xs" c="dimmed">
          {decodedToken.inviteDate}
        </Text>
      </Flex>
      <Stack mt={12} justify="center" align="center">
        <Avatar color="initials" size="xl" name={decodedToken.inviter} />
        <Group gap={6}>
          <Text c="lime" td="underline" fw={700}>
            {decodedToken.inviter}
          </Text>
          <Text> has invited you to join a task list.</Text>
        </Group>
        <Text c="dimmed">
          {decodedToken.taskListName} is a task list involving {decodedToken.category} tasks.
        </Text>

        {/* Handle empty members list */}
        {members.length > 0 ? (
          <Group>
            {members.map((member, index) => (
              <Avatar key={index} color="initials" size="sm" name={member} />
            ))}
          </Group>
        ) : (
          <Text size="sm" c="dimmed">
            No other members yet
          </Text>
        )}

        <Flex justify="space-between" align="center" gap={16} mt={24}>
          <Text c="dimmed" size="xs" fs="italic" td="underline">
            Your invitation expires in 7 days.
          </Text>
          <Group gap={8}>
            <Button variant="outline" color="red">
              Decline
            </Button>
            <Button variant="light" color="lime">
              Accept Invite
            </Button>
          </Group>
        </Flex>
      </Stack>
    </Card>
  );
}
