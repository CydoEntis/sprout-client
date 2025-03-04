import { Paper, Flex, Checkbox, ActionIcon, Text, Group } from "@mantine/core";
import { Trash } from "lucide-react";
import { TaskListItem } from "./TaskListDetailsCard";

type ListItemProps = {
  item: TaskListItem;
  onDelete: (id: number) => void;
  onChange: () => void;
};

function ListItem({ item, onDelete, onChange }: ListItemProps) {
  return (
    <Paper p={8} bg="secondary">
      <Flex justify="space-between">
        <Group>
          <Checkbox checked={item.isCompleted} onChange={onChange} />
          <Text>{item.description}</Text>
        </Group>
        <ActionIcon color="red" variant="light" onClick={() => onDelete(item.id)}>
          <Trash size={20} />
        </ActionIcon>
      </Flex>
    </Paper>
  );
}

export default ListItem;
