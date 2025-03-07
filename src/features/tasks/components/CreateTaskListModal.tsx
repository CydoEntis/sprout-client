import { Button, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useParams } from "@tanstack/react-router";
import { useCreateTaskListMutation } from "../services/task-list/create-task-list.service";

import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../../api/errors/errror.types";
import { CreateTaskList } from "../shared/tasks.types";
import { createTaskListSchema } from "../shared/tasks.schemas";

type CreateTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpen, onClose }: CreateTaskListModalProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });
  const createTaskList = useCreateTaskListMutation();
  const { handleFormErrors } = useFormErrorHandler<CreateTaskList>();

  const form = useForm<CreateTaskList>({
    validate: zodResolver(createTaskListSchema),
    initialValues: {
      name: "",
      description: "",
      categoryName: categoryName,
    },
  });

  console.log(form.errors);

  const handleSubmit = async (data: CreateTaskList) => {
    try {
      console.log(data);

      await createTaskList.mutateAsync({ ...data, categoryName: categoryName });
      form.reset();
      onClose();
    } catch (e) {
      handleFormErrors(e as ErrorResponse, form);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={handleClose} title="Create a New Task List">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <TextInput label="Name" placeholder="Enter list name" {...form.getInputProps("name")} />
          <Textarea label="Description" placeholder="Enter list description" {...form.getInputProps("description")} />
          <TextInput label="Category" placeholder="Category name" {...form.getInputProps("categoryName")} disabled />
          <Button type="submit" w="100%" variant="light" color="lime">
            Create Task List
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default CreateTaskListModal;
