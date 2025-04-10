import { createFileRoute, useSearch } from "@tanstack/react-router";
import { getTaskListItemsDueTodayQueryOptions } from "../../../features/task-list/services/task-list-items/get-task-list-items-due-today.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import LazyHeader from "../../../lazy-components/header/LazyHeader";
import LazyIcon from "../../../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../../../features/category/shared/category.helpers";
import { ValidIconTags } from "../../../util/types/valid-icon.types";
import { Title, Checkbox, Text, Group, Paper, Stack, Divider } from "@mantine/core";
import { useUpdateTaskListStatusItemMutation } from "../../../features/task-list/services/task-list-items/update-status-task-list.service";
import { Star } from "lucide-react";

export const Route = createFileRoute("/_authenticated/task-list/today")({
  validateSearch: (params: Record<string, string | number>) => {
    return {
      page: params.page ? parseInt(params.page as string) : 1,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { page } = useSearch({ from: "/_authenticated/task-list/today" });
  const { data: dueToday } = useSuspenseQuery(getTaskListItemsDueTodayQueryOptions(page));

  const { mutateAsync: toggleStatus } = useUpdateTaskListStatusItemMutation(0, page);

  console.log(dueToday);

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
      <Paper
        bg="primary.9"
        p={16}
        radius="lg"
        mb={16}
        shadow="md"
      >
        <Stack justify="space-between" gap={8}>
          <Stack gap={8}>
            <Group gap={8}>
              <LazyIcon size="xl" iconColor="white" hasBackground backgroundColor="yellow" icon={<Star />} />
              <Title>Due Today</Title>
            </Group>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        shadow="md"
        bg="primary.9"
        p={16}
        radius="lg"
        mih="70vh"
        pos="relative"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {dueToday.items.map((category) => (
          <Stack gap={16} mb={32}>
            <Stack key={category.categoryId} gap={16}>
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
                <Title>{category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1)}</Title>
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
                  <Text size="lg" style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>
                    {item.description}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Stack>
        ))}
      </Paper>
    </>
  );
}
