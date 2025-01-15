import { SimpleGrid, Tabs, Group, Button, Flex } from "@mantine/core";
import { ClipboardCheck, ClipboardList, Plus } from "lucide-react";
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
              leftSection={<ClipboardList size={18} />}
            >
              Todo's
            </Tabs.Tab>
            <Tabs.Tab
              value="completed"
              leftSection={<ClipboardCheck size={18} />}
            >
              Completed
            </Tabs.Tab>
          </Group>
          <Button variant="light" c="lime" leftSection={<Plus size={20}/>} mb={8}>
            Create New List
          </Button>
        </Flex>
      </Tabs.List>

      <Tabs.Panel value="progress">
        // Todo Create a seperate list component responsible for mapping over all todos.
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          <TaskList />
          <TaskList />
          <TaskList />
        </SimpleGrid>
      </Tabs.Panel>

      <Tabs.Panel value="completed">
        // TODO: Use TodoList component to hold all completed todos and map over them
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
