import { Box, Button, Title, SimpleGrid } from "@mantine/core";
import { Plus } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import LazyHeader from "../lazy-components/header/LazyHeader";
import { useParams } from "@tanstack/react-router";
import LazyIcon from "../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../features/category/shared/category.helpers";
import CreateTasklistWithCategoryModal from "../features/tasks/components/create-task-list/CreateTasklistWithCategoryModal";
import { ValidIconTags } from "../util/types/valid-icon.types";
import { CategoryWithTasklists } from "../features/tasks/shared/tasks.types";
import TasklistCard from "../features/tasks/components/task-card/TasklistCard";

type CategoryTasklistPageProps = {
  categoryTasklists: CategoryWithTasklists;
};

function CategoryTasklistPage({ categoryTasklists }: CategoryTasklistPageProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });
  const [
    isCreateTasklistWithCategoryModalOpened,
    { open: onOpenCreateTasklistWithCategoryModal, close: onCloseCreateTasklistWithCategoryModal },
  ] = useDisclosure(false);

  console.log(categoryTasklists);

  return (
    <Box mt={32}>
      <CreateTasklistWithCategoryModal
        isOpen={isCreateTasklistWithCategoryModalOpened}
        onClose={onCloseCreateTasklistWithCategoryModal}
      />
      <LazyHeader
        leftSection={
          <LazyIcon
            icon={getIconByTag(categoryTasklists.tag as ValidIconTags)}
            size="xl"
            iconColor="white"
            hasBackground
            backgroundColor={categoryTasklists.color}
          />
        }
        rightSection={
          <Button
            onClick={onOpenCreateTasklistWithCategoryModal}
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

      {categoryTasklists.tasklistsInfo.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={32}>
          {categoryTasklists.tasklistsInfo.map((tasklist) => (
            <TasklistCard key={tasklist.id} tasklist={tasklist} categoryName={categoryName} />
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

export default CategoryTasklistPage;
