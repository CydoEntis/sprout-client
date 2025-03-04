import { useEffect } from "react";
import { ActionIcon, TextInput } from "@mantine/core";
import { X } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { TaskListItemDetail } from "../shared/task-list-details.types";
import { newTaskListItemSchema, updateTaskListItemSchema } from "../../task-list-item/shared/task-list-item.schemas";
import { NewTaskListItemRequest, UpdateTaskListItemRequest } from "../../task-list-item/shared/task-list-item.types";
import { useCreateTaskListItemMutation } from "../../task-list-item/services/create-task-list-item.service";
import { useUpdateTaskListItemMutation } from "../../task-list-item/services/update-task-list-item.service";

type UpsertTaskListItemProps = {
  isActive: boolean;
  taskListId: number;
  taskListItem?: TaskListItemDetail;
  onCancel: () => void;
};

function UpsertTaskListItem({ isActive, taskListId, taskListItem, onCancel }: UpsertTaskListItemProps) {
  const isEditing = Boolean(taskListItem);
  const createTaskListItem = useCreateTaskListItemMutation();
  const updateTaskListItem = useUpdateTaskListItemMutation();

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
      if (isEditing) {
        await updateTaskListItem.mutateAsync(data as UpdateTaskListItemRequest);
      } else {
        await createTaskListItem.mutateAsync(data as NewTaskListItemRequest);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const cancelHandler = () => {
    form.reset();
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      form.onSubmit(handleSubmit)();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  if (!isActive) return null;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        w="100%"
        {...form.getInputProps("description")}
        classNames={{
          input: "input",
        }}
        autoFocus
        onKeyDown={handleKeyDown}
        placeholder="Describe Task"
        rightSectionPointerEvents="all"
        rightSection={
          <ActionIcon variant="light" color="red" onClick={cancelHandler}>
            <X size={20} />
          </ActionIcon>
        }
      />
    </form>
  );
}

export default UpsertTaskListItem;
