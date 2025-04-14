import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Paper, Stack, Group, Title, Text, Divider, Checkbox, Accordion, Badge } from "@mantine/core";
import { Calendar, Star } from "lucide-react";

import LoadingSkeleton from "../../../components/loaders/LoadingSkeleton";
import LazyHeader from "../../../lazy-components/header/LazyHeader";
import LazyIcon from "../../../lazy-components/icons/LazyIcon";
import LazyText from "../../../lazy-components/text/LazyText";
import LazyDate from "../../../lazy-components/date/LazyDate";

import { useUpdateTaskListStatusItemMutation } from "../../../features/task-list/services/task-list-items/update-status-task-list.service";
import { getTaskListItemsDueForTheWeekQueryOptions } from "../../../features/task-list/services/task-list-items/get-task-list-items-due-for-the-week.service";
import { PaginationParams } from "../../../util/types/shared.types";
import FilterSortControls from "../../../features/auth/components/controls/FilterSortControls";

export const Route = createFileRoute("/_authenticated/task-list/coming-up")({
  loaderDeps: ({ search: { page, search, sortBy, sortDirection } }) => ({
    page,
    search,
    sortBy,
    sortDirection,
  }),
  loader: async ({ context, deps }) => {
    const { queryClient } = context;
    await queryClient.ensureQueryData(getTaskListItemsDueForTheWeekQueryOptions(deps));
  },
  validateSearch: (params: Record<string, string | number>): PaginationParams => {
    return {
      page: params.page ? parseInt(params.page as string) : 1,
      search: typeof params.search === "string" ? params.search : "",
      sortBy: (params.sortBy as string) || "date",
      sortDirection: (params.sortDirection as string) || "asc",
    };
  },
  component: RouteComponent,
  pendingComponent: () => <LoadingSkeleton numberOfSkeletons={12} height={160} />,
});

function getColorByDaysAway(date: Date): string {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return "red";
  if (diffDays <= 3) return "orange";
  if (diffDays <= 5) return "yellow";
  return "lime";
}

function RouteComponent() {
  const searchParams = useSearch({ from: "/_authenticated/task-list/coming-up" });

  const { data: dueForWeek } = useSuspenseQuery(getTaskListItemsDueForTheWeekQueryOptions(searchParams));
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

      <Accordion radius="lg" variant="separated" defaultValue={dueForWeek.items[0]?.date.toString()}>
        {dueForWeek.items.map((item) => {
          const totalTasks = item.categories.reduce((count, category) => count + category.items.length, 0);
          const urgencyColor = getColorByDaysAway(new Date(item.date));

          return (
            <Accordion.Item py={7} bg="primary.9" key={item.date.toString()} value={item.date.toString()}>
              <Accordion.Control icon={<LazyIcon size="sm" icon={<Calendar />} backgroundColor={urgencyColor} />}>
                <Stack gap={0} w="100%">
                  <LazyDate date={item.date} format="us" />
                  <LazyText
                    size="sm"
                    c="dimmed"
                    text={`${totalTasks} task${totalTasks === 1 ? "" : "s"} due`}
                    highlight={totalTasks}
                    highlightColor={urgencyColor}
                  />
                </Stack>
              </Accordion.Control>

              <Accordion.Panel>
                {item.categories.map((category) => (
                  <Stack gap={16} mb={32} key={category.categoryId}>
                    <Divider c="inverse" size="md" />
                    <Stack gap={16}>
                      <LazyHeader>
                        <Stack gap={0}>
                          <Badge variant="outline" color={category.categoryColor}>
                            {category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1)}
                          </Badge>
                        </Stack>
                      </LazyHeader>
                    </Stack>

                    <Stack gap={8}>
                      {category.items.map((task) => (
                        <Group key={task.id}>
                          <Checkbox
                            checked={task.isCompleted}
                            onChange={(event) => onChange(task.id, task.taskListId, event.currentTarget.checked)}
                            color="lime"
                            size="md"
                          />
                          <Text
                            size="lg"
                            style={{
                              textDecoration: task.isCompleted ? "line-through" : "none",
                            }}
                          >
                            {task.description}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Stack>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
}
