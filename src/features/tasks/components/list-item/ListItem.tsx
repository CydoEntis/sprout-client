import { Flex, Checkbox, ActionIcon, Text, Group } from "@mantine/core";
import { Trash } from "lucide-react";

import styles from "./list-item.module.css";
import { TaskListItem } from "../../shared/tasks.types";

type ListItemProps = {
  item: TaskListItem;
  onDelete: (id: number) => void;
  onChange: (id: number, isCompleted: boolean) => void;
};

function ListItem({ item, onDelete, onChange }: ListItemProps) {
  return (
    <Flex justify="space-between">
      <Group>
        <Checkbox
          checked={item.isCompleted}
          onChange={(event) => onChange(item.id, event.currentTarget.checked)}
          color="lime"
          size="md"
        />
        <Text size="lg" className={item.isCompleted ? styles.completed : ""}>
          {item.description}
        </Text>
      </Group>
      <ActionIcon color="red" variant="light" onClick={() => onDelete(item.id)}>
        <Trash size={20} />
      </ActionIcon>
    </Flex>
  );
}

export default ListItem;
