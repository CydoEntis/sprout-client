// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { Stack } from "@mantine/core";
// import { TasklistItemDetail } from "../shared/task-list-details.types";
// import UpsertTasklistItem from "./UpsertTasklistItem";
// import { TasklistItem } from "./TasklistDetailsCard";
// import ListItem from "./list-item/ListItem";
// import { useListState } from "@mantine/hooks";
// import { useReorderTasklistItemsMutation } from "../services/task-list-items/reorder-task-list-item.service";
// import { useParams } from "@tanstack/react-router";
// import { useUpdateTasklistStatusItemMutation } from "../services/task-list-items/update-status-task-list.service";
// import { DeleteTasklistItemRequest, useDeleteTasklistItemMutation } from "../services/task-list-items/delete-task-list-item.service";

// type TasklistItemListProps = {
//   TasklistItems: TasklistItemDetail[];
//   onEdit: (item: TasklistItem) => void;
//   itemToEdit: TasklistItem | null;
//   onCancel: () => void;
// };

// function TasklistItemList({ TasklistItems, onEdit, onCancel: onClose, itemToEdit }: TasklistItemListProps) {
//   const { tasklistId } = useParams({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
//   const [state, handlers] = useListState(TasklistItems);
//   const reorderTasklistItems = useReorderTasklistItemsMutation();
//   const updateStatusTasklistItem = useUpdateTasklistStatusItemMutation();
//   const deleteTasklistItem = useDeleteTasklistItemMutation();

//   const handleTasklistItemCreation = (newItem: TasklistItemDetail) => {
//     handlers.append(newItem);
//   };

//   const updateTasklistItemHandler = (updatedItem: TasklistItem) => {
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

//     await reorderTasklistItems.mutateAsync({
//       TasklistId: Number(tasklistId),
//       items: reorderedItems,
//     });
//   };

//   const handleStatusChange = async (id: number, isCompleted: boolean) => {
//     handlers.setState((prev) => prev.map((item) => (item.id === id ? { ...item, isCompleted } : item)));

//     await updateStatusTasklistItem.mutateAsync({
//       id,
//       isCompleted,
//     });
//   };

//   const handleTasklistItemDeletion = async (tasklistItemId: number) => {
//     await deleteTasklistItem.mutateAsync(tasklistItemId);

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
//                         <UpsertTasklistItem
//                           isActive={true}
//                           TasklistId={item.id}
//                           TasklistItem={item}
//                           onClose={onClose}
//                           onUpdate={updateTasklistItemHandler}
//                         />
//                       ) : (
//                         <ListItem
//                           item={item}
//                           onDelete={() => handleTasklistItemDeletion(item.id)}
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

// export default TasklistItemList;
