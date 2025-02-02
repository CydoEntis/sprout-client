import { Button, Group } from "@mantine/core";
import GridList from "../../components/GridList";
import InProgressTaskListCard from "./InProgressTaskListCard";
import { TaskListResponse } from "./shared/task-list.types";
import { Plus } from "lucide-react";

type TaskListsPreviewProps = {
  onOpen: () => void;
  taskLists: TaskListResponse[];
};

function TaskListsPreview({ onOpen, taskLists }: TaskListsPreviewProps) {
  return (
    <>
      <Group justify="end" py={16}>
        <Button
          variant="light"
          leftSection={<Plus size={20} />}
          color="lime"
          onClick={onOpen}
        >
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

export default TaskListsPreview;
