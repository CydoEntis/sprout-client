import { useDisclosure, useListState } from "@mantine/hooks";
import { useNavigate, useParams } from "@tanstack/react-router";
import { TaskListDetails } from "../../task-list-details/shared/task-list-details.types";
import { useReorderTaskListItemsMutation } from "../../task-list-item/services/reorder-task-list-item.service";
import { useUpdateTaskListStatusItemMutation } from "../../task-list-item/services/update-status-task-list.service";
import { useDeleteTaskListItemMutation } from "../../task-list-item/services/delete-task-list-item.service";
import { Avatar, Text, Group, Paper, Stack, Title } from "@mantine/core";
import { useCreateTaskListItemMutation } from "../../task-list-item/services/create-task-list-item.service";
import { useUpdateTaskListItemMutation } from "../../task-list-item/services/update-task-list-item.service";
import { Plus } from "lucide-react";
import UpdateAndDeleteMenu from "../../../components/menus/UpdateAndDeleteMenu";
import CreateTaskListItemButton from "../../task-list-item/components/CreateTaskListItemButton";
import TaskListItemControls from "../../task-list-details/components/TaskListItemControls";
import UpsertTaskListItem from "../../task-list-details/components/UpsertTaskListItem";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import ListItem from "../../task-list-details/components/list-item/ListItem";
import { CreateTaskListItemRequest, TaskListItem } from "../../task-list-item/shared/task-list-item.types";
import UpdateTaskListModal from "../components/UpdateTaskListModal";
import { useDeleteTaskListMutation } from "../services/delete-task-list.service";

type TaskListDetailsPageProps = {
  taskListDetails: TaskListDetails;
};

function TaskListDetailsPage({ taskListDetails }: TaskListDetailsPageProps) {
  const { categoryName, taskListId } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const navigate = useNavigate();
  const [taskListItems, taskListItemHandlers] = useListState(taskListDetails.taskListItems);
  const [itemToUpdate, setItemToUpdate] = useState<TaskListItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Task List Mutations
  //   const createTaskList = useCreateTaskListMutation();
  const deleteTaskList = useDeleteTaskListMutation();

  // Task List Item Mutations
  const createTaskListItem = useCreateTaskListItemMutation();
  const updateTaskListItem = useUpdateTaskListItemMutation();
  const reorderTaskListItems = useReorderTaskListItemsMutation();
  const updateStatusTaskListItem = useUpdateTaskListStatusItemMutation();
  const deleteTaskListItem = useDeleteTaskListItemMutation();

  // Task List Handlers
  const onDeleteTaskListHandler = async () => {
    await deleteTaskList.mutateAsync(taskListDetails.id);
    navigate({ to: `/categories/${categoryName}` });
  };

  // Task List Item Handlers
  const showCreateTaskListItemHandler = () => {
    setIsCreating(true);
    setItemToUpdate(null);
  };
  const showUpdateTaskListItemHandler = (item: TaskListItem) => {
    setIsCreating(false);
    setItemToUpdate(item);
  };

  const closeCreateTaskListItemHandler = () => {
    setIsCreating(false);
    setItemToUpdate(null);
  };

  const closeUpdateTaskListItemHandler = () => {
    setIsCreating(false);
    setItemToUpdate(null);
  };

  const createTaskListItemHandler = async (newTaskListItem: CreateTaskListItemRequest) => {
    const result = await createTaskListItem.mutateAsync(newTaskListItem);

    console.log("Newly added item: ", result);

    taskListItemHandlers.append({
      id: result.taskListItemDetail.id,
      description: result.taskListItemDetail.description,
      isCompleted: result.taskListItemDetail.isCompleted,
    });
  };

  const updateTaskListItemHandler = async (updatedItem: TaskListItem) => {
    const updateRequest = {
      taskListId: Number(taskListId),
      ...updatedItem,
    };
    await updateTaskListItem.mutateAsync(updateRequest);
    taskListItemHandlers.setState((prev) =>
      prev.map((taskItem) => (taskItem.id === updatedItem.id ? updatedItem : taskItem))
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const taskListItemDragEndHandler = async ({ source, destination }: any) => {
    if (!destination) return;

    const newTaskListItems = [...taskListItems];
    const [movedItem] = newTaskListItems.splice(source.index, 1);
    newTaskListItems.splice(destination.index, 0, movedItem);

    taskListItemHandlers.setState(newTaskListItems);

    const reorderedItems = newTaskListItems.map((item, index) => ({
      id: item.id,
      position: index,
    }));

    await reorderTaskListItems.mutateAsync({
      taskListId: Number(taskListId),
      items: reorderedItems,
    });
  };

  const deleteTaskListItemHandler = async (taskListItemId: number) => {
    await deleteTaskListItem.mutateAsync({ taskListId: Number(taskListId), taskListItemId });

    taskListItemHandlers.setState((prev) => prev.filter((item) => item.id !== taskListItemId));
  };

  const taskListItemStatusHandler = async (id: number, isCompleted: boolean) => {
    taskListItemHandlers.setState((prev) => prev.map((item) => (item.id === id ? { ...item, isCompleted } : item)));

    await updateStatusTaskListItem.mutateAsync({
      taskListId: Number(taskListId),
      id,
      isCompleted,
    });
  };

  // Task List Modal
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

  return (
    <>
      <UpdateTaskListModal
        onClose={closeModal}
        isOpen={isModalOpen}
        taskList={{
          taskListId: taskListDetails.id,
          name: taskListDetails.name,
          description: taskListDetails.description,
          categoryName: categoryName,
        }}
      />

      <Paper p={16} radius="md" mt={16} withBorder>
        <Stack gap={2} mb={16}>
          <Group justify="space-between" align="center">
            <Title>{taskListDetails.name}</Title>
            <UpdateAndDeleteMenu onUpdate={openModal} onDelete={onDeleteTaskListHandler} />
          </Group>
          <Text c="dimmed">{taskListDetails.description}</Text>
          <TaskListItemControls />
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
              <CreateTaskListItemButton isCreating={isCreating} onCreate={showCreateTaskListItemHandler} />
            </Group>
          </Stack>
        </Stack>

        {/* Show Create Task Input (Only if nothing is being edited) */}
        {isCreating && !itemToUpdate && (
          <UpsertTaskListItem
            onCreate={createTaskListItemHandler}
            taskListId={taskListDetails.id}
            isActive={isCreating}
            onClose={closeCreateTaskListItemHandler}
          />
        )}

        {/* Render Task Items */}
        <DragDropContext onDragEnd={taskListItemDragEndHandler}>
          <Droppable droppableId="task-list" direction="vertical">
            {(provided) => (
              <Stack {...provided.droppableProps} ref={provided.innerRef} gap={6}>
                {taskListItems.map((item, index) => (
                  <Draggable key={index} draggableId={String(item.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                        }}
                      >
                        <div {...provided.dragHandleProps} onDoubleClick={() => showUpdateTaskListItemHandler(item)}>
                          {itemToUpdate?.id === item.id ? (
                            <UpsertTaskListItem
                              isActive={true}
                              taskListId={Number(taskListId)}
                              taskListItem={item}
                              onClose={closeUpdateTaskListItemHandler}
                              onUpdate={updateTaskListItemHandler}
                            />
                          ) : (
                            <ListItem
                              item={item}
                              onDelete={deleteTaskListItemHandler}
                              onChange={taskListItemStatusHandler}
                            />
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
      </Paper>
    </>
  );
}

export default TaskListDetailsPage;
