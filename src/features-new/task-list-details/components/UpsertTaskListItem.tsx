import { useEffect } from "react";
import { ActionIcon, Group, Input } from "@mantine/core";
import { Trash } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { TaskListItemDetail } from "../shared/task-list-details.types";
import { newTaskListItemSchema, updateTaskListItemSchema } from "../../task-list-item/shared/task-list-item.schemas";
import { NewTaskListItemRequest, UpdateTaskListItemRequest } from "../../task-list-item/shared/task-list-item.types";

type UpsertTaskListItemProps = {
  isActive: boolean;
  taskListId: number;
  taskListItem?: TaskListItemDetail;
  onSuccess: () => void;
  onCancel: () => void;
  onDelete?: () => void;
};

function UpsertTaskListItem({
  isActive,
  taskListId,
  taskListItem,
  onSuccess,
  onCancel,
  onDelete,
}: UpsertTaskListItemProps) {
  const isEditing = Boolean(taskListItem);

  const form = useForm({
    initialValues: {
      id: taskListItem?.id ?? null,
      description: taskListItem?.description ?? "",
      isCompleted: taskListItem?.isCompleted ?? false,
      taskListId,
    },
    validate: zodResolver(isEditing ? updateTaskListItemSchema : newTaskListItemSchema),
  });

  useEffect(() => {
    if (taskListItem) {
      form.setValues({
        id: taskListItem.id,
        description: taskListItem.description,
        isCompleted: taskListItem.isCompleted,
        taskListId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskListItem]);

  const handleSubmit = async (data: NewTaskListItemRequest | UpdateTaskListItemRequest) => {
    try {
      console.log(data);
      if (isEditing) {
        // Send update request
      } else {
        // Send create request
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      form.onSubmit(handleSubmit)();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  if (!isActive) return null;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group w="100%">
        <Input
          w="100%"
          {...form.getInputProps("description")}
          autoFocus
          onKeyDown={handleKeyDown}
          placeholder="Describe Task"
          rightSection={
            <ActionIcon variant="light" color="red" onClick={onDelete || onCancel}>
              <Trash size={20} />
            </ActionIcon>
          }
        />
      </Group>
    </form>
  );
}

export default UpsertTaskListItem;
