import { useState } from "react";
import {
  Anchor,
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  Modal,
  RingProgress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import TaskCard from "./features/Tasks/TaskCard";
import { useDisclosure } from "@mantine/hooks";
import { taskLists } from "./features/Tasks/data";
import { Calendar, Divide } from "lucide-react";

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

      <Container size="sm" style={{ border: "2px solid orange" }}>
        <Flex justify="space-between" align="center" py={8}>
          <Group gap={4}>
            <Text fw="bold">In Progress</Text>
            <Text c="dimmed">(12)</Text>
          </Group>
          <Anchor size="sm" c="lime">
            View More
          </Anchor>
        </Flex>

        <Stack gap={4}>
          <Card w={300}>
            <Box p={8}>
              <Stack gap={8} pb={20}>
                <Title size="lg">Design UI ToDo App</Title>
                <Group gap={4} align="center">
                  <Calendar size={14} />
                  <Text size="sm" c="dimmed">
                    Friday, July 8, 2025
                  </Text>
                </Group>
              </Stack>
              <Divider />
              <Stack gap={2} py={16}>
                <Text c="dimmed" size="sm">
                  Description:
                </Text>
                <Text size="sm">
                  Design a simple home page with clean layout and color based on
                  the guidlines
                </Text>
              </Stack>
              <Flex w="100%" justify="space-between">
                <Group>
                  <Stack gap={4}>
                    <Text size="sm" c="dimmed">
                      Members:
                    </Text>
                    <Avatar.Group>
                      <Avatar size="sm" src="image.png" />
                      <Avatar size="sm" src="image.png" />
                      <Avatar size="sm" src="image.png" />
                      <Avatar size="sm">+5</Avatar>
                    </Avatar.Group>
                  </Stack>
                </Group>
                <Group>
                  <Stack gap={4}>
                    <Text size="sm" c="dimmed">
                      Progress:
                    </Text>
                    <Group gap={4}>
                      <RingProgress
                        size={25}
                        thickness={3}
                        sections={[{ value: 78, color: "lime" }]}
                      />
                      <Text size="sm">78%</Text>
                    </Group>
                  </Stack>
                </Group>
              </Flex>
            </Box>
          </Card>
        </Stack>
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
  );
}

export default App;
