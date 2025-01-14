import { useState } from "react";
import {
  Anchor,
  Container,
  Flex,
  Group,
  Modal,
  Stack,
  Title,
} from "@mantine/core";
import TaskCard from "./features/Tasks/TaskCard";
import { useDisclosure } from "@mantine/hooks";
import { taskLists } from "./features/Tasks/data";

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [openCard, setOpenCard] = useState<number | null>(null);

  const handleToggleCard = (cardId: number) => {
    setOpenCard((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <Container size="xl" p={16}>
      <Flex justify="space-between" mb={32}>
        <Title size="1.5rem">Task Garden</Title>

        <Group>
          <Anchor>Tasks</Anchor>
          <Anchor>Garden</Anchor>
        </Group>
      </Flex>

      <Container size="sm">
        <Modal opened={opened} onClose={close} title="Add A Task">
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
        </Stack>
      </Container>
    </Container>
  );
}

export default App;
