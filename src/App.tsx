import { Box, Center, Paper, Stack, Text, Title } from "@mantine/core";
import TaskListTabs from "./features/task-list-tabs/TaskListTabs";

import useAuthStore from "./stores/useAuthStore";
import FarmProgress from "./features/farm/FarmProgress";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskListModal from "./features/task-list/CreateTaskListModal";
import TaskListGrid from "./features/task-list/TaskListGrid";
import { ShoppingBag } from "lucide-react";

function App() {
  const { user } = useAuthStore();
  const [isNewTaskListOpened, { open: onOpenNewList, close: onCloseNewList }] =
    useDisclosure(false);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <CreateTaskListModal
        onClose={onCloseNewList}
        isOpened={isNewTaskListOpened}
      />
      <Stack gap={4} pb={32}>
        <Title>Welcome back, {user!.username}</Title>
        <FarmProgress />
      </Stack>
      {/* <TaskListGrid>

      </TaskListGrid> */}
      <TaskListTabs onOpenNewList={onOpenNewList} />
    </>
  );
}

export default App;
