// src/pages/FavoritedTaskListsPage.tsx
import { Box, Title, SimpleGrid } from "@mantine/core";
import { motion } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import UpsertTaskListModal from "../upsert-task-list/UpsertTasklistModal";

import TaskListCard from "../task-card/TaskListCard";
import LazyHeader from "../../../../lazy-components/header/LazyHeader";
import { TaskListInfo, TaskList, TaskListOverview } from "../../shared/tasks.types";

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

type FavoritedTaskListsPageProps = { favoritedTaskLists: TaskListOverview[] };

const FavoritedTaskListsPage = ({ favoritedTaskLists }: FavoritedTaskListsPageProps) => {
  console.log(favoritedTaskLists);
  return (
    <Box mt={32}>
      <LazyHeader>
        <Title>Favorited Task Lists</Title>
      </LazyHeader>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={32}>
          {favoritedTaskLists.map((taskList) => (
            <motion.div key={taskList.id} variants={itemVariants}>
              <TaskListCard taskList={taskList} categoryName="" />
            </motion.div>
          ))}
        </SimpleGrid>
      </motion.div>
    </Box>
  );
};

export default FavoritedTaskListsPage;
