import { Avatar, Badge, Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Route = createFileRoute("/_authenticated/invite/$token")({
  component: InvitePage,
});



function InvitePage() {
  const { token } = useParams({ from: "/_authenticated/invite/$token" });
  const [decodedToken, setDecodedToken] = useState<InviteToken | null>(null);
  const [members, setMembers] = useState<string[]>([]); 

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<InviteToken>(token);
        setDecodedToken(decoded);

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
        <Badge size="lg" color="yellow" variant="light">
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
          <Group gap={6}>
            <Text> has invited you to join </Text>
            <Text c="lime" td="underline" fw={700}>{decodedToken.taskListName}.</Text>
          </Group>
        </Group>
        <Stack gap={4}>
          <Text c="dimmed" size="xs" ta="center" td="underline">
            Category
          </Text>
          <Text c="lime" size="sm" fw="700">
            {decodedToken.category}
          </Text>
        </Stack>

        {members.length > 0 ? (
          <Avatar.Group>
            {members.map((member, index) => (
              <Avatar key={index} color="initials" size="md" name={member} />
            ))}
          </Avatar.Group>
        ) : (
          <Text size="sm" c="dimmed">
            No other members yet
          </Text>
        )}
        <Text size="sm" c="dimmed">
          {members.length > 0 &&
            (members.length === 1 ? "1 person has already accepted" : `${members.length} people have already accepted`)}
        </Text>

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
