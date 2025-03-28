import { Group, Title, Text, Stack } from "@mantine/core";
import { Tasklist } from "../../shared/tasks.types";
import UpdateAndDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import TasklistMembers from "../TasklistMembers";

type Props = {
  Tasklist: Tasklist;
  onUpdate: () => void;
  onDelete: () => void;
};

function TasklistDetails({ Tasklist, onUpdate, onDelete }: Props) {
  return (
    <Stack gap={2} mb={16}>
      <Group justify="space-between" align="center">
        <Title>{Tasklist.name}</Title>
        <UpdateAndDeleteMenu onUpdate={onUpdate} onDelete={onDelete} />
      </Group>
      <Text c="dimmed">{Tasklist.description}</Text>
      <TasklistMembers members={Tasklist.members} />
    </Stack>
  );
}

export default TasklistDetails;
