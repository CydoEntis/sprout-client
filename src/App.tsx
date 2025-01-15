import { useState } from "react";
import {
  Anchor,
  Box,
  Container,
  Flex,
  Group,
  Modal,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import TaskCard from "./features/Tasks/TaskCard";
import { useDisclosure } from "@mantine/hooks";
import { taskLists } from "./features/Tasks/data";
import { Calendar, Divide } from "lucide-react";
import ThemeToggle from "./components/theme/ThemeToggle";
import TaskList from "./features/TaskList/TaskList";
import CompletedTaskListCard from "./features/TaskList/CompletedTaskListCard";
import TaskListTabs from "./features/TaskLists/TaskListTabs";

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [openCard, setOpenCard] = useState<number | null>(null);

  const handleToggleCard = (cardId: number) => {
    setOpenCard((prev) => (prev === cardId ? null : cardId));
  };

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

        <Container size="md" style={{ border: "2px solid orange" }} p={16}>
          <Flex justify="space-between" align="center" py={8}>
            <Group gap={4}>
              <Text fw="bold">In Progress</Text>
              <Text c="dimmed">(12)</Text>
            </Group>
            <Anchor size="sm" c="lime">
              View More
            </Anchor>
          </Flex>

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
