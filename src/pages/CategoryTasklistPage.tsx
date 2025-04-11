import { Box, Button, Title, SimpleGrid, Pagination } from "@mantine/core";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";
import LazyHeader from "../lazy-components/header/LazyHeader";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import LazyIcon from "../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../features/category/shared/category.helpers";
import { ValidIconTags } from "../util/types/valid-icon.types";
import { useState } from "react";
import TaskListCard from "../features/task-list/components/task-card/TaskListCard";
import UpsertTaskListModal from "../features/task-list/components/upsert-task-list/UpsertTasklistModal";
import { TaskList, TaskListOverview } from "../features/task-list/shared/tasks.types";
import { Paginated } from "../util/types/shared.types";
import { Category } from "../features/category/shared/category.types";

type CategoryTaskListPageProps = {
  taskLists: Paginated<TaskListOverview>;
  category: Category;
};

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function CategoryTaskListPage({ taskLists, category }: CategoryTaskListPageProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });
  const [
    isUpsertTaskListModalOpened,
    { open: onOpenCreateTaskListWithCategoryModal, close: onCloseUpsertTaskListModal },
  ] = useDisclosure(false);

  const [selectedTaskList, setSelectedTaskList] = useState<undefined | TaskList>(undefined);

  const handleClose = () => {
    setSelectedTaskList(undefined);
    onCloseUpsertTaskListModal();
  };

  const searchParams = useSearch({ from: "/_authenticated/categories/$categoryName" });
  const page = searchParams.page || 1;
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    navigate({
      to: `/categories/${categoryName}`,
      search: { ...searchParams, page: newPage },
    });
  };

  return (
    <Box mt={32}>
      <UpsertTaskListModal isOpen={isUpsertTaskListModalOpened} onClose={handleClose} tasklist={selectedTaskList} />
      <LazyHeader
        leftSection={
          <LazyIcon
            icon={getIconByTag(category.tag as ValidIconTags)}
            size="xl"
            iconColor="white"
            hasBackground
            backgroundColor={category.color}
          />
        }
        rightSection={
          <Button onClick={onOpenCreateTaskListWithCategoryModal} leftSection={<Plus size={20} />} color="lime">
            Task List
          </Button>
        }
      >
        <Title>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Title>
      </LazyHeader>

      {taskLists.items.length > 0 ? (
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} mt={32}>
            {taskLists.items.map((taskList) => (
              <motion.div key={taskList.id} variants={itemVariants}>
                <TaskListCard taskList={taskList} categoryName={categoryName} />
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>
      ) : (
        <Title ta="center" mt={32} c="dimmed">
          No task lists available
        </Title>
      )}
      {taskLists.totalPages > 1 && (
        <Pagination
          color="lime"
          value={page}
          onChange={handlePageChange}
          total={taskLists.totalPages}
          style={{ flexShrink: 0 }}
        />
      )}
    </Box>
  );
}

export default CategoryTaskListPage;
