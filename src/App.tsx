import {
  Anchor,
  Box,
  Container,
  Flex,
  Group,
  Modal,
  Title,
} from "@mantine/core";
import TaskCard from "./features/Tasks/TaskCard";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container size="xl" p={16}>
      <Flex justify="space-between" mb={32}>
        <Title size="1.5rem">Task Garden</Title>

        <Group>
          <Anchor>Tasks</Anchor>
          <Anchor>Garden</Anchor>
        </Group>
      </Flex>

      <Box>
        <Modal opened={opened} onClose={close} title="Add A Task">
          Add A New Task.
        </Modal>
        <TaskCard onOpenAddTask={open} />
      </Box>
    </Container>
  );
}

export default App;
