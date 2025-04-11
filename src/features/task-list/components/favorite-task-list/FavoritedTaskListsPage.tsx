import { Box, Title, SimpleGrid, Pagination } from "@mantine/core";
import { motion } from "framer-motion";

import LazyHeader from "../../../../lazy-components/header/LazyHeader";
import { FavoritedTaskList } from "../../shared/tasks.types";
import FavoritedTaskListCard from "./FavoritedTaskListCard";
import { Paginated } from "../../../../util/types/shared.types";
import { useSearch, useNavigate } from "@tanstack/react-router";

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

type FavoritedTaskListsPageProps = { favoritedTaskLists: Paginated<FavoritedTaskList> };

const FavoritedTaskListsPage = ({ favoritedTaskLists }: FavoritedTaskListsPageProps) => {
  const searchParams = useSearch({ from: "/_authenticated/task-list/favorites" });
  const page = searchParams.page || 1;
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    navigate({
      to: `/task-list/favorites`,
      search: { ...searchParams, page: newPage },
    });
  };

  return (
    <Box mt={32}>
      <LazyHeader>
        <Title>Favorited Task Lists</Title>
      </LazyHeader>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={32}>
          {favoritedTaskLists.items.map((taskList) => (
            <motion.div key={taskList.taskListId} variants={itemVariants}>
              <FavoritedTaskListCard favoritedTaskList={taskList} />
            </motion.div>
          ))}
        </SimpleGrid>
      </motion.div>

      {favoritedTaskLists.totalPages > 1 && (
        <Pagination
          color="lime"
          value={page}
          onChange={handlePageChange}
          total={favoritedTaskLists.totalPages}
          style={{ flexShrink: 0 }}
        />
      )}
    </Box>
  );
};

export default FavoritedTaskListsPage;
