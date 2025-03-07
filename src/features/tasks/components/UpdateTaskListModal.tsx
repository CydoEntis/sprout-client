import { Button, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useUpdateTaskListMutation } from "../services/update-task-list.service";
import { updateTaskListSchema } from "../shared/task-list.schemas";
import { UpdateTaskListRequest } from "../shared/task-list.types";
import { useEffect } from "react";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../../api/errors/errror.types";

type UpdateTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  taskList: UpdateTaskListRequest;
};

function UpdateTaskListModal({ isOpen, onClose, taskList }: UpdateTaskListModalProps) {
  const updateTaskList = useUpdateTaskListMutation();

  // TODO: FIX
  const { handleFormErrors } = useFormErrorHandler<UpdateTaskListRequest>();

  const form = useForm<UpdateTaskListRequest>({
    validate: zodResolver(updateTaskListSchema),
    initialValues: {
      taskListId: taskList.taskListId,
      name: taskList.name,
      description: taskList.description,
      categoryName: taskList.categoryName,
    },
  });

  useEffect(() => {
    form.setValues({ taskListId: taskList.taskListId, name: taskList.name, description: taskList.description });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList]);

  const handleSubmit = async (data: UpdateTaskListRequest) => {
    try {
      console.log(data);
      await updateTaskList.mutateAsync(data);
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

export default UpdateTaskListModal;
