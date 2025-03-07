import { Button } from "@mantine/core";
import { Minus, Plus } from "lucide-react";

type CreateTaskListItemButtonProps = {
  isCreating: boolean;
  onCreate: () => void;
};

function CreateTaskListItemButton({ isCreating, onCreate }: CreateTaskListItemButtonProps) {
  return (
    <Button
      variant="subtle"
      color="dimmed"
      leftSection={isCreating ? <Minus size={20} /> : <Plus size={20} />}
      onClick={onCreate}
    >
      {isCreating ? "Cancel Task" : "Add Task"}
    </Button>
  );
}

export default CreateTaskListItemButton;
