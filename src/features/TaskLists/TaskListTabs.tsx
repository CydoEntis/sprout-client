import { Tabs } from "@mantine/core";
import { ClipboardCheck, ClipboardList } from "lucide-react";
import React from "react";

function TaskListTabs() {
  return (
    <Tabs defaultValue="progress">
      <Tabs.List>
        <Tabs.Tab value="progress" leftSection={<ClipboardList size={12} />}>
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="completed" leftSection={<ClipboardCheck size={12} />}>
          Messages
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="progress">Gallery tab content</Tabs.Panel>

      <Tabs.Panel value="completed">Messages tab content</Tabs.Panel>

    </Tabs>
  );
}

export default TaskListTabs;
