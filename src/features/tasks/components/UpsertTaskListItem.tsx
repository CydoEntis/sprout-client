import { useEffect, useRef } from "react";
import { ActionIcon, ActionIconGroup, TextInput } from "@mantine/core";
import { Check, X } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { CreateTaskListItem, TaskListItem, UpdateTaskListItem } from "../shared/tasks.types";
import { createTaskListItemSchema, updateTaskListItemSchema } from "../shared/tasks.schemas";

type UpsertTaskListItemProps = {
  isActive: boolean;
  tasklistId: number;
  tasklistItem?: TaskListItem;
  onClose: () => void;
  onUpdate?: (updatedItem: UpdateTaskListItem) => void;
  onCreate?: (newItem: CreateTaskListItem) => void;
};

function UpsertTaskListItem({
  isActive,
  tasklistId,
  tasklistItem,
  onClose,
  onUpdate,
  onCreate,
}: UpsertTaskListItemProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = Boolean(tasklistItem);
  console.log("Is editing: ", isEditing);
  console.log("tHE PASSED IN ITEM: ", tasklistItem);

  const form = useForm({
    initialValues: {
      id: tasklistItem?.id ?? null,
      description: tasklistItem?.description ?? "",
      isCompleted: tasklistItem?.isCompleted ?? false,
      tasklistId: tasklistId,
      position: tasklistItem?.position ?? 0,
    },
    validate: zodResolver(isEditing ? updateTaskListItemSchema : createTaskListItemSchema),
  });

  useEffect(() => {
    if (tasklistItem) {
      console.log("task list item exists: ", tasklistItem);
      form.setValues({
        id: tasklistItem.id,
        description: tasklistItem.description,
        isCompleted: tasklistItem.isCompleted,
        tasklistId: tasklistId,
        position: tasklistItem.position,
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

  console.log(form.errors);

  const handleSubmit = async (data: CreateTaskListItem | UpdateTaskListItem) => {
    try {
      if (isEditing) {
        console.log("Updating: ", data);
        onUpdate?.(data as UpdateTaskListItem);
      } else {
        onCreate?.(data as CreateTaskListItem);
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
      <TextInput
        w="100%"
        variant="filled"
        rightSectionWidth={60}
        {...form.getInputProps("description")}
        error={form.errors.description}
        classNames={{
          input: "input",
        }}
        autoFocus
        onKeyDown={handleKeyDown}
        placeholder="Describe Task"
        rightSection={
          <ActionIconGroup>
            <ActionIcon variant="subtle" color="lime" onClick={onConfirm}>
              <Check size={20} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red" onClick={onClose}>
              <X size={20} />
            </ActionIcon>
          </ActionIconGroup>
        }
      />
    </form>
  );
}

export default UpsertTaskListItem;
