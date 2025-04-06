import { Flex, Checkbox, ActionIcon, Text, Group } from "@mantine/core";
import { GripVertical, X } from "lucide-react";
import styles from "./list-item.module.css";
import { TaskListItem } from "../../shared/tasks.types";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

type ListItemProps = {
  item: TaskListItem;
  onDelete: (id: number) => void;
  onChange: (id: number, isCompleted: boolean) => void;
  canRemove: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
};

function ListItem({ item, onDelete, onChange, canRemove, dragHandleProps }: ListItemProps) {
  return (
    <Flex justify="space-between" align="center">
      <Group>
        <GripVertical size={20} color="#888" {...dragHandleProps} style={{ cursor: "grab" }} />

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
