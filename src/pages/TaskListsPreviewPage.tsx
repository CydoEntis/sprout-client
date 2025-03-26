import GridList from "../components/GridList";
import { Box, Button, Group } from "@mantine/core";
import { Plus } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { TaskListPreview } from "../features/tasks/shared/tasks.types";
import CreateTaskListModal from "../features/tasks/components/create-task-list/CreateTaskListModal";
import TaskListCard from "../features/tasks/components/task-card/TaskListCard";

type TaskListPage = {
  taskLists: TaskListPreview[];
};

function TaskListPage({ taskLists }: TaskListPage) {
  const [isCreateTaskListModalOpened, { open: onOpenCreateTaskListModal, close: onCloseCreateTaskListModal }] =
    useDisclosure(false);

  return (
    <Box mt={32}>
      <CreateTaskListModal isOpen={isCreateTaskListModalOpened} onClose={onCloseCreateTaskListModal} />
      <Group justify="end" py={16}>
        <Button variant="light" leftSection={<Plus size={20} />} color="lime" onClick={onOpenCreateTaskListModal}>
          Task List
        </Button>
      </Group>
      <GridList>
        {taskLists.map((taskList) => (
          <TaskListCard key={taskList.id} taskList={taskList} />
        ))}
      </GridList>
    </Box>
  );
}

export default TaskListPage;
