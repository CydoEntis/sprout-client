import { Button, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { ErrorResponse } from "../../../api/errors/errror.types";
import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { useCreateTaskListMutation } from "../services/create-task-list.service";
import { newTaskListSchema, updateTaskListSchema } from "../shared/task-list.schemas";
import { NewTaskListRequest, UpdateTaskListRequest } from "../shared/task-list.types";
import { useUpdateTaskListMutation } from "../services/update-task-list.service";

type UpsertTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  taskList?: UpdateTaskListRequest;
};

function UpsertTaskListModal({ isOpen, onClose, taskList }: UpsertTaskListModalProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const createTaskList = useCreateTaskListMutation(categoryName);
  const updateTaskList = useUpdateTaskListMutation(categoryName);
  const { handleFormErrors } = useFormErrorHandler<NewTaskListRequest | UpdateTaskListRequest>();
  const isEditing = !!taskList;

  const form = useForm<NewTaskListRequest | UpdateTaskListRequest>({
    validate: zodResolver(isEditing ? updateTaskListSchema : newTaskListSchema),
    initialValues: {
      id: taskList ? taskList.id : undefined,
      name: taskList ? taskList.name : "",
      description: taskList ? taskList.description : "",
    },
  });

  useEffect(() => {
    if (taskList) {
      form.setValues({ id: taskList.id, name: taskList.name, description: taskList.description });
    } else {
      form.setValues({ name: "", description: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList]);

  const handleSubmit = async (data: NewTaskListRequest | UpdateTaskListRequest) => {
    try {
      if (isEditing) {
        await updateTaskList.mutateAsync(data as UpdateTaskListRequest);
      } else {
        await createTaskList.mutateAsync({ ...data, name: categoryName });
      }
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
    <Modal opened={isOpen} onClose={handleClose} title={isEditing ? "Update Task List" : "Create a New Task List"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={16}>
          <TextInput label="Name" placeholder="Enter list name" {...form.getInputProps("name")} />
          <Textarea label="Description" placeholder="Enter list description" {...form.getInputProps("description")} />
          <Button type="submit" w="100%" variant="light" color="lime">
            {isEditing ? "Update Task List" : "Create Task List"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default UpsertTaskListModal;
