import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { useCreateTasklistMutation } from "../../services/task-list/create-task-list.service";
import { createTasklistSchema, updateTasklistSchema } from "../../shared/tasks.schemas";
import { CreateTasklist, Tasklist, UpdateTasklist } from "../../shared/tasks.types";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../../../api/errors/errror.types";
import { useUpdateTasklistMutation } from "../../services/task-list/update-task-list.service";
import { useParams } from "@tanstack/react-router";

type UpsertTasklistFormProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklist?: Tasklist;
};

const UpsertTasklistForm = ({ onClose, tasklist }: UpsertTasklistFormProps) => {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });
  const createTasklist = useCreateTasklistMutation();
  const updateTasklist = useUpdateTasklistMutation();
  const { handleFormErrors } = useFormErrorHandler<CreateTasklist | UpdateTasklist>();

  const form = useForm<CreateTasklist | UpdateTasklist>({
    validate: zodResolver(tasklist ? updateTasklistSchema : createTasklistSchema),
    initialValues: tasklist
      ? {
          id: tasklist.id,
          name: tasklist.name,
          description: tasklist.description,
          categoryName: categoryName,
        }
      : {
          name: "",
          description: "",
          categoryName,
        },
  });

  const handleSubmit = async (data: CreateTasklist | UpdateTasklist) => {
    try {
      if (tasklist) {
        await updateTasklist.mutateAsync(data as UpdateTasklist);
      } else {
        await createTasklist.mutateAsync(data as CreateTasklist);
      }
      form.reset();
      onClose();
    } catch (e) {
      handleFormErrors(e as ErrorResponse, form);
    }
  };

  useEffect(() => {
    if (tasklist) {
      form.setValues({
        id: tasklist.id,
        name: tasklist.name,
        description: tasklist.description,
        categoryName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasklist]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        <TextInput
          classNames={{
            input: "input",
          }}
          label="Name"
          placeholder="Enter list name"
          {...form.getInputProps("name")}
        />
        <Textarea
          classNames={{
            input: "input",
          }}
          label="Description"
          placeholder="Enter list description"
          {...form.getInputProps("description")}
        />
        <Group gap={8} justify="end">
          <Button type="submit"  color="lime">
            {tasklist ? "Update Task List" : "Create Task List"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default UpsertTasklistForm;
