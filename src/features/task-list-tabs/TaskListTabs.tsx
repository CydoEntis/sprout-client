import { Tabs, Group, Button, Flex, Text } from "@mantine/core";
import { ClipboardCheck, ClipboardList, Plus } from "lucide-react";

import InProgressTaskList from "../task-list/InProgressTaskList";
import CompletedTaskList from "../task-list/CompletedTaskList";
import { TaskListResponse } from "../task-list/shared/task-list.types";
import InProgressTaskListCard from "../task-list/InProgressTaskListCard";
import TaskListGrid from "../task-list/TaskListGrid";

type TaskListTabsProps = {
  onOpenNewList: () => void;
  taskLists: TaskListResponse[];
};

function TaskListTabs({ onOpenNewList, taskLists }: TaskListTabsProps) {
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
            onClick={onOpenNewList}
          >
            New List
          </Button>
        </Flex>
      </Tabs.List>

      <Tabs.Panel value="progress">
        <TaskListGrid>
          {taskLists.map((taskList) => (
            <InProgressTaskListCard key={taskList.id} taskList={taskList} />
          ))}
        </TaskListGrid>
      </Tabs.Panel>

      <Tabs.Panel value="completed">
        <CompletedTaskList />
      </Tabs.Panel>
    </Tabs>
  );
}

export default TaskListTabs;
