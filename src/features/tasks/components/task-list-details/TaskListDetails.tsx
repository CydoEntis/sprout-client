import { Group, Title, Text, Stack } from "@mantine/core";
import { TaskList } from "../../shared/tasks.types";
import UpdateAndDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import TaskListMembers from "../TaskListMembers";

type Props = {
  TaskList: TaskList;
  onUpdate: () => void;
  onDelete: () => void;
};

function TaskListDetails({ TaskList, onUpdate, onDelete }: Props) {
  return (
    <Stack gap={2} mb={16}>
      <Group justify="space-between" align="center">
        <Title>{TaskList.name}</Title>
        <UpdateAndDeleteMenu onUpdate={onUpdate} onDelete={onDelete} />
      </Group>
      <Text c="dimmed">{TaskList.description}</Text>
      <TaskListMembers members={TaskList.members} />
    </Stack>
  );
}

export default TaskListDetails;
