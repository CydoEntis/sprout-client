// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { Stack } from "@mantine/core";
// import { TaskListItemDetail } from "../shared/task-list-details.types";
// import UpsertTaskListItem from "./UpsertTaskListItem";
// import { TaskListItem } from "./TaskListDetailsCard";
// import ListItem from "./list-item/ListItem";
// import { useListState } from "@mantine/hooks";
// import { useReorderTaskListItemsMutation } from "../services/task-list-items/reorder-task-list-item.service";
// import { useParams } from "@tanstack/react-router";
// import { useUpdateTaskListStatusItemMutation } from "../services/task-list-items/update-status-task-list.service";
// import { DeleteTaskListItemRequest, useDeleteTaskListItemMutation } from "../services/task-list-items/delete-task-list-item.service";

// type TaskListItemListProps = {
//   TaskListItems: TaskListItemDetail[];
//   onEdit: (item: TaskListItem) => void;
//   itemToEdit: TaskListItem | null;
//   onCancel: () => void;
// };

// function TaskListItemList({ TaskListItems, onEdit, onCancel: onClose, itemToEdit }: TaskListItemListProps) {
//   const { taskListId } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
//   const [state, handlers] = useListState(TaskListItems);
//   const reorderTaskListItems = useReorderTaskListItemsMutation();
//   const updateStatusTaskListItem = useUpdateTaskListStatusItemMutation();
//   const deleteTaskListItem = useDeleteTaskListItemMutation();

//   const handleTaskListItemCreation = (newItem: TaskListItemDetail) => {
//     handlers.append(newItem);
//   };

//   const updateTaskListItemHandler = (updatedItem: TaskListItem) => {
//     handlers.setState((prev) => prev.map((task) => (task.id === updatedItem.id ? updatedItem : task)));
//   };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleDragEnd = async ({ source, destination }: any) => {
//     if (!destination) return;

//     const newState = [...state];
//     const [movedItem] = newState.splice(source.index, 1);
//     newState.splice(destination.index, 0, movedItem);

//     handlers.setState(newState);

//     const reorderedItems = newState.map((item, index) => ({
//       id: item.id,
//       position: index,
//     }));

//     await reorderTaskListItems.mutateAsync({
//       TaskListId: Number(taskListId),
//       items: reorderedItems,
//     });
//   };

//   const handleStatusChange = async (id: number, isCompleted: boolean) => {
//     handlers.setState((prev) => prev.map((item) => (item.id === id ? { ...item, isCompleted } : item)));

//     await updateStatusTaskListItem.mutateAsync({
//       id,
//       isCompleted,
//     });
//   };

//   const handleTaskListItemDeletion = async (tasklistItemId: number) => {
//     await deleteTaskListItem.mutateAsync(tasklistItemId);

//     handlers.setState((prev) => prev.filter((item) => item.id !== tasklistItemId));
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Droppable droppableId="task-list" direction="vertical">
//         {(provided) => (
//           <Stack {...provided.droppableProps} ref={provided.innerRef} gap={6}>
//             {state.map((item, index) => (
//               <Draggable key={item.id} draggableId={String(item.id)} index={index}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     style={{
//                       ...provided.draggableProps.style,
//                     }}
//                   >
//                     <div {...provided.dragHandleProps} onDoubleClick={() => onEdit(item)}>
//                       {itemToEdit?.id === item.id ? (
//                         <UpsertTaskListItem
//                           isActive={true}
//                           TaskListId={item.id}
//                           TaskListItem={item}
//                           onClose={onClose}
//                           onUpdate={updateTaskListItemHandler}
//                         />
//                       ) : (
//                         <ListItem
//                           item={item}
//                           onDelete={() => handleTaskListItemDeletion(item.id)}
//                           onChange={handleStatusChange}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </Stack>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

// export default TaskListItemList;
