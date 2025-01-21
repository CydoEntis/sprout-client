import { Modal, Textarea, TextInput, Button, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useState } from "react";
import CreateNewTask from "../tasks/CreateNewTask";
import { Task } from "../tasks/shared/task.types";

// Schema for task list validation
const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(25, "Title must be at most 25 characters long."),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long.")
    .max(100, "Description must be at most 100 characters long."),
  tasks: z
    .array(
      z.object({
        task: z.string().min(1, "Task description cannot be empty."),
        category: z.string().min(1, "Category cannot be empty."),
      })
    )
    .min(1, "At least one task must be added."),
});

type CreateTaskListModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpened, onClose }: CreateTaskListModalProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const form = useForm({
    validate: zodResolver(taskSchema),
    initialValues: {
      title: "",
      description: "",
      tasks: [] as Task[],
    },
  });

  // Handle adding a new task
  const handleAddTask = () => {
    setTasks([...tasks, { description: "", category: "" }]);
  };

  // Handle updating task fields
  const handleTaskChange = (
    index: number,
    field: keyof Task,
    value: string
  ) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
    form.setFieldValue("tasks", updatedTasks);
  };

  // Handle removing a task
  const handleRemoveTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    form.setFieldValue("tasks", updatedTasks);
  };

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form submitted with values:", values);
    onClose();
  };

  return (
    <Modal opened={isOpened} onClose={onClose} title="Create a new list">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter list title"
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Description"
          placeholder="Enter list description"
          {...form.getInputProps("description")}
        />

        {/* Tasks Section */}
        {tasks.map((task, index) => (
          <CreateNewTask
            index={index}
            key={index}
            task={task}
            handleTaskChange={handleTaskChange}
            handleRemoveTask={handleRemoveTask}
          />
        ))}

        <Button mt="md" onClick={handleAddTask}>
          + Add Task
        </Button>

        <Group justify="right" mt="md">
          <Button type="submit">Create List</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default CreateTaskListModal;
