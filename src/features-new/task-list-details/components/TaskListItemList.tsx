import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Stack } from "@mantine/core";
import { TaskListItemDetail } from "../shared/task-list-details.types";
import UpsertTaskListItem from "./UpsertTaskListItem";
import { TaskListItem } from "./TaskListDetailsCard";
import ListItem from "./ListItem";
import { useListState } from "@mantine/hooks";

type TaskListItemListProps = {
  taskListItems: TaskListItemDetail[];
  onEdit: (item: TaskListItem) => void;
  itemToEdit: TaskListItem | null;
  onCancel: () => void;
};

function TaskListItemList({ taskListItems, onEdit, onCancel: onClose, itemToEdit }: TaskListItemListProps) {
  // Using `useListState` for reordering support
  const [state, handlers] = useListState(taskListItems);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = ({ source, destination }: any) => {
    if (!destination) return;
    handlers.reorder({ from: source.index, to: destination.index });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list" direction="vertical">
        {(provided) => (
          <Stack {...provided.droppableProps} ref={provided.innerRef} gap={6}>
            {state.map((item, index) => (
              <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                    }}
                  >
                    <div {...provided.dragHandleProps} onDoubleClick={() => onEdit(item)}>
                      {itemToEdit?.id === item.id ? (
                        <UpsertTaskListItem
                          isActive={true}
                          taskListId={item.id}
                          taskListItem={item}
                          onClose={onClose}
                        />
                      ) : (
                        <ListItem item={item} onDelete={(id) => console.log(id)} onChange={() => console.log()} />
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskListItemList;
