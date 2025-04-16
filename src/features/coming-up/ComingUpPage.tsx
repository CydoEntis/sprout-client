import { Paper, Stack, Title, Flex, Pagination, Group, Text, Skeleton } from "@mantine/core";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";
import LazyIcon from "../../lazy-components/icons/LazyIcon";
import LazyText from "../../lazy-components/text/LazyText";
import FilterSortControls from "../auth/components/controls/FilterSortControls";
import { useTaskListItemsDueForTheWeek } from "../task-list/services/task-list-items/get-task-list-items-due-for-the-week.service";

import ComingUpList from "./ComingUpList";
import { useUpdateTaskListStatusItemForComingUp } from "../task-list/services/task-list-items/update-task-list-item-status-coming-up.service";

function ComingUpPage() {
  const searchParams = useSearch({ from: "/_authenticated/task-list/coming-up" });
  const navigate = useNavigate();

  const { data: paginatedDueForWeek, isLoading, isFetching } = useTaskListItemsDueForTheWeek(searchParams);
  const { mutateAsync: toggleStatus } = useUpdateTaskListStatusItemForComingUp();

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
      to: "/task-list/coming-up",
      search: { ...searchParams, page: newPage },
    });
  };

  return (
    <>
      <Paper bg="primary.9" p={16} radius="lg" mb={16} shadow="md">
        <Stack justify="space-between" gap={8}>
          <Stack gap={8}>
            <Group gap={8}>
              <LazyIcon size="xl" iconColor="white" hasBackground backgroundColor="yellow" icon={<Star />} />
              <Stack gap={0}>
                <Title>Coming Up</Title>
                <Text>Tasks that are due for the week</Text>
              </Stack>
            </Group>
          </Stack>
          <FilterSortControls
            route="/task-list/coming-up"
            searchParams={searchParams}
            sortByOptions={[
              { value: "duedate", label: "Due Date" },
              { value: "description", label: "Description" },
              { value: "completed", label: "Completed" },
            ]}
          />
        </Stack>
      </Paper>

      {isLoading || isFetching ? (
        <Stack gap={8}>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} height={200} />
          ))}
          <Skeleton height={64} />
        </Stack>
      ) : (
        <ComingUpList items={paginatedDueForWeek?.items || []} onChange={onChange} />
      )}

      {!isLoading && !isFetching && paginatedDueForWeek?.totalPages && paginatedDueForWeek.totalPages > 1 && (
        <Paper bg="primary.9" p={16} radius="md" mt={32}>
          <Flex justify="space-between" align="center">
            <LazyText
              text={`page ${searchParams.page} of ${paginatedDueForWeek.totalPages}`}
              highlight={searchParams.page}
              highlightColor="lime"
              c="gray"
            />
            <Pagination
              color="lime"
              value={searchParams.page}
              onChange={handlePageChange}
              total={paginatedDueForWeek.totalPages}
            />
          </Flex>
        </Paper>
      )}
    </>
  );
}

export default ComingUpPage;
