import { Tabs, Group, Button, Flex } from "@mantine/core";
import { ClipboardCheck, ClipboardList, Plus } from "lucide-react";

import InProgressTaskList from "../task-list/InProgressTaskList";
import CompletedTaskList from "../task-list/CompletedTaskList";

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
          <Button
            variant="light"
            color="lime"
            leftSection={<Plus size={20} />}
            mb={8}
          >
            New List
          </Button>
        </Flex>
      </Tabs.List>

      <Tabs.Panel value="progress">
        <InProgressTaskList />
      </Tabs.Panel>

      <Tabs.Panel value="completed">
        <CompletedTaskList />
      </Tabs.Panel>
    </Tabs>
  );
}

export default TaskListTabs;
