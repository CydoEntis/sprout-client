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
import { newTaskListSchema, taskListSchema } from "./shared/task-list.schemas";
import { Plus } from "lucide-react";
import { TaskList } from "../types/task.types";
import { NewTaskList, NewTaskListRequest } from "./shared/task-list.types";

type CreateTaskListModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpened, onClose }: CreateTaskListModalProps) {

  const form = useForm({
    validate: zodResolver(newTaskListSchema),
    initialValues: {
      title: "",
      description: "",
    },
  });


  const handleSubmit = (newTaskList: NewTaskListRequest) => {
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
