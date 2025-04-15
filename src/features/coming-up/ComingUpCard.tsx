import { Badge, Checkbox, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { Calendar } from "lucide-react";
import LazyDate from "../../lazy-components/date/LazyDate";
import LazyHeader from "../../lazy-components/header/LazyHeader";
import LazyIcon from "../../lazy-components/icons/LazyIcon";
import LazyText from "../../lazy-components/text/LazyText";
import { TaskListItemsDueThisWeekByCategory } from "../task-list/shared/tasks.types";

type ComingUpCardProps = {
  item: TaskListItemsDueThisWeekByCategory;
  urgencyColor: string;
  totalTasks: number;
  onChange: (itemid: number, taskListId: number, isCompleted: boolean) => void;
};

function ComingUpCard({ item, urgencyColor, totalTasks, onChange }: ComingUpCardProps) {
  console.log(item);

  return (
    <Paper key={item.date.toString()} bg="primary.9" p={16} radius="md" mb={24} shadow="sm">
      <Group align="center" mb={8}>
        <LazyIcon size="md" icon={<Calendar />} backgroundColor={urgencyColor} />
        <Stack gap={0}>
          <LazyDate date={item.date} format="us" />
          <LazyText
            size="sm"
            c="dimmed"
            text={`${totalTasks} task${totalTasks === 1 ? "" : "s"} due`}
            highlight={totalTasks}
            highlightColor={urgencyColor}
          />
        </Stack>
      </Group>

      {item.categories.map((category) => (
        <Stack key={category.categoryId} gap={12} mt={16}>
          <Divider c="inverse" size="md" />
          <LazyHeader>
            <Badge variant="outline" color={category.categoryColor}>
              {category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1)}
            </Badge>
          </LazyHeader>

          <Stack gap={8}>
            {category.items.map((task) => (
              <Group key={task.id}>
                <Checkbox
                  checked={task.isCompleted}
                  onChange={(event) => onChange(task.id, task.taskListId, event.currentTarget.checked)}
                  color="lime"
                  size="md"
                />
                <Text size="lg" style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
                  {task.description}
                </Text>
              </Group>
            ))}
          </Stack>
        </Stack>
      ))}
    </Paper>
  );
}

export default ComingUpCard;
