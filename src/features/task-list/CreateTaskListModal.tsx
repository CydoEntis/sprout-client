import { Modal, Textarea, TextInput, Button, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import CreateNewTask from "../tasks/CreateNewTask";
import { Task } from "../tasks/shared/task.types";
import { taskListSchema } from "./shared/task-list.schemas";


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
    setTasks([...tasks, { description: "", category: "" }]);
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
