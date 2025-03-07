import { Button, Group } from "@mantine/core";
import GridList from "../../../components/GridList";

import { Plus } from "lucide-react";
import { TaskList } from "../shared/tasks.types";
import InProgressTaskListCard from "./InProgressTaskListCard";

type TaskListCardsListProps = {
  onOpen: () => void;
  taskLists: TaskList[];
};

function TaskListCardsList({ onOpen, taskLists }: TaskListCardsListProps) {
  return (
    <>
      <Group justify="end" py={16}>
        <Button variant="light" leftSection={<Plus size={20} />} color="lime" onClick={onOpen}>
          Task List
        </Button>
      </Group>
      <GridList>
        {taskLists.map((taskList) => (
          <InProgressTaskListCard key={taskList.id} taskList={taskList} />
        ))}
      </GridList>
    </>
  );
}

export default TaskListCardsList;
