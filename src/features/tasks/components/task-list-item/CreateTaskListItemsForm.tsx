import { useState } from "react";
import {
  ActionIcon,
  ActionIconGroup,
  TextInput,
  Button,
  Paper,
  Flex,
  Group,
  Text,
  Stack,
  Divider,
} from "@mantine/core";
import { Check, Edit, Plus, Trash, X } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { createTaskListItemSchema } from "../../shared/tasks.schemas";
import { CreateTaskListItem } from "../../shared/tasks.types";
import { useCreateTaskListItemsMutation } from "../../services/task-list-items/create-task-list-items.service";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../../../api/errors/errror.types";

type CreateTaskListItemsFormProps = {
  taskListId: number;
};

function CreateTaskListItemsForm({ taskListId }: CreateTaskListItemsFormProps) {
  const [taskListItems, setTaskListItems] = useState<CreateTaskListItem[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editErrors, setEditErrors] = useState<{ [key: number]: string }>({});
  const { handleFormErrors } = useFormErrorHandler<CreateTaskListItem>();

  const form = useForm<CreateTaskListItem>({
    initialValues: {
      description: "",
      taskListId: taskListId,
    },
    validate: zodResolver(createTaskListItemSchema),
  });

  const createTaskListItems = useCreateTaskListItemsMutation();

  const handleSubmit = async () => {
    try {
      await createTaskListItems.mutateAsync({
        taskListId,
        newTaskListItems: taskListItems,
      });
      setTaskListItems([]);
      form.reset();
      setNewTaskDescription("");
    } catch (e) {
      const error = e as ErrorResponse;
      console.log(error);
      handleFormErrors(error, form);
    }
  };

  const handleAddItem = () => {
    if (newTaskDescription.trim() === "") {
      form.setFieldError("description", "Task description cannot be empty");
      return;
    } else {
      form.clearErrors();
    }

    if (newTaskDescription.length > 250) {
      form.setFieldError("description", "Task description cannot exceed 250 characters");
      return;
    } else {
      form.clearErrors();
    }

    const newItem: CreateTaskListItem = {
      description: newTaskDescription,
      taskListId: taskListId,
    };
    setTaskListItems((prev) => [...prev, newItem]);
    setNewTaskDescription("");
  };

  const handleDeleteItem = (index: number) => {
    setTaskListItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditItem = (index: number) => {
    setIsEditing(index);
    form.setValues({ description: taskListItems[index].description });
    setEditErrors((prev) => ({ ...prev, [index]: "" }));
  };

  const handleSaveEdit = () => {
    if (isEditing !== null) {
      const description = form.values.description.trim();

      if (description === "") {
        setEditErrors((prev) => ({ ...prev, [isEditing]: "Task description cannot be empty" }));
        return;
      }

      if (description.length > 250) {
        setEditErrors((prev) => ({ ...prev, [isEditing]: "Task description cannot exceed 250 characters" }));
        return;
      }

      const updatedItems = [...taskListItems];
      updatedItems[isEditing].description = description;
      setTaskListItems(updatedItems);

      setIsEditing(null);
      setEditErrors((prev) => ({ ...prev, [isEditing!]: "" }));
    }
  };

  const handleCancelEdit = () => {
    if (isEditing !== null) {
      setIsEditing(null);
      form.setValues({ description: "" });
      setEditErrors((prev) => ({ ...prev, [isEditing!]: "" }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isEditing !== null) {
        handleSaveEdit();
      } else {
        handleAddItem();
      }
    } else if (e.key === "Escape") {
      if (isEditing !== null) {
        handleCancelEdit();
      } else {
        if (newTaskDescription !== "") {
          setNewTaskDescription("");
        }
      }
    }
  };

  return (
    <div>
      <form style={{ width: "100%" }}>
        <TextInput
          label="Add Task List Item"
          w="100%"
          mb={8}
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          classNames={{ input: "input" }}
          autoFocus
          onKeyDown={handleKeyDown}
          placeholder="Describe Task"
          rightSection={
            <ActionIconGroup>
              <ActionIcon variant="light" color="lime" onClick={handleAddItem}>
                <Plus size={20} />
              </ActionIcon>
            </ActionIconGroup>
          }
          error={form.errors.description}
          onFocus={() => form.clearErrors()}
        />
      </form>

      <Divider label="Task List Items" labelPosition="center" my={16} />
      {taskListItems.length === 0 ? (
        <Text my={16} size="sm" c="dimmed" ta="center">
          You haven't added any items yet.
        </Text>
      ) : (
        <Stack gap={8}>
          {taskListItems.map((item, index) => (
            <div key={index}>
              {isEditing === index ? (
                <TextInput
                  w="100%"
                  classNames={{ input: "input" }}
                  value={form.values.description}
                  onChange={(e) => {
                    form.setValues({ description: e.target.value });
                    setEditErrors((prev) => ({ ...prev, [index]: "" }));
                  }}
                  onBlur={handleSaveEdit}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  rightSectionWidth={65}
                  rightSection={
                    <Group gap={4}>
                      <ActionIcon variant="light" color="lime" onClick={handleSaveEdit}>
                        <Check size={20} />
                      </ActionIcon>
                      <ActionIcon variant="light" color="red" onClick={handleCancelEdit}>
                        <X size={20} />
                      </ActionIcon>
                    </Group>
                  }
                  onFocus={() => setEditErrors((prev) => ({ ...prev, [index]: "" }))}
                  error={editErrors[index]}
                />
              ) : (
                <Paper withBorder px={8} py={4} bg="item" onDoubleClick={() => handleEditItem(index)}>
                  <Flex justify="space-between" align="center">
                    <Text size="sm">{item.description}</Text>
                    <Group gap={4}>
                      <ActionIcon variant="light" color="lime" onClick={() => handleEditItem(index)}>
                        <Edit size={20} />
                      </ActionIcon>
                      <ActionIcon variant="light" color="red" onClick={() => handleDeleteItem(index)}>
                        <Trash size={20} />
                      </ActionIcon>
                    </Group>
                  </Flex>
                </Paper>
              )}
            </div>
          ))}
        </Stack>
      )}

      <Button mt={8} onClick={handleSubmit} fullWidth variant="light" color="lime">
        Add Task Items
      </Button>
    </div>
  );
}

export default CreateTaskListItemsForm;
