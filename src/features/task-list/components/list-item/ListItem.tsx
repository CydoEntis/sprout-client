import { Flex, Checkbox, ActionIcon, Text, Group } from "@mantine/core";
import { X } from "lucide-react";

import styles from "./list-item.module.css";
import { TaskListItem } from "../../shared/tasks.types";

type ListItemProps = {
  item: TaskListItem;
  onDelete: (id: number) => void;
  onChange: (id: number, isCompleted: boolean) => void;
  canRemove: boolean;
};

function ListItem({ item, onDelete, onChange, canRemove }: ListItemProps) {
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
      {canRemove && (
        <ActionIcon color="red" variant="subtle" onClick={() => onDelete(item.id)}>
          <X size={20} />
        </ActionIcon>
      )}
    </Flex>
  );
}

export default ListItem;
