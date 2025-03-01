import { Paper, Title, Text, Stack, Group, Button, Avatar } from "@mantine/core";
import { DndListHandle } from "../../../DndListHandle";
import { Plus } from "lucide-react";
import { TaskListDetails } from "../shared/task-list-details.types";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "@tanstack/react-router";
import UpdateTaskListModal from "../../task-list/components/UpdateTaskListModal";

type TaskListDetailsCardProps = {
  onOpenAddTask: () => void;
  taskListDetails: TaskListDetails;
};

function TaskListDetailsCard({ taskListDetails }: TaskListDetailsCardProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const [isUpdateTaskListOpened, { open: onOpenUpdateTaskListModal, close: onCloseTaskListModal }] =
    useDisclosure(false);
  // const deleteTaskList = useDeleteTaskListMutation();


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
            <UpdateAndDeleteMenu onUpdate={onOpenUpdateTaskListModal} onDelete={() => {}} />
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
