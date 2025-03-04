import { ActionIcon, Checkbox, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { TaskListItemDetail } from "../shared/task-list-details.types";
import UpsertTaskListItem from "./UpsertTaskListItem";
import { TaskListItem } from "./TaskListDetailsCard";
import { Trash } from "lucide-react";

type TaskListItemListProps = {
  taskListItems: TaskListItemDetail[];
  onEdit: (item: TaskListItem) => void;
  itemToEdit: TaskListItem | null;
  onCancel: () => void;
};

function TaskListItemList({ taskListItems, onEdit, onCancel, itemToEdit }: TaskListItemListProps) {
  return (
    <Stack gap={6}>
      {taskListItems.map((item) => (
        <div key={item.id} onDoubleClick={() => onEdit(item)}>
          {itemToEdit?.id === item.id ? (
            <UpsertTaskListItem isActive={true} taskListId={item.id} taskListItem={item} onCancel={onCancel} />
          ) : (
  
          )}
        </div>
      ))}
    </Stack>
  );
}

export default TaskListItemList;
