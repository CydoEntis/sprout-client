import {
  Stack,
  Title,
  Divider,
  Flex,
  Avatar,
  RingProgress,
  Text,
  Group,
} from "@mantine/core";
import { Calendar } from "lucide-react";
import TaskListCard from "./TaskListCard";
import { TaskListResponse } from "../shared/task-list.types";

type TaskListCardProps = {
  taskList: TaskListResponse;
};

function InProgressTaskListCard({ taskList }: TaskListCardProps) {
  return (
    <TaskListCard borderPos="bottom" color="lime" taskListId={taskList.id}>
      <Stack gap={8} pb={20}>
        <Title size="lg">{taskList.name}</Title>
        <Group gap={4} align="center">
          <Calendar size={12} />
          <Text size="xs" c="dimmed">
            Friday, July 8, 2025
          </Text>
        </Group>
      </Stack>
      <Divider />
      <Stack gap={2} py={16}>
        <Text c="dimmed" size="sm">
          Description:
        </Text>
        <Text size="sm">{taskList.description}</Text>
      </Stack>
      <Flex w="100%" justify="space-between">
        <Group>
          <Stack gap={4}>
            <Text size="sm" c="dimmed">
              Members:
            </Text>
            <Avatar.Group>
              {taskList.members.map((member) => (
                <Avatar
                  key={member.userId}
                  size="sm"
                  name={member.name}
                  color="initials"
                />
              ))}
            </Avatar.Group>
          </Stack>
        </Group>
        <Group>
          <Stack gap={4}>
            <Text size="sm" c="dimmed">
              Progress:
            </Text>
            <Group gap={4}>
              {taskList.totalTasksCount > 0 ? (
                <>
                  <RingProgress
                    size={25}
                    thickness={3}
                    sections={[
                      {
                        value: taskList.taskCompletionPercentage,
                        color: "lime",
                      },
                    ]}
                  />
                  <Text size="sm">{taskList.taskCompletionPercentage}%</Text>
                </>
              ) : (
                <Text size="xs">No Tasks</Text>
              )}
            </Group>
          </Stack>
        </Group>
      </Flex>
    </TaskListCard>
  );
}

export default InProgressTaskListCard;
