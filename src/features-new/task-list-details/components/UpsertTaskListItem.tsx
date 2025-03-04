import { useEffect, useRef } from "react";
import { ActionIcon, ActionIconGroup, Box, TextInput } from "@mantine/core";
import { Check, X } from "lucide-react";
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
  onClose: () => void;
};

function UpsertTaskListItem({ isActive, taskListId, taskListItem, onClose: onCancel }: UpsertTaskListItemProps) {
  const formRef = useRef<HTMLFormElement>(null);
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
  }, [taskListItem]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, onCancel]);

  const handleSubmit = async (data: NewTaskListItemRequest | UpdateTaskListItemRequest) => {
    try {
      if (isEditing) {
        await updateTaskListItem.mutateAsync(data as UpdateTaskListItemRequest);
      } else {
        await createTaskListItem.mutateAsync(data as NewTaskListItemRequest);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      form.reset();
      onCancel();
    }
  };

  const onConfirm = () => {
    form.onSubmit(handleSubmit)();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      form.onSubmit(handleSubmit)();
      form.reset();
      onCancel();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  if (!isActive) return null;

  return (
    <form ref={formRef} onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
      <TextInput
        w="100%"
        rightSectionWidth={60} // Ensures space for icons
        {...form.getInputProps("description")}
        classNames={{
          input: "input",
        }}
        autoFocus
        onKeyDown={handleKeyDown}
        placeholder="Describe Task"
        rightSection={
          <ActionIconGroup>
            <ActionIcon variant="light" color="lime" onClick={onConfirm}>
              <Check size={20} />
            </ActionIcon>
            <ActionIcon variant="light" color="red" onClick={onCancel}>
              <X size={20} />
            </ActionIcon>
          </ActionIconGroup>
        }
      />
    </form>
  );
}

export default UpsertTaskListItem;
