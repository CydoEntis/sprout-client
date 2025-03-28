import { useEffect, useRef } from "react";
import { ActionIcon, ActionIconGroup, TextInput } from "@mantine/core";
import { Check, X } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { CreateTasklistItem, TasklistItem, UpdateTasklistItem } from "../shared/tasks.types";
import { createTasklistItemSchema, updateTasklistItemSchema } from "../shared/tasks.schemas";

type UpsertTasklistItemProps = {
  isActive: boolean;
  TasklistId: number;
  TasklistItem?: TasklistItem;
  onClose: () => void;
  onUpdate?: (updatedItem: UpdateTasklistItem) => void;
  onCreate?: (newItem: CreateTasklistItem) => void;
};

function UpsertTasklistItem({
  isActive,
  TasklistId,
  TasklistItem,
  onClose,
  onUpdate,
  onCreate,
}: UpsertTasklistItemProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = Boolean(TasklistItem);

  const form = useForm({
    initialValues: {
      id: TasklistItem?.id ?? null,
      description: TasklistItem?.description ?? "",
      isCompleted: TasklistItem?.isCompleted ?? false,
      TasklistId: TasklistId,
      position: TasklistItem?.position ?? 0,
    },
    validate: zodResolver(isEditing ? updateTasklistItemSchema : createTasklistItemSchema),
  });

  useEffect(() => {
    if (TasklistItem) {
      form.setValues({
        id: TasklistItem.id,
        description: TasklistItem.description,
        isCompleted: TasklistItem.isCompleted,
        TasklistId: TasklistId,
        position: TasklistItem.position,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TasklistItem]);

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

  const handleSubmit = async (data: CreateTasklistItem | UpdateTasklistItem) => {
    try {
      if (isEditing) {
        onUpdate?.(data as UpdateTasklistItem);
      } else {
        onCreate?.(data as CreateTasklistItem);
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
      console.log(TasklistItem);
      e.preventDefault();
      console.log("HELLO");
      form.onSubmit(handleSubmit)();
      form.reset();
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  console.log(form.errors);
  console.log(isEditing);

  if (!isActive) return null;

  return (
    <form ref={formRef} onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
      <TextInput
        w="100%"
        rightSectionWidth={60}
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

export default UpsertTasklistItem;
