import {
  Box,
  Button,
  Center,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import TaskListTabs from "./features/task-list-tabs/TaskListTabs";

import useAuthStore from "./stores/useAuthStore";
import FarmProgress from "./features/farm/FarmProgress";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskListModal from "./features/task-list/CreateTaskListModal";
import TaskListGrid from "./features/task-list/TaskListGrid";
import { Plus, ShoppingBag } from "lucide-react";

function App() {
  const { user } = useAuthStore();
  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);
  const [
    isNewCategoryOpened,
    { open: onOpenNewCategory, close: onCloseNewCategory },
  ] = useDisclosure(false);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Modal
        opened={isNewCategoryOpened}
        onClose={onCloseNewCategory}
        title="Add a new category"
      >

      </Modal>

      <CreateTaskListModal
        onClose={onCloseNewList}
        isOpened={isNewTaskListOpened}
      />
      <Stack gap={4} pb={32}>
        <Title>Welcome back, {user!.username}</Title>
        <FarmProgress />
      </Stack>
      <Group justify="end">
        <Button
          variant="light"
          leftSection={<Plus size={20} />}
          color="lime"
          onClick={onOpenNewCategory}
        >
          Category
        </Button>
      </Group>
      {/* <TaskListGrid>

      </TaskListGrid> */}
      {/* <TaskListTabs onOpenNewList={onOpenNewList} /> */}
    </>
  );
}

export default App;
