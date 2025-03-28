import { Box, Button, Title, SimpleGrid } from "@mantine/core";
import { Plus } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { TasklistOverview } from "../features/tasks/shared/tasks.types";
import TaskListCard from "../features/tasks/components/task-card/TaskListCard";
import LazyHeader from "../lazy-components/header/LazyHeader";
import { useParams } from "@tanstack/react-router";
import LazyIcon from "../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../features/category/shared/category.helpers";
import CreateTaskListWithCategoryModal from "../features/tasks/components/create-task-list/CreateTaskListWithCategoryModal";
import { ValidIconTags } from "../util/types/valid-icon.types";

type TaskListPage = {
  taskLists: TasklistOverview[];
};

function TaskListPage({ taskLists }: TaskListPage) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });
  const [
    isCreateTaskListWithCategoryModalOpened,
    { open: onOpenCreateTaskListWithCategoryModal, close: onCloseCreateTaskListWithCategoryModal },
  ] = useDisclosure(false);

  const categoryDetails = taskLists[0].categoryDetails;
  console.log("Test: ", taskLists[0]); // works
  console.log("Test: ", taskLists[0].categoryDetails); // doesnt work

  const filteredTaskLists = taskLists.filter((taskList) => taskList.taskListDetails);

  return (
    <Box mt={32}>
      <CreateTaskListWithCategoryModal
        isOpen={isCreateTaskListWithCategoryModalOpened}
        onClose={onCloseCreateTaskListWithCategoryModal}
      />
      <LazyHeader
        leftSection={
          <LazyIcon
            icon={getIconByTag(categoryDetails.tag as ValidIconTags)}
            size="xl"
            iconColor="white"
            hasBackground
            backgroundColor={categoryDetails.color}
          />
        }
        rightSection={
          <Button
            onClick={onOpenCreateTaskListWithCategoryModal}
            variant="light"
            leftSection={<Plus size={20} />}
            color="lime"
          >
            Task List
          </Button>
        }
      >
        <Title>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Title>
      </LazyHeader>

      {/* Only render the grid if there are valid task lists */}
      {filteredTaskLists.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={32}>
          {filteredTaskLists.map((taskList) => (
            <TaskListCard key={taskList.taskListDetails.id} taskList={taskList} />
          ))}
        </SimpleGrid>
      ) : (
        <Title ta="center" mt={32} c="dimmed">
          No task lists available
        </Title>
      )}
    </Box>
  );
}

export default TaskListPage;
