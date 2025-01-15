import { SimpleGrid, Tabs, Group, Button, Flex } from "@mantine/core";
import { ClipboardCheck, ClipboardList } from "lucide-react";
import React from "react";
import TaskList from "../TaskList/TaskList";
import CompletedTaskListCard from "../TaskList/CompletedTaskListCard";

function TaskListTabs() {
  return (
    <Tabs defaultValue="progress" color="lime">
      <Tabs.List mb={12}>
        <Flex justify="space-between" w="100%">
          <Group>
            <Tabs.Tab
              value="progress"
              leftSection={<ClipboardList size={12} />}
            >
              Gallery
            </Tabs.Tab>
            <Tabs.Tab
              value="completed"
              leftSection={<ClipboardCheck size={12} />}
            >
              Messages
            </Tabs.Tab>
          </Group>
          <Button variant="transparent" c="lime">
            Test
          </Button>
        </Flex>
      </Tabs.List>

      <Tabs.Panel value="progress">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          <TaskList />
          <TaskList />
          <TaskList />
        </SimpleGrid>
      </Tabs.Panel>

      <Tabs.Panel value="completed">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          <CompletedTaskListCard />
          <CompletedTaskListCard />
          <CompletedTaskListCard />
        </SimpleGrid>
      </Tabs.Panel>
    </Tabs>
  );
}

export default TaskListTabs;
