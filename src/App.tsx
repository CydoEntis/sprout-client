import {
  Anchor,
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Group,
  Title,
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
        <Card shadow="lg" withBorder radius="lg" w={300}>
          <Flex justify="justify-between">
            <Group>
              <Box maw={200}>
                <Title order={4}>Christmas Shopping</Title>
              </Box>
              <Badge variant="light" color="red">
                5d left
              </Badge>
            </Group>
          </Flex>
          <DndListHandle />
        </Card>
      </Box>
    </Container>
  );
}

export default App;
