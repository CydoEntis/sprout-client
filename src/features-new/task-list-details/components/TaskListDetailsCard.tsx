import { Paper, Title, Text, Stack, Badge, Group, Button, Avatar } from "@mantine/core";
import { DndListHandle } from "../../../DndListHandle";
import { Plus } from "lucide-react";
import { TaskListDetails } from "../shared/task-list-details.types";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { useDisclosure } from "@mantine/hooks";
import UpsertTaskListModal from "../../task-list/components/UpsertTaskListModal";
import { TaskList, UpdateTaskListRequest } from "../../task-list/shared/task-list.types";
import { useState } from "react";
import { useParams } from "@tanstack/react-router";

type TaskListDetailsCardProps = {
  onOpenAddTask: () => void;
  taskListDetails: TaskListDetails;
};

function TaskListDetailsCard({ taskListDetails }: TaskListDetailsCardProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const [isUpsertTaskListOpened, { open: onOpenUpsertTaskListModal, close: onCloseTaskListModal }] =
    useDisclosure(false);
  const [taskList, setTaskList] = useState<UpdateTaskListRequest | undefined>(undefined);

  const openCategoryCreateModalHandler = () => {
    setTaskList(undefined);
    onOpenUpsertTaskListModal();
  };

  const openTaskListEditModalHandler = (taskListDetails: TaskListDetails) => {
    setTaskList({
      id: taskListDetails.id,
      name: taskListDetails.name,
      description: taskListDetails.description,
      category: categoryName,
    });
    onOpenUpsertTaskListModal();
  };

  const closeTaskListModalHandler = () => {
    setTaskList(undefined);
    onCloseTaskListModal();
  };

  return (
    <>
      <UpsertTaskListModal onClose={closeTaskListModalHandler} isOpen={isUpsertTaskListOpened} taskList={taskList} />

      <Paper p={16} radius="md" mt={16}>
        <Stack gap={2} mb={16}>
          <Group justify="space-between" align="center">
            <Title>{taskListDetails.name}</Title>
            <UpdateAndDeleteMenu onUpdate={() => openTaskListEditModalHandler(taskListDetails)} onDelete={() => {}} />
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
              <Button variant="subtle" color="dimmed" leftSection={<Plus size={20} />}>
                Add Item
              </Button>
            </Group>
          </Stack>
        </Stack>
        {/* <TaskListHeader /> */}
        <DndListHandle />
      </Paper>
    </>
  );
}

export default TaskListDetailsCard;
