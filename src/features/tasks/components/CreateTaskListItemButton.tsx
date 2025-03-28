import { Button } from "@mantine/core";
import { Minus, Plus } from "lucide-react";

type CreateTasklistItemButtonProps = {
  isCreating: boolean;
  onCreate: () => void;
};

function CreateTasklistItemButton({ isCreating, onCreate }: CreateTasklistItemButtonProps) {
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

export default CreateTasklistItemButton;
