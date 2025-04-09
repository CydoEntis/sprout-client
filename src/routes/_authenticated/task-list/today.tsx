import { createFileRoute, useSearch } from "@tanstack/react-router";
import { getTaskListItemsDueTodayQueryOptions } from "../../../features/task-list/services/task-list-items/get-task-list-items-due-today.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import LazyHeader from "../../../lazy-components/header/LazyHeader";
import LazyIcon from "../../../lazy-components/icons/LazyIcon";
import { getIconByTag } from "../../../features/category/shared/category.helpers";
import { ValidIconTags } from "../../../util/types/valid-icon.types";
import { Title, Checkbox, Text, Group, List } from "@mantine/core";

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

  console.log(dueToday);

  // const onChange = (id: number, checked: boolean) => {
  //   console.log(`Task ${id} checked: ${checked}`);
  //   // TODO: implement update logic
  // };

  return (
    <>
      {dueToday.items.map((category) => (
        <div key={category.categoryName}>
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

          {/* {category.taskLists.map((taskList) => (
            <List key={taskList.id} spacing="xs">
              {taskList.items.map((item) => (
                <List.Item key={item.id}>
                  <Group>
                    <Checkbox
                      checked={item.isCompleted}
                      onChange={(event) => onChange(item.id, event.currentTarget.checked)}
                      color="lime"
                      size="md"
                    />
                    <Text size="lg" style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>
                      {item.description}
                    </Text>
                  </Group>
                </List.Item>
              ))}
            </List>
          ))} */}
        </div>
      ))}
    </>
  );
}
