import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ErrorResponse } from "../../../../api/errors/errror.types";
import useFormErrorHandler from "../../../../hooks/useFormErrorHandler";
import { useCreateTaskListMutation } from "../../services/task-list/create-task-list.service";
import { createTaskListSchema } from "../../shared/tasks.schemas";
import { CreateTaskList } from "../../shared/tasks.types";
import { CustomLink } from "../../../../components/CustomLink";

type CreateTaskListFormProps = {
  categoryName: string;
  setTaskListId: (id: number) => void;
  goToNextStep: () => void;
};

const CreateTaskListForm = ({ categoryName, setTaskListId, goToNextStep }: CreateTaskListFormProps) => {
  const createTaskList = useCreateTaskListMutation();
  const { handleFormErrors } = useFormErrorHandler<CreateTaskList>();

  const form = useForm<CreateTaskList>({
    validate: zodResolver(createTaskListSchema),
    initialValues: {
      name: "",
      description: "",
      // categoryName: categoryName,
      categoryName: "shopping",
    },
  });

  const handleSubmit = async (data: CreateTaskList) => {
    console.log("CLICKING");
    console.log(data.categoryName);
    // try {
    // const response = await createTaskList.mutateAsync({ ...data, categoryName });
    // setTaskListId(response.taskList.id);
    // form.reset();
    // goToNextStep();
    // } catch (e) {
    //   handleFormErrors(e as ErrorResponse, form);
    // }
    goToNextStep();
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

export default CreateTaskListForm;
