import { useState } from "react";
import {
  Anchor,
  Box,
  Container,
  Flex,
  Group,
  Modal,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import TaskCard from "./features/Tasks/TaskCard";
import { useDisclosure } from "@mantine/hooks";
import { taskLists } from "./features/Tasks/data";
import { Calendar, Divide } from "lucide-react";
import ThemeToggle from "./components/theme/ThemeToggle";
import InProgressTaskListCard from "./features/TaskList/InProgressTaskListCard";
import CompletedTaskListCard from "./features/TaskList/CompletedTaskListCard";
import TaskListTabs from "./features/TaskLists/TaskListTabs";

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [openCard, setOpenCard] = useState<number | null>(null);

  const handleToggleCard = (cardId: number) => {
    setOpenCard((prev) => (prev === cardId ? null : cardId));
  };

  const stage = 1;

  return (
    <Box bg="primary" mih="100vh">
      <Container size="xl" p={16}>
        <Flex justify="space-between" mb={32}>
          <Title size="1.5rem">Task Garden</Title>

          <Group>
            <Anchor>Tasks</Anchor>
            <Anchor>Garden</Anchor>
            <ThemeToggle />
          </Group>
        </Flex>

        <Container size="md" p={16}>
          <Stack gap={4}>
            <Title>Welcome back, Demo User</Title>
            <Text c="dimmed">Your next crop will be ready in...</Text>
          </Stack>
          <Group grow gap={5} mt="xs">
            <Progress
              size="xs"
              color="lime"
              value={stage > 0 ? 100 : 0}
              transitionDuration={0}
            />
            <Progress
              size="xs"
              color="lime"
              transitionDuration={0}
              value={stage < 2 ? 0 : 100}
            />
            <Progress
              size="xs"
              color="lime" 
              transitionDuration={0}
              value={stage < 3 ? 0 : 100}
            />
            <Progress
              size="xs"
              color="lime"
              transitionDuration={0}
              value={stage < 4 ? 0 : 100}
            />
          </Group>

          <TaskListTabs />

          {/* <Modal opened={opened} onClose={close} title="Add A Task">
          Add A New Task.
        </Modal>

        <Stack gap={4}>
          {taskLists.map((taskList) => (
            <TaskCard
              key={taskList.id}
              onOpenAddTask={open}
              isOpen={openCard === taskList.id}
              onOpenTaskList={() => handleToggleCard(taskList.id)}
              taskList={taskList} 
            />
          ))}
        </Stack> */}
        </Container>
      </Container>
    </Box>
  );
}

export default App;
