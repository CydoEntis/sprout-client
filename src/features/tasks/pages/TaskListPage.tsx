import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Button, Stack, Title, Text, Flex, Group, Paper } from "@mantine/core";
import { List, Plus } from "lucide-react";

import ListItem from "../components/list-item/ListItem";
import { Tasklist, TasklistDetails } from "../shared/tasks.types";
import { useTasklistItemHandlers } from "../hooks/useTaskListItemHandlers";
import UpsertTasklistItem from "../components/UpsertTasklistItem";
import TasklistMembers from "../components/TasklistMembers";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import UpdateTasklistModal from "../components/update-task-list/UpdateTasklistModal";
import LazyEditDeleteMenu from "../../../lazy-components/menus/LazyEditDeleteMenu";
import { useDeleteTasklistMutation } from "../services/task-list/delete-task-list.service";
import { useParams } from "@tanstack/react-router";

type TasklistDetailsPageProps = {
  tasklist: TasklistDetails;
};

function TasklistDetailsPage({ tasklist }: TasklistDetailsPageProps) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
  const deleteTasklist = useDeleteTasklistMutation();
  const {
    tasklistItems,
    createItem,
    updateItem,
    deleteItem,
    reorderItems,
    toggleItemStatus,
    showCreateItem,
    showUpdateItem,
    closeItem,
    editingState: { itemToUpdate, isCreating },
  } = useTasklistItemHandlers(tasklist.tasklistItems);

  const [isUpdateTasklistModalOpened, { open: openUpdateTasklistModal, close: closeUpdateTasklistModal }] =
    useDisclosure(false);
  const [selectedTasklist, setSelectedTasklist] = useState<Tasklist>({
    id: tasklist.id,
    name: tasklist.name,
    description: tasklist.description,
  });

  const handleDeleteTasklist = async () => {
    await deleteTasklist.mutateAsync(tasklist.id);
  };

  const openEditTasklistModal = (tasklist: TasklistDetails) => {
    setSelectedTasklist({
      id: tasklist.id,
      name: tasklist.name,
      description: tasklist.description,
    });
    openUpdateTasklistModal();
  };

  return (
    <>
      <UpdateTasklistModal
        isOpen={isUpdateTasklistModalOpened}
        onClose={closeUpdateTasklistModal}
        tasklist={selectedTasklist}
        categoryName={categoryName}
      />
      <Paper bg="primary" p={16} radius="lg" style={{ borderBottom: `8px solid ${tasklist.categoryColor}` }} mb={16}>
        <Stack justify="space-between" gap={8}>
          <Stack gap={8}>
            <Flex justify="space-between">
              <Title>{tasklist.name}</Title>
              <LazyEditDeleteMenu
                withBorder
                withShadow
                shadow="md"
                dropdownColor="primary"
                direction="vertical"
                onUpdate={() => openEditTasklistModal(tasklist)}
                onDelete={handleDeleteTasklist}
              />
            </Flex>
            <Text c="dimmed">{tasklist.description}</Text>
          </Stack>

          <Group justify="end" align="center">
            <TasklistMembers members={tasklist.members} size="md" />
          </Group>
        </Stack>
      </Paper>

      <Paper bg="primary" p={16} radius="lg" mih="70vh" pos="relative">
        <Flex justify="space-between" align="center" mb={24}>
          <Group>
            <List size={28} color="#82827F" />
            <Text c="dimmed">
              {tasklist.completedTasksCount} of {tasklist.totalTasksCount} items remaining
            </Text>
          </Group>
          <Button onClick={showCreateItem} leftSection={<Plus size={20} />} color="lime">
            New Item
          </Button>
        </Flex>
        <DragDropContext onDragEnd={reorderItems}>
          <Droppable droppableId="task-list" direction="vertical">
            {(provided) => (
              <Stack {...provided.droppableProps} ref={provided.innerRef} gap={16}>
                {isCreating && (
                  <UpsertTasklistItem
                    onCreate={createItem}
                    tasklistId={tasklist.id}
                    isActive={isCreating}
                    onClose={closeItem}
                  />
                )}
                {tasklistItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} style={provided.draggableProps.style}>
                        <div {...provided.dragHandleProps} onDoubleClick={() => showUpdateItem(item)}>
                          {itemToUpdate?.id === item.id ? (
                            <UpsertTasklistItem
                              isActive={true}
                              tasklistId={tasklist.id}
                              tasklistItem={item}
                              onCreate={createItem}
                              onClose={closeItem}
                              onUpdate={updateItem}
                            />
                          ) : (
                            <ListItem item={item} onDelete={deleteItem} onChange={toggleItemStatus} />
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

export default TasklistDetailsPage;
