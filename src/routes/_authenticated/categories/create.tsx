import { createFileRoute } from "@tanstack/react-router";
import CreateCategoryForm from "../../../features/category/components/CreateCategoryForm";
import { Accordion, Button, Group, Stack, Tooltip, Text, Flex, Divider, Title } from "@mantine/core";
import { useState } from "react";
import CreateTaskListForm from "../../../features/tasks/components/task-list/CreateTaskListForm";
import CreateTaskListItemsForm from "../../../features/tasks/components/task-list-item/CreateTaskListItemsForm";
import { CustomLink } from "../../../components/CustomLink";
import { Grid2x2Plus, ListPlus, ListTodo } from "lucide-react";

export const Route = createFileRoute("/_authenticated/categories/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState("create-category"); // Controls open panel
  const [categoryName, setCategoryName] = useState("");
  const [taskListId, setTaskListId] = useState<number>(0);

  const steps = ["create-category", "create-task-list", "add-task-list-items", "add-members"];

  const goToNextStep = () => {
    if (active < steps.length - 1) {
      setActive((prev) => prev + 1);
      setOpened(steps[active + 1]); // Move to the next accordion item
    }
  };

  return (
    <Accordion variant="separated" value={opened}>
      {/* Step 1: Create Category */}
      <Accordion.Item value="create-category">
        <Accordion.Control disabled={active > 0}>
          <Group gap={8} align="center">
            <Grid2x2Plus />
            <Title size="md">Create a new category</Title>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <CreateCategoryForm setCategoryName={setCategoryName} goToNextStep={goToNextStep} />
          <CustomLink to={"/categories"} ta="center">
            <Text c="dimmed" td="underline">
              I changed my mind, take my back my categories
            </Text>
          </CustomLink>
        </Accordion.Panel>
      </Accordion.Item>

      {/* Step 2: Create Task List */}
      <Accordion.Item value="create-task-list">
        <Accordion.Control disabled={active > 1}>
          <Group gap={8} align="center">
            <ListPlus />
            <Title size="md">Add a task list to your new category</Title>
            <Text fs="italic" size="xs">
              (Optional)
            </Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <CreateTaskListForm categoryName={categoryName} setTaskListId={setTaskListId} goToNextStep={goToNextStep} />
          <CustomLink to={"/categories"} ta="center">
            <Text c="dimmed" td="underline">
              Create a task list later
            </Text>
          </CustomLink>
        </Accordion.Panel>
      </Accordion.Item>

      {/* Step 3: Create Task List Items */}
      <Accordion.Item value="add-task-list-items">
        <Accordion.Control>
          <Group gap={8} align="center">
            <ListTodo />
            <Title size="md">Add task items to your new task list</Title>
            <Text fs="italic" size="xs">
              (Optional)
            </Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <CreateTaskListItemsForm taskListId={taskListId} goToNextStep={goToNextStep} />
          <CustomLink to={"/categories"} ta="center" size="sm">
            <Text c="dimmed" td="underline">
              Skip to inviting members?
            </Text>
          </CustomLink>
        </Accordion.Panel>
      </Accordion.Item>

      {/* Step 4: Add Members */}

      {/* <Accordion.Item value="add-members">
              <Accordion.Control>Invite Members</Accordion.Control>
              <Accordion.Panel>
                <Stack gap={24}>
                  <Group justify="end" align="center" gap={8} w="100%">
                    <Button variant="outline" color="grey" onClick={goToNextStep}>
                      Skip
                    </Button>
                    <Button onClick={goToNextStep} fullWidth variant="light" color="lime" w="20%">
                      Add Task Items
                    </Button>
                  </Group>
                  <CustomLink to={"/categories"} ta="center">
                    <Text c="dimmed" td="underline">
                      Finish and go to your new Task List
                    </Text>
                  </CustomLink>
                </Stack>
                <Group justify="end" gap={8}>
                  <CustomLink to={"/categories"}>
                    <Text c="dimmed" td="underline">
                      Add Items Later
                    </Text>
                  </CustomLink>
                </Group>
              </Accordion.Panel>
            </Accordion.Item> */}
    </Accordion>
  );
}
