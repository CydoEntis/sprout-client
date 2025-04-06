import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";

import { useParams } from "@tanstack/react-router";
import { ErrorResponse } from "../../../../api/errors/errror.types";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { useCreateTaskListMutation } from "../../services/task-list/create-task-list.service";
import { useUpdateTaskListMutation } from "../../services/task-list/update-task-list.service";
import { updateTaskListSchema, createTaskListSchema } from "../../shared/tasks.schemas";
import { TaskList, CreateTaskList, UpdateTaskList } from "../../shared/tasks.types";

type UpsertTaskListFormProps = {
  isOpen: boolean;
  onClose: () => void;
  tasklist?: TaskList;
};

const UpsertTaskListForm = ({ onClose, tasklist }: UpsertTaskListFormProps) => {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });
  const createTaskList = useCreateTaskListMutation(categoryName);
  const updateTaskList = useUpdateTaskListMutation(categoryName);
  const { handleFormErrors } = useFormErrorHandler<CreateTaskList | UpdateTaskList>();

  const form = useForm<CreateTaskList | UpdateTaskList>({
    validate: zodResolver(tasklist ? updateTaskListSchema : createTaskListSchema),
    initialValues: tasklist
      ? {
          taskListId: tasklist.id,
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

  const handleSubmit = async (data: CreateTaskList | UpdateTaskList) => {
    try {
      if (tasklist) {
        console.log("Updating: ", data);
        await updateTaskList.mutateAsync(data as UpdateTaskList);
      } else {
        console.log(data);
        await createTaskList.mutateAsync(data as CreateTaskList);
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
        taskListId: tasklist.id,
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
          <Button type="submit" color="lime">
            {tasklist ? "Update Task List" : "Create Task List"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default UpsertTaskListForm;
