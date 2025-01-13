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
        <Card withBorder radius="lg" w={500}>
          <Flex justify="space-between" align="center" py={16}>
            <Group align="center" gap={8}>
              <Text  c="dimmed">
                0/5
              </Text>
              <Text size="0.5rem" c="dimmed">
                •
              </Text>
              <Text fw={600}>Shopping List</Text>
            </Group>


          </Flex>
          <DndListHandle />
        </Card>
      </Box>
    </Container>
  );
}

export default App;
