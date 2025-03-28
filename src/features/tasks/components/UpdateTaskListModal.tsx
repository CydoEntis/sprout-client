import { Button, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useUpdateTasklistMutation } from "../services/task-list/update-task-list.service";
import { updateTasklistSchema } from "../shared/tasks.schemas";
import { Tasklist, UpdateTasklist } from "../shared/tasks.types";
import { useEffect } from "react";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../../api/errors/errror.types";

type UpdateTasklistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  Tasklist: Tasklist;
};

function UpdateTasklistModal({ isOpen, onClose, Tasklist }: UpdateTasklistModalProps) {
  const updateTasklist = useUpdateTasklistMutation();

  // TODO: FIX
  const { handleFormErrors } = useFormErrorHandler<UpdateTasklist>();

  const form = useForm<UpdateTasklist>({
    validate: zodResolver(updateTasklistSchema),
    initialValues: {
      id: Tasklist.id,
      name: Tasklist.name,
      description: Tasklist.description,
      categoryName: Tasklist.categoryName,
    },
  });

  useEffect(() => {
    form.setValues({ id: Tasklist.id, name: Tasklist.name, description: Tasklist.description });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Tasklist]);

  const handleSubmit = async (data: UpdateTasklist) => {
    try {
      console.log(data);
      await updateTasklist.mutateAsync(data);
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

  //TODO: Update this to have a category drop down, so user can change category.
  return (
    <Modal opened={isOpen} onClose={handleClose} title="Update Task List">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <TextInput label="Name" placeholder="Enter list name" {...form.getInputProps("name")} />
          <Textarea label="Description" placeholder="Enter list description" {...form.getInputProps("description")} />
          <TextInput label="Category" placeholder="Category name" {...form.getInputProps("categoryName")} disabled />
          <Button type="submit" w="100%" variant="light" color="lime">
            Update Task List
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default UpdateTasklistModal;
