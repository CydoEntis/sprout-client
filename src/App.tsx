import { useState } from "react";
import { Anchor, Container, Flex, Group, Modal, Stack, Title } from "@mantine/core";
import TaskCard from "./features/Tasks/TaskCard";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleToggleCard = (cardIndex: number) => {
    setExpandedCard((prev) => (prev === cardIndex ? null : cardIndex));
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
          {Array.from({ length: 4 }).map((_, index) => (
            <TaskCard
              key={index}
              onOpenAddTask={open}
              isExpanded={expandedCard === index}
              onToggleExpand={() => handleToggleCard(index)}
            />
          ))}
        </Stack>
      </Container>
    </Container>
  );
}

export default App;
