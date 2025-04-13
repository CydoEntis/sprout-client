import { Flex, Checkbox, ActionIcon, Text, Group, Badge } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Calendar, GripVertical, X } from "lucide-react";
import styles from "./list-item.module.css";
import { TaskListItem } from "../../shared/tasks.types";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import LazyDate from "../../../../lazy-components/date/LazyDate";

type ListItemProps = {
  item: TaskListItem;
  onDelete: (id: number) => void;
  onChange: (id: number, isCompleted: boolean) => void;
  canRemove: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
};

function ListItem({ item, onDelete, onChange, canRemove, dragHandleProps }: ListItemProps) {
  const isMobile = useMediaQuery("(max-width: 425px)");

  return (
    <Flex justify="space-between" align="center" wrap="wrap" gap="sm">
      <Flex align="center" gap="xs" style={{ flex: 1, minWidth: 0 }}>
        <GripVertical size={20} color="#888" {...dragHandleProps} style={{ cursor: "grab" }} />

        <Checkbox
          checked={item.isCompleted}
          onChange={(event) => onChange(item.id, event.currentTarget.checked)}
          color="lime"
          size="md"
        />

        <Text
          size="sm"
          className={item.isCompleted ? styles.completed : ""}
          style={{
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            flex: 1,
            minWidth: 0,
          }}
        >
          {item.description}
        </Text>
      </Flex>

      <Group gap="xs">
        {!isMobile && item.dueDate && (
          <Badge color="red" variant="outline">
            <LazyDate leftSection={<Calendar size={14} />} size="xs" date={new Date(item.dueDate)} />
          </Badge>
        )}
        {canRemove && (
          <ActionIcon color="red" variant="subtle" onClick={() => onDelete(item.id)}>
            <X size={20} />
          </ActionIcon>
        )}
      </Group>
    </Flex>
  );
}

export default ListItem;
