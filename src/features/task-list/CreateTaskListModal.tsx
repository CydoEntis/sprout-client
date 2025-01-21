import {
  Modal,
  Textarea,
  TextInput,
  Button,
  Select,
  Group,
  ActionIcon,
  Stack,
  Flex,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useState } from "react";
import { Trash2 } from "lucide-react";

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

type TaskType = {
  task: string;
  category: string;
};

type CreateTaskListModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpened, onClose }: CreateTaskListModalProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const form = useForm({
    validate: zodResolver(taskSchema),
    initialValues: {
      title: "",
      description: "",
      tasks: [] as TaskType[],
    },
  });

  // Handle adding a new task
  const handleAddTask = () => {
    setTasks([...tasks, { task: "", category: "" }]);
  };

  // Handle updating task fields
  const handleTaskChange = (
    index: number,
    field: keyof TaskType,
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
        {/* Tasks Section */}
        {tasks.map((task, index) => (
          <Flex
            key={index}
            mt="sm"
            w="100%"
            gap="sm"
            align="flex-start"
            direction={{ base: "column", sm: "row" }} // Stacks on small screens, row on larger
            wrap="wrap"
          >
            <TextInput
              w={{ base: "100%", sm: "50%" }} // Full width on mobile, half on larger screens
              placeholder="Task name"
              value={task.task}
              onChange={(e) => handleTaskChange(index, "task", e.target.value)}
            />
            <Flex
              w={{ base: "100%", sm: "45%" }} // Full width on mobile, shrinks on desktop
              align="center"
              gap="sm"
            >
              <Select
                placeholder="Select category"
                data={["Work", "Personal", "Urgent"]}
                value={task.category}
                onChange={(value) =>
                  handleTaskChange(index, "category", value || "")
                }
                w="100%"
              />
              <ActionIcon
                variant="light"
                color="red"
                size="lg"
                onClick={() => handleRemoveTask(index)}
              >
                <Trash2 size={16} />
              </ActionIcon>
            </Flex>
          </Flex>
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
