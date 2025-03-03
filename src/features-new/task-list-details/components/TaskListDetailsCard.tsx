import { Paper, Title, Text, Stack, Group, Button, Avatar } from "@mantine/core";
import { Plus } from "lucide-react";
import { TaskListDetails } from "../shared/task-list-details.types";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "@tanstack/react-router";
import UpdateTaskListModal from "../../task-list/components/UpdateTaskListModal";
import { useDeleteTaskListMutation } from "../../task-list/services/delete-task-list.service";
import { useState } from "react";
import CreateTaskListItemButton from "../../task-list-item/components/CreateTaskListItemButton";
import UpsertTaskListItem from "./UpsertTaskListItem";
import TaskListItemList from "./TaskListItemList";

type TaskListDetailsCardProps = {
  onOpenAddTask: () => void;
  taskListDetails: TaskListDetails;
};

export type TaskListItem = {
  id: number;
  description: string;
  isCompleted: boolean;
};

function TaskListDetailsCard({ taskListDetails }: TaskListDetailsCardProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const [isUpdateTaskListOpened, { open: onOpenUpdateTaskListModal, close: onCloseTaskListModal }] =
    useDisclosure(false);
  const deleteTaskList = useDeleteTaskListMutation();
  const navigate = useNavigate();

  const [itemToEdit, setItemToEdit] = useState<TaskListItem | null>(null);
  const [isCreatingTaskItem, setIsCreatingTaskItem] = useState(false);

  const deleteTaskListHandler = async () => {
    await deleteTaskList.mutateAsync(taskListDetails.id);
    navigate({ to: `/categories/${categoryName}` });
  };

  const showCreateTaskListItemHandler = () => {
    setItemToEdit(null);
    setIsCreatingTaskItem((prevState) => !prevState);
  };

  const showEditTaskListItemHandler = (item: TaskListItem) => {
    setIsCreatingTaskItem(false);
    setItemToEdit(item);
  };

  const cancelEditingHandler = () => setItemToEdit(null);
  const cancelCreatingHandler = () => setIsCreatingTaskItem(false);

  return (
    <>
      <UpdateTaskListModal
        onClose={onCloseTaskListModal}
        isOpen={isUpdateTaskListOpened}
        taskList={{
          taskListId: taskListDetails.id,
          name: taskListDetails.name,
          description: taskListDetails.description,
          categoryName: categoryName,
        }}
      />

      <Paper p={16} radius="md" mt={16}>
        <Stack gap={2} mb={16}>
          <Group justify="space-between" align="center">
            <Title>{taskListDetails.name}</Title>
            <UpdateAndDeleteMenu onUpdate={onOpenUpdateTaskListModal} onDelete={deleteTaskListHandler} />
          </Group>
          <Text c="dimmed">{taskListDetails.description}</Text>
          <Group gap={8}>
            <Button size="xs" variant="light" color="lime">
              Details
            </Button>
            <Button size="xs" variant="subtle" color="inverse">
              Comments
            </Button>
            <Button size="xs" variant="subtle" color="inverse">
              Attachments
            </Button>
          </Group>
          <Stack mt={16} gap={4}>
            <Text size="xs">Members</Text>
            <Group justify="space-between" align="center">
              <Avatar.Group>
                {taskListDetails.members.map((member) => (
                  <Avatar key={member.userId} color="initials" name={member.name} />
                ))}
                <Avatar>
                  <Plus size={20} />
                </Avatar>
              </Avatar.Group>
              <CreateTaskListItemButton isCreating={isCreatingTaskItem} onCreate={showCreateTaskListItemHandler} />
            </Group>
          </Stack>
        </Stack>

        {/* Show Create Task Input (Only if nothing is being edited) */}
        {isCreatingTaskItem && !itemToEdit && (
          <UpsertTaskListItem
            taskListId={taskListDetails.id}
            isActive={isCreatingTaskItem}
            onCancel={cancelCreatingHandler}
          />
        )}

        {/* Render Task Items */}
        <TaskListItemList
          taskListItems={taskListDetails.taskListItems}
          onEdit={showEditTaskListItemHandler}
          onCancel={cancelEditingHandler}
          itemToEdit={itemToEdit}
        />
      </Paper>
    </>
  );
}

export default TaskListDetailsCard;
