import { useState } from "react";
import { ActionIcon, ActionIconGroup, TextInput, Button, List } from "@mantine/core";
import { Check, Edit, Trash } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { createTaskListItemSchema } from "../../shared/tasks.schemas";
import { CreateTaskListItem } from "../../shared/tasks.types";
import { useCreateTaskListItemMutation } from "../../services/task-list-items/create-task-list-item.service";

type CreateTaskListItemsFormProps = {
  taskListId: number;
};

function CreateTaskListItemsForm({ taskListId }: CreateTaskListItemsFormProps) {
  const [taskListItems, setTaskListItems] = useState<CreateTaskListItem[]>([]);
  const form = useForm({
    initialValues: {
      description: "",
      taskListId: taskListId,
    },
    validate: zodResolver(createTaskListItemSchema),
  });

  const createTaskListItem = useCreateTaskListItemMutation();

  const handleSubmit = async () => {
    // Submit the entire list at once
    for (const item of taskListItems) {
      try {
        await createTaskListItem.mutateAsync(item);
      } catch (error) {
        console.error("Error submitting task:", error);
      }
    }
    setTaskListItems([]); // Clear the list after submission
    form.reset();
  };

  const handleAddItem = () => {
    const newItem: CreateTaskListItem = {
      description: form.values.description,
      taskListId: taskListId,
    };
    setTaskListItems((prev) => [...prev, newItem]);
    form.reset(); // Clear the form after adding the item
  };

  const handleDeleteItem = (index: number) => {
    setTaskListItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditItem = (index: number, newDescription: string) => {
    const updatedItems = [...taskListItems];
    updatedItems[index].description = newDescription;
    setTaskListItems(updatedItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    } else if (e.key === "Escape") {
      form.reset();
    }
  };

  return (
    <div>
      <form style={{ width: "100%" }}>
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
        />
        <ActionIconGroup>
          <ActionIcon variant="light" color="lime" onClick={handleAddItem}>
            <Check size={20} />
          </ActionIcon>
        </ActionIconGroup>
      </form>

      {/* Task List */}
      <List spacing="xs" size="sm">
        {taskListItems.map((item, index) => (
          <List.Item key={index}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{item.description}</span>
              <ActionIconGroup>
                <ActionIcon
                  variant="light"
                  color="blue"
                  onClick={() => {
                    const newDescription = prompt("Edit Task", item.description);
                    if (newDescription) handleEditItem(index, newDescription);
                  }}
                >
                  <Edit size={20} />
                </ActionIcon>
                <ActionIcon variant="light" color="red" onClick={() => handleDeleteItem(index)}>
                  <Trash size={20} />
                </ActionIcon>
              </ActionIconGroup>
            </div>
          </List.Item>
        ))}
      </List>

      {/* Submit Button */}
      <Button onClick={handleSubmit} fullWidth>
        Submit All Tasks
      </Button>
    </div>
  );
}

export default CreateTaskListItemsForm;
