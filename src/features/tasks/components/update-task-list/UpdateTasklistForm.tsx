import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { useUpdateTaskListMutation } from "../../services/task-list/update-task-list.service";
import { updateTaskListSchema } from "../../shared/tasks.schemas";
import { TaskList, UpdateTaskList } from "../../shared/tasks.types";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../../../api/errors/errror.types";

type UpdateTaskListFormProps = {
  onClose: () => void;
  tasklist: TaskList;
  categoryName: string;
};

const UpdateTaskListForm = ({ onClose, tasklist, categoryName }: UpdateTaskListFormProps) => {
  const updateTaskList = useUpdateTaskListMutation(categoryName);
  const { handleFormErrors } = useFormErrorHandler<UpdateTaskList>();

  const form = useForm<UpdateTaskList>({
    validate: zodResolver(updateTaskListSchema),
    initialValues: {
      tasklistId: tasklist.id,
      name: tasklist.name,
      description: tasklist.description,
      categoryName: categoryName,
    },
  });

  const handleSubmit = async (data: UpdateTaskList) => {
    try {
      await updateTaskList.mutateAsync(data);
      form.reset();
      onClose();
    } catch (e) {
      handleFormErrors(e as ErrorResponse, form);
    }
  };

  useEffect(() => {
    if (tasklist) {
      form.setValues({
        tasklistId: tasklist.id,
        name: tasklist.name,
        description: tasklist.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasklist]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        <TextInput label="Name" placeholder="Enter list name" {...form.getInputProps("name")} />
        <Textarea label="Description" placeholder="Enter list description" {...form.getInputProps("description")} />
        <Group gap={8} justify="end">
          <Button type="submit" color="lime">
            Update Task List
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default UpdateTaskListForm;
