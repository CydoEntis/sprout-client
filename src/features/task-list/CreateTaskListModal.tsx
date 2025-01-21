import {
  Modal,
  Textarea,
  TextInput,
  Button,
  Group,
  Divider,
  Text,
  Flex,
  ActionIcon,
  Stack,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import CreateNewTask from "../tasks/CreateNewTask";
import { Task } from "../tasks/shared/task.types";
import { taskListSchema } from "./shared/task-list.schemas";
import { Plus } from "lucide-react";

type CreateTaskListModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpened, onClose }: CreateTaskListModalProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const form = useForm({
    validate: zodResolver(taskListSchema),
    initialValues: {
      title: "",
      description: "",
      tasks: [] as Task[],
    },
  });

  const handleAddTask = () => {
    setTasks([{ description: "", category: "" }, ...tasks]);
  };

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
        <Stack gap={16}>
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

          <Button type="submit" w="100%" variant="light" color="lime">
            Create List
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default CreateTaskListModal;
