import { createFileRoute } from "@tanstack/react-router";
import CreateCategoryForm from "../../../features/category/components/CreateCategoryForm";
import { Box, Paper, Stepper } from "@mantine/core";
import { useState } from "react";
import CreateTaskListForm from "../../../features/tasks/components/task-list/CreateTaskListForm";
import CreateTaskListItemsForm from "../../../features/tasks/components/task-list-item/CreateTaskListItemsForm";

export const Route = createFileRoute("/_authenticated/categories/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [active, setActive] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [taskListId, setTaskListId] = useState<number>(15);

  return (
    <Paper withBorder bg="card" p={32}>
      <Stepper color="lime" active={active} onStepClick={setActive}>
        <Stepper.Step label="Step 1" description="Create a category">
          <Box maw={500}>
            <CreateCategoryForm setCategoryName={setCategoryName} />
          </Box>
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Create a task list">
          <CreateTaskListForm categoryName={categoryName} />
        </Stepper.Step>
        <Stepper.Step label="Step 4" description="Add items">
          <CreateTaskListItemsForm taskListId={taskListId} />
        </Stepper.Step>
        <Stepper.Step label="Step 3" description="Invite Members">
          <p>Invite Members</p>
        </Stepper.Step>
      </Stepper>
    </Paper>
  );
}
