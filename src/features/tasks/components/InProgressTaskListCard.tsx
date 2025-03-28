import { Stack, Title, Divider, Flex, Text } from "@mantine/core";
import { Calendar } from "lucide-react";
import { TasklistPreview } from "../shared/tasks.types";
import TasklistMembers from "./TasklistMembers";
import TasklistProgress from "./TasklistProgress";
import LazyCard from "../../../lazy-components/card/LazyCard";
import LazyDate from "../../../lazy-components/date/LazyDate";

type TasklistCardProps = {
  Tasklist: TasklistPreview;
};

function InProgressTasklistCard({ Tasklist }: TasklistCardProps) {
  console.log(Tasklist);
  return (
    // <TasklistCard borderPos="bottom" color="lime" TasklistId={Tasklist.id}>
    <LazyCard p={12} bg="secondary" to={`/categories/${Tasklist.categoryName}/${Tasklist.id}`}>
      <Stack gap={8} pb={20}>
        <Title size="lg">{Tasklist.name}</Title>

        <LazyDate leftSection={<Calendar size={18} />} size="xs" c="dimmed" date={Tasklist.createdAt} format="eu" />

        {/* <Group gap={4} align="center">
          <Calendar size={12} />
          <Text size="xs" c="dimmed">
            Friday, July 8, 2025
          </Text>
        </Group> */}
      </Stack>
      <Divider />
      <Stack gap={2} py={16}>
        <Text c="dimmed" size="sm">
          Description:
        </Text>
        <Text size="sm">{Tasklist.description}</Text>
      </Stack>
      <Flex w="100%" justify="space-between">
        <TasklistMembers members={Tasklist.members} />
        <TasklistProgress count={Tasklist.totalTasksCount} percentage={Tasklist.taskCompletionPercentage} />
      </Flex>
    </LazyCard>
    // </TasklistCard>
  );
}

export default InProgressTasklistCard;
