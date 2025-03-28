// import { Paper, Title, Text, Stack, Group, Avatar } from "@mantine/core";
// import { Plus } from "lucide-react";
// import { TasklistDetails } from "../shared/task-list-details.types";
// import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
// import { useParams } from "@tanstack/react-router";
// import { useState } from "react";
// import CreateTasklistItemButton from "../../task-list-item/components/CreateTasklistItemButton";
// import UpsertTasklistItem from "./UpsertTasklistItem";
// import TasklistItemList from "./TasklistItemList";
// import TasklistItemControls from "./TasklistItemControls";

// type TasklistDetailsCardProps = {
//   onOpenModal: () => void;
//   onUpdateTasklist: () => void;
//   onDeleteTasklist: () => void;
//   onCreateTasklistItem: () => void;
//   onUpdateTasklistItem: () => void;
//   onDeleteTasklistItem: () => void;
//   onReorderTasklistItem: () => void;
//   onUpdateTasklistItemStatus: () => void;

//   onOpen: () => void;
//   TasklistDetails: TasklistDetails;
// };

// export type TasklistItem = {
//   TasklistItemId: number;
//   description: string;
//   isCompleted: boolean;
// };

// function TasklistDetailsCard({ TasklistDetails }: TasklistDetailsCardProps) {
//   const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$TasklistId" });

//   const [itemToEdit, setItemToEdit] = useState<TasklistItem | null>(null);
//   const [isCreatingTaskItem, setIsCreatingTaskItem] = useState(false);

//   const deleteTasklistHandler = async () => {
//     await deleteTasklist.mutateAsync(TasklistDetails.TasklistId);
//     navigate({ to: `/categories/${categoryName}` });
//   };

//   const showCreateTasklistItemHandler = () => {
//     setItemToEdit(null);
//     setIsCreatingTaskItem((prevState) => !prevState);
//   };

//   const showEditTasklistItemHandler = (item: TasklistItem) => {
//     setIsCreatingTaskItem(false);
//     setItemToEdit(item);
//   };

//   const cancelEditingHandler = () => setItemToEdit(null);
//   const cancelCreatingHandler = () => setIsCreatingTaskItem(false);

//   return (
//     <>
//       <Paper p={16} radius="md" mt={16} withBorder>
//         <Stack gap={2} mb={16}>
//           <Group justify="space-between" align="center">
//             <Title>{TasklistDetails.name}</Title>
//             <UpdateAndDeleteMenu onUpdate={onOpenUpdateTasklistModal} onDelete={deleteTasklistHandler} />
//           </Group>
//           <Text c="dimmed">{TasklistDetails.description}</Text>
//           <TasklistItemControls />
//           <Stack mt={16} gap={4}>
//             <Text size="xs">Members</Text>
//             <Group justify="space-between" align="center">
//               <Avatar.Group>
//                 {TasklistDetails.members.map((member) => (
//                   <Avatar key={member.userId} color="initials" name={member.name} />
//                 ))}
//                 <Avatar>
//                   <Plus size={20} />
//                 </Avatar>
//               </Avatar.Group>
//               <CreateTasklistItemButton isCreating={isCreatingTaskItem} onCreate={showCreateTasklistItemHandler} />
//             </Group>
//           </Stack>
//         </Stack>

//         {/* Show Create Task Input (Only if nothing is being edited) */}
//         {isCreatingTaskItem && !itemToEdit && (
//           <UpsertTasklistItem
//             TasklistId={TasklistDetails.id}
//             isActive={isCreatingTaskItem}
//             onClose={cancelCreatingHandler}
//           />
//         )}

//         {/* Render Task Items */}
//         <TasklistItemList
//           TasklistItems={TasklistDetails.TasklistItems}
//           onEdit={showEditTasklistItemHandler}
//           onCancel={cancelEditingHandler}
//           itemToEdit={itemToEdit}
//         />
//       </Paper>
//     </>
//   );
// }

// export default TasklistDetailsCard;
