import { useEffect, useRef } from "react";
import { ActionIcon, ActionIconGroup, Flex, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Check, X } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { updateTaskListItemSchema, createTaskListItemSchema } from "../../task-list/shared/tasks.schemas";
import { TaskListItem, UpdateTaskListItem, CreateTaskListItem } from "../../task-list/shared/tasks.types";

type UpsertTaskListItemProps = {
  isActive: boolean;
  taskListId: number;
  tasklistItem?: TaskListItem;
  onClose: () => void;
  onUpdate?: (updatedItem: UpdateTaskListItem) => void;
  onCreate?: (newItem: CreateTaskListItem) => void;
};

function UpsertTaskListItem({
  isActive,
  taskListId,
  tasklistItem,
  onClose,
  onUpdate,
  onCreate,
}: UpsertTaskListItemProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = Boolean(tasklistItem);

  const form = useForm({
    initialValues: {
      id: tasklistItem?.id ?? null,
      description: tasklistItem?.description ?? "",
      isCompleted: tasklistItem?.isCompleted ?? false,
      taskListId: taskListId,
      position: tasklistItem?.position ?? 0,
      dueDate: tasklistItem?.dueDate ? new Date(tasklistItem.dueDate) : null,
    },
    validate: zodResolver(isEditing ? updateTaskListItemSchema : createTaskListItemSchema),
  });

  useEffect(() => {
    if (tasklistItem) {
      form.setValues({
        id: tasklistItem.id,
        description: tasklistItem.description,
        isCompleted: tasklistItem.isCompleted,
        taskListId: taskListId,
        position: tasklistItem.position,
        dueDate: tasklistItem.dueDate ? new Date(tasklistItem.dueDate) : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasklistItem]);

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

  const handleSubmit = async (data: CreateTaskListItem | UpdateTaskListItem) => {
    const payload = {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
    };

    try {
      if (isEditing) {
        onUpdate?.(payload as UpdateTaskListItem);
      } else {
        onCreate?.(payload as CreateTaskListItem);
      }

      form.reset();
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const onConfirm = () => {
    form.onSubmit(handleSubmit)();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      form.onSubmit(handleSubmit)();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isActive) return null;

  return (
    <form ref={formRef} onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
      <Flex gap="xs" align="center">
        <TextInput
          classNames={{
            input: "input",
          }}
          w="100%"
          variant="filled"
          rightSectionWidth={60}
          {...form.getInputProps("description")}
          error={form.errors.description}
          autoFocus
          onKeyDown={handleKeyDown}
          placeholder="Describe Task"
        />
        <DateInput
          classNames={{
            input: "input",
          }}
          clearable
          value={form.values.dueDate}
          onChange={(date) => form.setFieldValue("dueDate", date)}
          placeholder="Optional due date"
        />
        <ActionIconGroup>
          <ActionIcon variant="subtle" color="lime" onClick={onConfirm}>
            <Check size={20} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={onClose}>
            <X size={20} />
          </ActionIcon>
        </ActionIconGroup>
      </Flex>
    </form>
  );
}

export default UpsertTaskListItem;
