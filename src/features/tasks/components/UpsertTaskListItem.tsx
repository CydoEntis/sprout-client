import { useEffect, useRef } from "react";
import { ActionIcon, ActionIconGroup, TextInput } from "@mantine/core";
import { Check, X } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { CreateTasklistItem, TasklistItem, UpdateTasklistItem } from "../shared/tasks.types";
import { createTasklistItemSchema, updateTasklistItemSchema } from "../shared/tasks.schemas";

type UpsertTasklistItemProps = {
  isActive: boolean;
  tasklistId: number;
  tasklistItem?: TasklistItem;
  onClose: () => void;
  onUpdate?: (updatedItem: UpdateTasklistItem) => void;
  onCreate?: (newItem: CreateTasklistItem) => void;
};

function UpsertTasklistItem({
  isActive,
  tasklistId,
  tasklistItem,
  onClose,
  onUpdate,
  onCreate,
}: UpsertTasklistItemProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = Boolean(tasklistItem);

  const form = useForm({
    initialValues: {
      id: tasklistItem?.id ?? null,
      description: tasklistItem?.description ?? "",
      isCompleted: tasklistItem?.isCompleted ?? false,
      tasklistId: tasklistId,
      position: tasklistItem?.position ?? 0,
    },
    validate: zodResolver(isEditing ? updateTasklistItemSchema : createTasklistItemSchema),
  });

  useEffect(() => {
    if (tasklistItem) {
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
      console.log(tasklistItem);
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
