import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { useUpdateTasklistMutation } from "../../services/task-list/update-task-list.service";
import { updateTasklistSchema } from "../../shared/tasks.schemas";
import { Tasklist, UpdateTasklist } from "../../shared/tasks.types";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../../../api/errors/errror.types";

type UpdateTasklistFormProps = {
  onClose: () => void;
  tasklist: Tasklist;
  categoryName: string;
};

const UpdateTasklistForm = ({ onClose, tasklist, categoryName }: UpdateTasklistFormProps) => {
  const updateTasklist = useUpdateTasklistMutation(categoryName);
  const { handleFormErrors } = useFormErrorHandler<UpdateTasklist>();

  const form = useForm<UpdateTasklist>({
    validate: zodResolver(updateTasklistSchema),
    initialValues: {
      tasklistId: tasklist.id,
      name: tasklist.name,
      description: tasklist.description,
      categoryName: categoryName,
    },
  });

  const handleSubmit = async (data: UpdateTasklist) => {
    try {
      await updateTasklist.mutateAsync(data);
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

export default UpdateTasklistForm;
