import { Button, Group } from "@mantine/core";
import { Plus } from "lucide-react";

type AddTaskBtnProps = {
  onOpenAddTask: () => void;
};

function AddTaskBtn({ onOpenAddTask }: AddTaskBtnProps) {
  return (
    <Group justify="end">
      <Button
        leftSection={<Plus size={20} />}
        variant="transparent"
        c="lime"
        onClick={(e) => {
          e.stopPropagation();
          onOpenAddTask();
        }}
      >
        Add an item
      </Button>
    </Group>
  );
}

export default AddTaskBtn;
