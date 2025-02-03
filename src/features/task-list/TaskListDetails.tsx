import {
  Paper,
  Title,
  Text,
  Stack,
  Badge,
  Group,
  Button,
  Avatar,
} from "@mantine/core";
import TaskListHeader from "../Tasks2/TaskListHeader";
import { DndListHandle } from "../../DndListHandle";
import AddTaskBtn from "../Tasks2/AddTaskBtn";
import { Clock, Plus } from "lucide-react";

type TaskListDetailsProps = {
  onOpenAddTask: () => void;
};

function TaskListDetails({ onOpenAddTask }: TaskListDetailsProps) {
  return (
    <Paper p={16} radius="md" mt={16}>
      <Stack gap={2} mb={16}>
        <Group justify="space-between" align="center">
          <Title>Website for Rune.io</Title>
          <Badge color="yellow.4" variant="light">
            In Progress
          </Badge>
        </Group>
        <Text c="dimmed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laborum
          nemo rerum obcaecati quidem tempore iusto amet doloremque nisi odit!
          Aut excepturi ipsam ipsa! Doloribus eveniet cumque dolores voluptate
          excepturi?
        </Text>
        <Group gap={8}>
          <Button size="xs" variant="light" color="lime">
            Details
          </Button>
          <Button size="xs" variant="subtle" color="inverse">
            Comments
          </Button>
          <Button size="xs" variant="subtle" color="inverse">
            Attachments
          </Button>
        </Group>
        <Stack mt={16} gap={4}>
          <Text size="xs">Members</Text>
          <Group justify="space-between" align="center">
            <Avatar.Group>
              <Avatar color="initials" name="Bilbo Baggins" />
              <Avatar color="initials" name="Tito Teets" />
              <Avatar color="initials" name="Zoro Boro" />
              <Avatar>
                <Plus size={20} />
              </Avatar>
            </Avatar.Group>
            <Badge size="lg" leftSection={<Clock size={16} />} variant="light" color="gray">
              Deadline: February 6
            </Badge>
          </Group>
        </Stack>
      </Stack>
      {/* <TaskListHeader /> */}
      <DndListHandle />
    </Paper>
  );
}

export default TaskListDetails;
