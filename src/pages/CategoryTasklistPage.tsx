import { Box, Button, Title, SimpleGrid, Pagination, Paper, Flex, Stack, Skeleton } from "@mantine/core";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import LazyIcon from "../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../features/category/shared/category.helpers";
import { ValidIconTags } from "../util/types/valid-icon.types";
import { useState } from "react";
import TaskListCard from "../features/task-list/components/task-card/TaskListCard";
import UpsertTaskListModal from "../features/task-list/components/upsert-task-list/UpsertTasklistModal";
import { TaskList, TaskListOverview } from "../features/task-list/shared/tasks.types";
import { Category } from "../features/category/shared/category.types";
import LazyText from "../lazy-components/text/LazyText";
import PageHeader from "../components/header/PageHeader";
import FilterSortControls from "../features/auth/components/controls/FilterSortControls";
import { useGetAllTaskListsForCategory } from "../features/category/services/get-all-task-lists-for-category.service";
import LoadingSkeleton from "../components/loaders/LoadingSkeleton";

type CategoryTaskListPageProps = {
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

function CategoryTaskListPage({ category }: CategoryTaskListPageProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName" });

  const searchParams = useSearch({ from: "/_authenticated/categories/$categoryName" });
  const page = searchParams.page || 1;
  const navigate = useNavigate();

  const [
    isUpsertTaskListModalOpened,
    { open: onOpenCreateTaskListWithCategoryModal, close: onCloseUpsertTaskListModal },
  ] = useDisclosure(false);

  const [selectedTaskList, setSelectedTaskList] = useState<undefined | TaskList>(undefined);

  const { data: paginatedTaskLists, isLoading, isFetching } = useGetAllTaskListsForCategory(categoryName, searchParams);

  const handleClose = () => {
    setSelectedTaskList(undefined);
    onCloseUpsertTaskListModal();
  };

  const isMobile = useMediaQuery("(max-width: 425px)");

  const handlePageChange = (newPage: number) => {
    navigate({
      to: `/categories/${categoryName}`,
      search: { ...searchParams, page: newPage },
    });
  };

  return (
    <Box mih="calc(95vh - 65px)">
      <UpsertTaskListModal isOpen={isUpsertTaskListModalOpened} onClose={handleClose} tasklist={selectedTaskList} />
      <Flex direction="column" justify="space-between" h="100%">
        <Stack gap={16} style={{ flexGrow: 1 }}>
          <Paper bg="primary.9" p={16} radius="md">
            <PageHeader
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
                <Button
                  onClick={onOpenCreateTaskListWithCategoryModal}
                  leftSection={<Plus size={20} />}
                  color="lime"
                  fullWidth={isMobile}
                >
                  Task List
                </Button>
              }
            >
              <Title>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Title>
            </PageHeader>
            <Stack mb="md" gap="8">
              <FilterSortControls
                route="/categories/$categoryName"
                searchParams={searchParams}
                sortByOptions={[
                  { value: "createdAt", label: "Created At" },
                  { value: "name", label: "Name" },
                  { value: "favorited", label: "Favorited" },
                ]}
              />
            </Stack>
          </Paper>

          {isLoading || isFetching ? (
            <>
              <LoadingSkeleton numberOfSkeletons={16} height={190} />
              <Skeleton height={64} />
            </>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={16}>
                {paginatedTaskLists?.items.map((taskList: TaskListOverview) => (
                  <motion.div key={taskList.id} variants={itemVariants}>
                    <TaskListCard taskList={taskList} categoryName={categoryName} />
                  </motion.div>
                ))}
              </SimpleGrid>
            </motion.div>
          )}
        </Stack>
        {!isLoading &&
          !isFetching &&
          paginatedTaskLists &&
          paginatedTaskLists.totalPages > 0 &&
          paginatedTaskLists.items.length > 0 && (
            <Paper bg="primary.9" p={16} radius="md" mt={32}>
              <Flex justify="space-between" align="center">
                <LazyText
                  text={`page ${page} of ${paginatedTaskLists.totalPages}`}
                  highlight={page}
                  highlightColor="lime"
                  c="gray"
                />
                <Pagination
                  color="lime"
                  value={page}
                  onChange={handlePageChange}
                  total={paginatedTaskLists.totalPages}
                />
              </Flex>
            </Paper>
          )}
      </Flex>
    </Box>
  );
}

export default CategoryTaskListPage;
