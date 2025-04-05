// src/pages/FavoritedTaskListsPage.tsx
import { Box, Title, SimpleGrid } from "@mantine/core";
import { motion } from "framer-motion";
import LazyHeader from "../../../../lazy-components/header/LazyHeader";
import TaskListCard from "../task-card/TasklistCard";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { TaskList, TaskListInfo } from "../../shared/tasks.types";
import UpsertTaskListModal from "../upsert-task-list/UpsertTasklistModal";

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type FavoritedTaskListsPageProps = { favoritedTaskLists: TaskListInfo[] };

const FavoritedTaskListsPage = ({ favoritedTaskLists }: FavoritedTaskListsPageProps) => {
  const [
    isUpsertTaskListModalOpened,
    { open: onOpenCreateTaskListWithCategoryModal, close: onCloseUpsertTaskListModal },
  ] = useDisclosure(false);

  const handleClose = () => {
    setSelectedTaskList(undefined);
    onCloseUpsertTaskListModal();
  };

  const [selectedTaskList, setSelectedTaskList] = useState<undefined | TaskList>(undefined);

  const openEditTaskListModal = (tasklist: TaskListInfo) => {
    setSelectedTaskList({
      id: tasklist.id,
      name: tasklist.name,
      description: tasklist.description,
    });
    onOpenCreateTaskListWithCategoryModal();
  };

  return (
    <Box mt={32}>
      <UpsertTaskListModal isOpen={isUpsertTaskListModalOpened} onClose={handleClose} tasklist={selectedTaskList} />

      <LazyHeader>
        <Title>Favorited Task Lists</Title>
      </LazyHeader>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={32}>
          {favoritedTaskLists.map((taskList) => (
            <motion.div key={taskList.id} variants={itemVariants}>
              <TaskListCard taskList={taskList} onEdit={() => openEditTaskListModal(taskList)} categoryName={"test"} />
            </motion.div>
          ))}
        </SimpleGrid>
      </motion.div>
    </Box>
  );
};

export default FavoritedTaskListsPage;
