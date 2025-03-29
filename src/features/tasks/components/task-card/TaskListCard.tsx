import LazyCard from "../../../../lazy-components/card/LazyCard";
import { Flex, Stack, Text, Title } from "@mantine/core";
import { TasklistInfo } from "../../shared/tasks.types";
import LazyEditDeleteMenu from "../../../../lazy-components/menus/LazyEditDeleteMenu";
import MemberList from "../../../../components/members/MemberList";
import LazyRingProgress from "../../../../lazy-components/progress-bars/LazyRingProgressBar";

type TasklistCardProps = {
  tasklist: TasklistInfo;
  categoryName: string;
  onEdit: () => void; 
};

function TasklistCard({ tasklist, categoryName, onEdit }: TasklistCardProps) {
  return (
    <LazyCard
      bg="primary"
      mih={250}
      to={`/categories/${categoryName.toLowerCase()}/${tasklist.id}`}
      params={{ tasklistId: tasklist.id.toString() }}
    >
      <Stack gap={8} h="100%">
        <Stack style={{ flexGrow: 1 }} h={200}>
          <Flex justify="space-between">
            <Title size="1.25rem">{tasklist.name}</Title>

            <LazyRingProgress
              size={25}
              thickness={3}
              percentage={tasklist.taskCompletionPercentage}
              sections={[{ value: tasklist.taskCompletionPercentage, color: "lime" }]}
            />
          </Flex>
          <Text size="sm" c="dimmed">
            {tasklist.description}
          </Text>
        </Stack>

        <Flex justify="space-between" align="center" style={{ marginTop: "auto", flexShrink: 0 }}>
          <MemberList members={tasklist.members} size="sm" />
          <LazyEditDeleteMenu
            withBorder
            withShadow
            shadow="md"
            dropdownColor="primary"
            direction="horizontal"
            onUpdate={onEdit} 
            onDelete={() => console.log("delete")}
          />
        </Flex>
      </Stack>
    </LazyCard>
  );
}

export default TasklistCard;
