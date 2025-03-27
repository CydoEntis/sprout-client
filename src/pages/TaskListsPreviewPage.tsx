import { Box, Button, Title, SimpleGrid } from "@mantine/core";
import { Plus } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { TaskListPreview } from "../features/tasks/shared/tasks.types";
import TaskListCard from "../features/tasks/components/task-card/TaskListCard";
import LazyHeader from "../lazy-components/header/LazyHeader";
import { useParams } from "@tanstack/react-router";
import LazyIcon from "../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../features/category/shared/category.helpers";
import CreateTaskListWithCategoryModal from "../features/tasks/components/create-task-list/CreateTaskListWithCategoryModal";

type TaskListPage = {
  taskLists: TaskListPreview[];
};

function TaskListPage({ taskLists }: TaskListPage) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });
  const [
    isCreateTaskListWithCategoryModalOpened,
    { open: onOpenCreateTaskListWithCategoryModal, close: onCloseCreateTaskListWithCategoryModal },
  ] = useDisclosure(false);

  const categoryDetails = taskLists[0].categoryDetail;

  return (
    <Box mt={32}>
      <CreateTaskListWithCategoryModal
        isOpen={isCreateTaskListWithCategoryModalOpened}
        onClose={onCloseCreateTaskListWithCategoryModal}
      />
      <LazyHeader
        leftSection={
          <LazyIcon
            icon={getIconByTag(categoryDetails.tag)}
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
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={32}>
        {taskLists.map((taskList) => (
          <TaskListCard key={taskList.id} taskList={taskList} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default TaskListPage;
