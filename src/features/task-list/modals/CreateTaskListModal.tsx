import { Modal, Textarea, TextInput, Button, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { useParams } from "@tanstack/react-router";
import { useCreateTaskListMutation } from "../shared/task-list.mutations";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { NewTaskListRequest } from "../shared/task-list.types";
import { newTaskListSchema } from "../shared/task-list.schemas";
import { ErrorResponse } from "../../../api/errors/errror.types";

type CreateTaskListModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpened, onClose }: CreateTaskListModalProps) {
  const { categoryName } = useParams({
    from: "/_authenticated/categories/$categoryName",
  });

  const { mutateAsync: createTaskList, isPending } =
    useCreateTaskListMutation(categoryName);
  const { handleFormErrors } = useFormErrorHandler<NewTaskListRequest>();

  const form = useForm({
    validate: zodResolver(newTaskListSchema),
    initialValues: {
      name: "",
      description: "",
    },
  });

  console.log(form.errors);

  const handleSubmit = async (newTaskList: NewTaskListRequest) => {
    try {
      const newTaskListPayload = {
        ...newTaskList,
        categoryName: categoryName,
      };

      const response = await createTaskList(newTaskListPayload);
      console.log(response);
      form.reset();
      onClose();
    } catch (err) {
      handleFormErrors(err as ErrorResponse, form);
    }
  };

  return (
    <Modal opened={isOpened} onClose={onClose} title="Create a new list">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <TextInput
            label="Name"
            placeholder="Enter list name"
            {...form.getInputProps("name")}
          />
          <Textarea
            label="Description"
            placeholder="Enter list description"
            {...form.getInputProps("description")}
          />

          <Button
            type="submit"
            w="100%"
            variant="light"
            color="lime"
            disabled={isPending}
            loading={isPending}
          >
            Create List
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default CreateTaskListModal;
