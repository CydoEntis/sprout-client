import { Paper, Flex, Checkbox, ActionIcon, Text, Group } from "@mantine/core";
import { Trash } from "lucide-react";
import { TaskListItem } from "../TaskListDetailsCard";

import styles from "./list-item.module.css";

type ListItemProps = {
  item: TaskListItem;
  onDelete: (id: number) => void;
  onChange: (id: number, isCompleted: boolean) => void;
};

function ListItem({ item, onDelete, onChange }: ListItemProps) {
  return (
    <Paper p={8} bg="item" className={styles["list-item"]} withBorder>
      <Flex justify="space-between">
        <Group>
          <Checkbox checked={item.isCompleted} onChange={(event) => onChange(item.id, event.currentTarget.checked)} color="lime"/>
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
