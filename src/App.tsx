import {
  Anchor,
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Group,
  Title,
  Text,
  Switch,
} from "@mantine/core";
import { DndListHandle } from "./DndListHandle";
import TaskCard from "./features/Tasks/TaskCard";

function App() {
  return (
    <Container size="xl" style={{ border: "1px solid red" }} p={16}>
      <Flex justify="space-between">
        <Title size="1.5rem">Task Garden</Title>

        <Group>
          <Anchor>Tasks</Anchor>
          <Anchor>Garden</Anchor>
        </Group>
      </Flex>

      <Box>
        <TaskCard />
      </Box>
    </Container>
  );
}

export default App;
