import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Stack } from "@mantine/core";
import { TaskListItemDetail } from "../shared/task-list-details.types";
import UpsertTaskListItem from "./UpsertTaskListItem";
import { TaskListItem } from "./TaskListDetailsCard";
import ListItem from "./ListItem";
import { useListState } from "@mantine/hooks";
import { useEffect } from "react";
import { useReorderTaskListItemsMutation } from "../../task-list-item/services/reorder-task-list-item.service";
import { useParams } from "@tanstack/react-router";

type TaskListItemListProps = {
  taskListItems: TaskListItemDetail[];
  onEdit: (item: TaskListItem) => void;
  itemToEdit: TaskListItem | null;
  onCancel: () => void;
};

function TaskListItemList({ taskListItems, onEdit, onCancel: onClose, itemToEdit }: TaskListItemListProps) {
  const { taskListId } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const [state, handlers] = useListState(taskListItems);
  const reorderTaskListItems = useReorderTaskListItemsMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = async ({ source, destination }: any) => {
    if (!destination) return;

    const newState = [...state];
    const [movedItem] = newState.splice(source.index, 1);
    newState.splice(destination.index, 0, movedItem);

    handlers.setState(newState);

    console.log("New state: ", newState);

    const reorderedItems = newState.map((item, index) => ({
      id: item.id,
      position: index,
    }));

    await reorderTaskListItems.mutateAsync({
      taskListId: Number(taskListId),
      items: reorderedItems,
    });
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
