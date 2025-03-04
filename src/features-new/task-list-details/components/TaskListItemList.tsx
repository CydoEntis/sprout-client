import { Stack } from "@mantine/core";
import { TaskListItemDetail } from "../shared/task-list-details.types";
import UpsertTaskListItem from "./UpsertTaskListItem";
import { TaskListItem } from "./TaskListDetailsCard";
import ListItem from "./ListItem";

type TaskListItemListProps = {
  taskListItems: TaskListItemDetail[];
  onEdit: (item: TaskListItem) => void;
  itemToEdit: TaskListItem | null;
  onCancel: () => void;
};

function TaskListItemList({ taskListItems, onEdit, onCancel: onClose, itemToEdit }: TaskListItemListProps) {
  return (
    <Stack gap={6}>
      {taskListItems.map((item) => (
        <div key={item.id} onDoubleClick={() => onEdit(item)}>
          {itemToEdit?.id === item.id ? (
            <UpsertTaskListItem isActive={true} taskListId={item.id} taskListItem={item} onClose={onClose} />
          ) : (
            <ListItem item={item} onDelete={(id) => console.log(id)} onChange={() => console.log()} />
          )}
        </div>
      ))}
    </Stack>
  );
}

export default TaskListItemList;
