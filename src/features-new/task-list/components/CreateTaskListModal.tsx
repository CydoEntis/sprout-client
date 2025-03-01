import { Button, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useParams } from "@tanstack/react-router";
import { useCreateTaskListMutation } from "../services/create-task-list.service";
import { newTaskListSchema } from "../shared/task-list.schemas";
import { NewTaskListRequest } from "../shared/task-list.types";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../../api/errors/errror.types";

type CreateTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpen, onClose }: CreateTaskListModalProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });
  const createTaskList = useCreateTaskListMutation(categoryName ?? "");
  const { handleFormErrors } = useFormErrorHandler<NewTaskListRequest>();

  const form = useForm<NewTaskListRequest>({
    validate: zodResolver(newTaskListSchema),
    initialValues: {
      name: "",
      description: "",
      categoryName: categoryName,
    },
  });

  console.log(form.errors);

  const handleSubmit = async (data: NewTaskListRequest) => {
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
