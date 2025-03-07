import { Group, Title, Text, Stack } from "@mantine/core";
import { TaskList } from "../../shared/tasks.types";
import UpdateAndDeleteMenu from "../../../../components/menus/UpdateAndDeleteMenu";
import TaskListMembers from "../TaskListMembers";

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
        <UpdateAndDeleteMenu onUpdate={onUpdate} onDelete={onDelete} />
      </Group>
      <Text c="dimmed">{taskList.description}</Text>
      <TaskListMembers members={taskList.members} />
    </Stack>
  );
}

export default TaskListDetails;
