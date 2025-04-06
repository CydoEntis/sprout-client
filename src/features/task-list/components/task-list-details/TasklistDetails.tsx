import { Group, Title, Text, Stack } from "@mantine/core";
import LazyEditDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import { TaskList } from "../../shared/tasks.types";

type Props = {
  taskList: TaskList;
  onUpdate: () => void;
  onDelete: () => void;
};

function TaskListDetails({ taskList, onUpdate, onDelete }: Props) {
  return (
    <Stack gap={2} mb={16}>
      <Group justify="space-between" align="center">
        <Title>{taskList.name}</Title>
        <LazyEditDeleteMenu onUpdate={onUpdate} onDelete={onDelete} />
      </Group>
      <Text c="dimmed">{taskList.description}</Text>
      {/* <TaskListMembers members={taskList.members} additionalMemberCount={0} size={"md"} /> */}
    </Stack>
  );
}

export default TaskListDetails;
