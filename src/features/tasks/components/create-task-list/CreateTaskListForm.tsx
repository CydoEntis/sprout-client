import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ErrorResponse } from "../../../../api/errors/errror.types";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { useCreateTasklistMutation } from "../../services/task-list/create-task-list.service";
import { createTasklistSchema } from "../../shared/tasks.schemas";
import { CreateTasklist } from "../../shared/tasks.types";

type CreateTasklistFormProps = {
  categoryName: string;
  onClose: () => void;
};

const CreateTasklistForm = ({ categoryName, onClose }: CreateTasklistFormProps) => {
  const createTasklist = useCreateTasklistMutation();
  const { handleFormErrors } = useFormErrorHandler<CreateTasklist>();

  const form = useForm<CreateTasklist>({
    validate: zodResolver(createTasklistSchema),
    initialValues: {
      name: "",
      description: "",
      categoryName: categoryName,
    },
  });

  const handleSubmit = async (data: CreateTasklist) => {
    try {
      await createTasklist.mutateAsync({ ...data, categoryName });
      form.reset();
      onClose();
    } catch (e) {
      handleFormErrors(e as ErrorResponse, form);
    }
  };

  console.log(form.errors);
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
          <Button type="submit" variant="light" color="lime">
            Create Task List
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CreateTasklistForm;
