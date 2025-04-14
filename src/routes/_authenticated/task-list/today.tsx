import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import LazyHeader from "../../../lazy-components/header/LazyHeader";
import LazyIcon from "../../../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../../../features/category/shared/category.helpers";
import { ValidIconTags } from "../../../util/types/valid-icon.types";
import { Title, Checkbox, Text, Group, Paper, Stack, Divider, Pagination, Flex } from "@mantine/core";
import { useUpdateTaskListStatusItemMutation } from "../../../features/task-list/services/task-list-items/update-status-task-list.service";
import { Star } from "lucide-react";
import LazyText from "../../../lazy-components/text/LazyText";
import { getTaskListItemsDueByDateQueryOptions } from "../../../features/task-list/services/task-list-items/get-task-list-items-due-today.service";
import FilterSortControls from "../../../features/auth/components/controls/FilterSortControls";
import { PaginationParams } from "../../../util/types/shared.types";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/task-list/today")({
  loaderDeps: ({ search: { page, search, sortBy, sortDirection } }) => ({
    page,
    search,
    sortBy,
    sortDirection,
  }),
  loader: async ({ context, deps }) => {
    const { queryClient } = context;
    const today = new Date().toISOString().split("T")[0];

    await queryClient.ensureQueryData(getTaskListItemsDueByDateQueryOptions(today, deps));
  },
  validateSearch: (search: Record<string, string | number>): PaginationParams => {
    return {
      page: search.page ? parseInt(search.page as string) : 1,
      search: typeof search.search === "string" ? search.search : "",
      sortBy: (search.sortBy as string) || "duedate",
      sortDirection: (search.sortDirection as string) || "desc",
    };
  },
  component: RouteComponent,
});

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function RouteComponent() {
  const searchParams = useSearch({ from: "/_authenticated/task-list/today" });
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const { data: dueToday } = useSuspenseQuery(getTaskListItemsDueByDateQueryOptions(today, searchParams));

  const { mutateAsync: toggleStatus } = useUpdateTaskListStatusItemMutation(0, searchParams.page!);

  const onChange = async (itemId: number, taskListId: number, isCompleted: boolean) => {
    try {
      await toggleStatus({
        taskListId: taskListId,
        id: itemId,
        isCompleted,
      });
    } catch (error) {
      console.error("Error updating task list item status:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      to: "/task-list/today",
      search: { ...searchParams, page: newPage },
    });
  };

  return (
    <>
      <Paper bg="primary.9" p={16} radius="lg" mb={16} shadow="md">
        <Stack gap={8}>
          <Group gap={8}>
            <LazyIcon size="xl" iconColor="white" hasBackground backgroundColor="yellow" icon={<Star />} />
            <Stack gap={0}>
              <Title>Due Today</Title>
              <Text size="sm" c="dimmed">
                Make sure you complete all tasks due today
              </Text>
            </Stack>
          </Group>
        </Stack>
        <FilterSortControls
          route="/task-list/today"
          searchParams={searchParams}
          sortByOptions={[
            { value: "duedate", label: "Due Date" },
            { value: "description", label: "Description" },
            { value: "completed", label: "Completed" },
          ]}
        />
      </Paper>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Stack gap={16}>
          {dueToday.items.map((category) => (
            <motion.div key={category.categoryId} variants={itemVariants}>
              <Paper
                shadow="md"
                bg="primary.9"
                p={16}
                radius="lg"
                pos="relative"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Stack gap={16} mb={32}>
                  <Stack gap={16}>
                    <LazyHeader
                      leftSection={
                        <LazyIcon
                          icon={getIconByTag(category.categoryTag as ValidIconTags)}
                          size="xl"
                          iconColor="white"
                          hasBackground
                          backgroundColor={category.categoryColor}
                        />
                      }
                    >
                      <Stack gap={0}>
                        <Title>{category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1)}</Title>
                        <LazyText
                          c="dimmed"
                          text={`You have ${category.dueCount} items due today`}
                          highlight={category.dueCount}
                          highlightColor={category.categoryColor}
                        />
                      </Stack>
                    </LazyHeader>
                    <Divider c="inverse" size="md" />
                  </Stack>
                  <Stack gap={8}>
                    {category.items.map((item) => (
                      <Group key={item.id}>
                        <Checkbox
                          checked={item.isCompleted}
                          onChange={(event) => onChange(item.id, item.taskListId, event.currentTarget.checked)}
                          color="lime"
                          size="md"
                        />
                        <Text
                          size="lg"
                          style={{
                            textDecoration: item.isCompleted ? "line-through" : "none",
                          }}
                        >
                          {item.description}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </motion.div>

      {dueToday.totalPages > 1 && (
        <Paper bg="primary.9" p={16} radius="md" mt={32}>
          <Flex justify="space-between" align="center">
            <LazyText
              text={`page ${searchParams.page} of ${dueToday.totalPages}`}
              highlight={searchParams.page}
              highlightColor="lime"
              c="gray"
            />
            <Pagination
              color="lime"
              value={searchParams.page}
              onChange={handlePageChange}
              total={dueToday.totalPages}
            />
          </Flex>
        </Paper>
      )}
    </>
  );
}
