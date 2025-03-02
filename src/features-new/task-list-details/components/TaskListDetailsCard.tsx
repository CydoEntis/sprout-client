import { Paper, Title, Text, Stack, Group, Button, Avatar } from "@mantine/core";
// import { DndListHandle } from "../../../DndListHandle";
import { Plus } from "lucide-react";
import { TaskListDetails } from "../shared/task-list-details.types";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "@tanstack/react-router";
import UpdateTaskListModal from "../../task-list/components/UpdateTaskListModal";
import { useDeleteTaskListMutation } from "../../task-list/services/delete-task-list.service";
import { useState } from "react";
import CreateTaskListItemButton from "../../task-list-item/components/CreateTaskListItemButton";

type TaskListDetailsCardProps = {
  onOpenAddTask: () => void;
  taskListDetails: TaskListDetails;
};

function TaskListDetailsCard({ taskListDetails }: TaskListDetailsCardProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const [isUpdateTaskListOpened, { open: onOpenUpdateTaskListModal, close: onCloseTaskListModal }] =
    useDisclosure(false);
  const deleteTaskList = useDeleteTaskListMutation();
  const navigate = useNavigate();

  const deleteTaskListHandler = async () => {
    await deleteTaskList.mutateAsync(taskListDetails.id);
    navigate({ to: `/categories/${categoryName}` });
  };

  const [isCreatingTaskItem, setIsCreatingTaskItem] = useState(false);
  const showTaskItemFormHandler = () => setIsCreatingTaskItem((prevState) => !prevState);

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
                  <Avatar color="initials" name={member.name} />
                ))}
                <Avatar>
                  <Plus size={20} />
                </Avatar>
              </Avatar.Group>
              <CreateTaskListItemButton isCreating={isCreatingTaskItem} onCreate={showTaskItemFormHandler} />
            </Group>
          </Stack>
        </Stack>

        {taskListDetails.taskListItems.map((taskListItem) => (
          <p>{taskListItem.description}</p>
        ))}
        {/* <TaskListHeader />
        <DndListHandle /> */}
      </Paper>
    </>
  );
}

export default TaskListDetailsCard;
