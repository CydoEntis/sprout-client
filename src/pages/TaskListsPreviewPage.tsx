import { TaskList } from "../features-new/task-list/shared/task-list.types";
import GridList from "../components/GridList";
import InProgressTaskListCard from "../features-new/task-list/components/InProgressTaskListCard";
import { Box, Button, Group } from "@mantine/core";
import { Plus } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskListModal from "../features-new/task-list/components/CreateTaskListModal";

type TaskListPage = {
  taskLists: TaskList[];
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
          <InProgressTaskListCard key={taskList.id} taskList={taskList} />
        ))}
      </GridList>
    </Box>
  );
}

export default TaskListPage;
