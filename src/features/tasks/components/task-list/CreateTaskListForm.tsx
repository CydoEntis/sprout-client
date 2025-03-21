import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ErrorResponse } from "../../../../api/errors/errror.types";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { useCreateTaskListMutation } from "../../services/task-list/create-task-list.service";
import { createTaskListSchema } from "../../shared/tasks.schemas";
import { CreateTaskList } from "../../shared/tasks.types";

type CreateTaskListFormProps = {
  categoryName: string;
};

const CreateTaskListForm = ({ categoryName }: CreateTaskListFormProps) => {
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

  const handleSubmit = async (data: CreateTaskList) => {
    try {
      await createTaskList.mutateAsync({ ...data, categoryName });
      form.reset();
    } catch (e) {
      handleFormErrors(e as ErrorResponse, form);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        <TextInput label="Name" placeholder="Enter list name" {...form.getInputProps("name")} />
        <Textarea label="Description" placeholder="Enter list description" {...form.getInputProps("description")} />
        <Button type="submit" w="100%" variant="light" color="lime">
          Create Task List
        </Button>
      </Stack>
    </form>
  );
};

export default CreateTaskListForm;
