import { Paper, Stack, Title, Flex, Pagination, Group, Text, Skeleton } from "@mantine/core";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";
import LazyIcon from "../../lazy-components/icons/LazyIcon";
import LazyText from "../../lazy-components/text/LazyText";
import FilterSortControls from "../auth/components/controls/FilterSortControls";
import { useTaskListItemsDueByDate } from "../task-list/services/task-list-items/get-task-list-items-due-today.service";
import { useUpdateTaskListStatusItemMutation } from "../task-list/services/task-list-items/update-status-task-list.service";
import DueTodayList from "./DueTodayList";

function DueTodayPage() {
  const searchParams = useSearch({ from: "/_authenticated/task-list/today" });
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const { data: paginatedDueToday, isLoading, isFetching } = useTaskListItemsDueByDate(today, searchParams);

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

      {isLoading || isFetching ? (
        <Stack gap={8}>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} height={200} />
          ))}
          <Skeleton height={64} />
        </Stack>
      ) : (
        <DueTodayList items={paginatedDueToday?.items || []} onChange={onChange} />
      )}

      {!isLoading && !isFetching && paginatedDueToday?.totalPages && paginatedDueToday.totalPages > 1 && (
        <Paper bg="primary.9" p={16} radius="md" mt={32}>
          <Flex justify="space-between" align="center">
            <LazyText
              text={`page ${searchParams.page} of ${paginatedDueToday.totalPages}`}
              highlight={searchParams.page}
              highlightColor="lime"
              c="gray"
            />
            <Pagination
              color="lime"
              value={searchParams.page}
              onChange={handlePageChange}
              total={paginatedDueToday.totalPages}
            />
          </Flex>
        </Paper>
      )}
    </>
  );
}

export default DueTodayPage;
