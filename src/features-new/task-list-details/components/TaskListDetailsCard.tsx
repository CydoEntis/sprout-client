// import { Paper, Title, Text, Stack, Group, Avatar } from "@mantine/core";
// import { Plus } from "lucide-react";
// import { TaskListDetails } from "../shared/task-list-details.types";
// import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
// import { useParams } from "@tanstack/react-router";
// import { useState } from "react";
// import CreateTaskListItemButton from "../../task-list-item/components/CreateTaskListItemButton";
// import UpsertTaskListItem from "./UpsertTaskListItem";
// import TaskListItemList from "./TaskListItemList";
// import TaskListItemControls from "./TaskListItemControls";

// type TaskListDetailsCardProps = {
//   onOpenModal: () => void;
//   onUpdateTaskList: () => void;
//   onDeleteTaskList: () => void;
//   onCreateTaskListItem: () => void;
//   onUpdateTaskListItem: () => void;
//   onDeleteTaskListItem: () => void;
//   onReorderTaskListItem: () => void;
//   onUpdateTaskListItemStatus: () => void;

//   onOpen: () => void;
//   taskListDetails: TaskListDetails;
// };

// export type TaskListItem = {
//   taskListItemId: number;
//   description: string;
//   isCompleted: boolean;
// };

// function TaskListDetailsCard({ taskListDetails }: TaskListDetailsCardProps) {
//   const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });

//   const [itemToEdit, setItemToEdit] = useState<TaskListItem | null>(null);
//   const [isCreatingTaskItem, setIsCreatingTaskItem] = useState(false);

//   const deleteTaskListHandler = async () => {
//     await deleteTaskList.mutateAsync(taskListDetails.taskListId);
//     navigate({ to: `/categories/${categoryName}` });
//   };

//   const showCreateTaskListItemHandler = () => {
//     setItemToEdit(null);
//     setIsCreatingTaskItem((prevState) => !prevState);
//   };

//   const showEditTaskListItemHandler = (item: TaskListItem) => {
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
//             <Title>{taskListDetails.name}</Title>
//             <UpdateAndDeleteMenu onUpdate={onOpenUpdateTaskListModal} onDelete={deleteTaskListHandler} />
//           </Group>
//           <Text c="dimmed">{taskListDetails.description}</Text>
//           <TaskListItemControls />
//           <Stack mt={16} gap={4}>
//             <Text size="xs">Members</Text>
//             <Group justify="space-between" align="center">
//               <Avatar.Group>
//                 {taskListDetails.members.map((member) => (
//                   <Avatar key={member.userId} color="initials" name={member.name} />
//                 ))}
//                 <Avatar>
//                   <Plus size={20} />
//                 </Avatar>
//               </Avatar.Group>
//               <CreateTaskListItemButton isCreating={isCreatingTaskItem} onCreate={showCreateTaskListItemHandler} />
//             </Group>
//           </Stack>
//         </Stack>

//         {/* Show Create Task Input (Only if nothing is being edited) */}
//         {isCreatingTaskItem && !itemToEdit && (
//           <UpsertTaskListItem
//             taskListId={taskListDetails.id}
//             isActive={isCreatingTaskItem}
//             onClose={cancelCreatingHandler}
//           />
//         )}

//         {/* Render Task Items */}
//         <TaskListItemList
//           taskListItems={taskListDetails.taskListItems}
//           onEdit={showEditTaskListItemHandler}
//           onCancel={cancelEditingHandler}
//           itemToEdit={itemToEdit}
//         />
//       </Paper>
//     </>
//   );
// }

// export default TaskListDetailsCard;
