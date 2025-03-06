import { useEffect, useRef } from "react";
import { ActionIcon, ActionIconGroup, TextInput } from "@mantine/core";
import { Check, X } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { TaskListItemDetail } from "../shared/task-list-details.types";
import { createTaskListItemSchema, updateTaskListItemSchema } from "../../task-list-item/shared/task-list-item.schemas";
import { CreateTaskListItemRequest, UpdateTaskListItemRequest } from "../../task-list-item/shared/task-list-item.types";

type UpsertTaskListItemProps = {
  isActive: boolean;
  taskListId: number;
  taskListItem?: TaskListItemDetail;
  onClose: () => void;
  onUpdate?: (updatedItem: TaskListItemDetail) => void;
  onCreate?: (newItem: CreateTaskListItemRequest) => void;
};

function UpsertTaskListItem({
  isActive,
  taskListId,
  taskListItem,
  onClose,
  onUpdate,
  onCreate,
}: UpsertTaskListItemProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = Boolean(taskListItem);

  const form = useForm({
    initialValues: {
      id: taskListItem?.id ?? null,
      description: taskListItem?.description ?? "",
      isCompleted: taskListItem?.isCompleted ?? false,
      taskListId,
    },
    validate: zodResolver(isEditing ? updateTaskListItemSchema : createTaskListItemSchema),
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
        onClose();
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, onClose]);

  const handleSubmit = async (data: CreateTaskListItemRequest | UpdateTaskListItemRequest) => {
    try {
      if (isEditing) {
        onUpdate?.(data as UpdateTaskListItemRequest);
      } else {
        onCreate?.(data as CreateTaskListItemRequest);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      form.reset();
      onClose();
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
      onClose();
    } else if (e.key === "Escape") {
      onClose();
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
            <ActionIcon variant="light" color="red" onClick={onClose}>
              <X size={20} />
            </ActionIcon>
          </ActionIconGroup>
        }
      />
    </form>
  );
}

export default UpsertTaskListItem;
