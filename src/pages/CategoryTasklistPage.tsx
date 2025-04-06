import { Box, Button, Title, SimpleGrid } from "@mantine/core";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";
import LazyHeader from "../lazy-components/header/LazyHeader";
import { useParams } from "@tanstack/react-router";
import LazyIcon from "../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../features/category/shared/category.helpers";
import { ValidIconTags } from "../util/types/valid-icon.types";
import { useState } from "react";
import TaskListCard from "../features/task-list/components/task-card/TaskListCard";
import UpsertTaskListModal from "../features/task-list/components/upsert-task-list/UpsertTasklistModal";
import { CategoryWithTaskList, TaskList } from "../features/task-list/shared/tasks.types";

type CategoryTaskListPageProps = {
  categoryTaskLists: CategoryWithTaskList;
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

function CategoryTaskListPage({ categoryTaskLists }: CategoryTaskListPageProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });
  console.log(categoryTaskLists);
  const [
    isUpsertTaskListModalOpened,
    { open: onOpenCreateTaskListWithCategoryModal, close: onCloseUpsertTaskListModal },
  ] = useDisclosure(false);

  const [selectedTaskList, setSelectedTaskList] = useState<undefined | TaskList>(undefined);

  const handleClose = () => {
    setSelectedTaskList(undefined);
    onCloseUpsertTaskListModal();
  };

  return (
    <Box mt={32}>
      <UpsertTaskListModal isOpen={isUpsertTaskListModalOpened} onClose={handleClose} tasklist={selectedTaskList} />
      <LazyHeader
        leftSection={
          <LazyIcon
            icon={getIconByTag(categoryTaskLists.categoryTag as ValidIconTags)}
            size="xl"
            iconColor="white"
            hasBackground
            backgroundColor={categoryTaskLists.categoryColor}
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

      {categoryTaskLists.taskListOverviews.length > 0 ? (
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} mt={32}>
            {categoryTaskLists.taskListOverviews.map((taskList) => (
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
    </Box>
  );
}

export default CategoryTaskListPage;
