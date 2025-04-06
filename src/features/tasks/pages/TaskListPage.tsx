import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Button, Stack, Title, Text, Flex, Group, Paper, Pagination } from "@mantine/core";
import { Heart, List, Plus, Users } from "lucide-react";
import { motion } from "framer-motion"; // Import Framer Motion
import ListItem from "../components/list-item/ListItem";
import { TaskListDetails, TaskListItem } from "../shared/tasks.types";
import { useTaskListItemHandlers } from "../hooks/useTaskListItemHandlers";

import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import LazyEditDeleteMenu from "../../../lazy-components/menus/LazyEditDeleteMenu";
import { useDeleteTaskListMutation } from "../services/task-list/delete-task-list.service";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Paginated } from "../../../util/types/shared.types";
import { TaskListRole } from "../../invitation/shared/invite.schemas";
import MembersModal from "../../invitation/components/members-modal/MembersModal";
import { useFavoriteTaskListMutation } from "../services/task-list/favorite-task-list.service";
import UpsertTaskListItem from "../components/UpsertTasklistItem";
import TaskListMembers from "../components/TasklistMembers";
import UpdateTaskListModal from "../components/UpdateTaskListModal";

type TaskListDetailsPageProps = {
  tasklist: TaskListDetails;
  paginatedItems: Paginated<TaskListItem>;
};

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function TaskListDetailsPage({ tasklist, paginatedItems }: TaskListDetailsPageProps) {
  const { categoryName, tasklistId } = useParams({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
  const searchParams = useSearch({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
  const page = searchParams.page || 1;
  const navigate = useNavigate();

  const deleteTaskList = useDeleteTaskListMutation();
  const { mutateAsync: toggleFavorite } = useFavoriteTaskListMutation();

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
  } = useTaskListItemHandlers(paginatedItems.items);

  const [isUpdateTaskListModalOpened, { open: openUpdateTaskListModal, close: closeUpdateTaskListModal }] =
    useDisclosure(false);
  const [isManageMembersModalOpened, { open: openManageMembersModal, close: closeManageMembersModal }] =
    useDisclosure(false);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskListDetails>(tasklist);

  const handleDeleteTaskList = async () => {
    await deleteTaskList.mutateAsync(tasklist.id);
  };

  const openEditTaskListModal = (tasklist: TaskListDetails) => {
    setSelectedTaskList(tasklist);
    openUpdateTaskListModal();
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      to: `/categories/${categoryName}/${tasklist.id}`,
      search: { ...searchParams, page: newPage },
    });
  };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await toggleFavorite(tasklist.id);
    } catch (error) {
      console.error("Error favoriting tasklist:", error);
    }
  };

  console.log(tasklist);
  return (
    <>
      <UpdateTaskListModal
        isOpen={isUpdateTaskListModalOpened}
        onClose={closeUpdateTaskListModal}
        taskList={selectedTaskList}
        categoryName={categoryName}
      />

      <MembersModal
        isOpen={isManageMembersModalOpened}
        onClose={closeManageMembersModal}
        tasklistId={Number(tasklistId)}
        currentUserRole={tasklist.role}
      />

      <Paper
        bg="primary.9"
        p={16}
        radius="lg"
        style={{ borderBottom: `8px solid ${tasklist.categoryColor}` }}
        mb={16}
        shadow="md"
      >
        <Stack justify="space-between" gap={8}>
          <Stack gap={8}>
            <Flex justify="space-between">
              <Group gap={8}>
                <Heart
                  style={{ cursor: "pointer" }}
                  fill={tasklist.isFavorited ? "#E03131" : "none"}
                  color={tasklist.isFavorited ? "#E03131" : "gray"}
                  onClick={handleFavoriteToggle}
                />
                <Title>{tasklist.name}</Title>
              </Group>
              <LazyEditDeleteMenu
                withBorder
                withShadow
                shadow="md"
                dropdownColor="primary.5"
                direction="vertical"
                onUpdate={() => openEditTaskListModal(tasklist)}
                onDelete={handleDeleteTaskList}
              />
            </Flex>
            <Text c="dimmed">{tasklist.description}</Text>
          </Stack>

          <Flex justify="space-between" align="center">
            <TaskListMembers
              members={tasklist.members}
              size="md"
              additionalMemberCount={tasklist.additionalMemberCount}
            />
            {tasklist.role !== TaskListRole.Viewer && (
              <Button variant="subtle" color="gray" onClick={openManageMembersModal} leftSection={<Users size={20} />}>
                Manage Members
              </Button>
            )}
          </Flex>
        </Stack>
      </Paper>

      <Paper
        shadow="md"
        bg="primary.9"
        p={16}
        radius="lg"
        mih="70vh"
        pos="relative"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Stack justify="space-between" style={{ flexGrow: 1 }}>
          <Stack>
            <Flex justify="space-between" align="center" mb={24}>
              <Group>
                <List size={28} color="#82827F" />
                <Text c="dimmed">
                  {tasklist.completedTasksCount} of {tasklist.totalTasksCount} items completed
                </Text>
              </Group>
              <Button onClick={showCreateItem} leftSection={<Plus size={20} />} color="lime">
                New Item
              </Button>
            </Flex>

            <DragDropContext onDragEnd={reorderItems}>
              <Droppable droppableId="task-list" direction="vertical">
                {(provided) => (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Stack gap={16}>
                      {isCreating && (
                        <UpsertTaskListItem
                          onCreate={createItem}
                          tasklistId={tasklist.id}
                          isActive={isCreating}
                          onClose={closeItem}
                        />
                      )}
                      {tasklistItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                          {(provided) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={provided.draggableProps.style}
                              variants={itemVariants}
                            >
                              <div {...provided.dragHandleProps} onDoubleClick={() => showUpdateItem(item)}>
                                {itemToUpdate?.id === item.id ? (
                                  <UpsertTaskListItem
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
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Stack>
                  </motion.div>
                )}
              </Droppable>
            </DragDropContext>
          </Stack>

          <Flex justify="space-between" w="100%" align="center" style={{ marginTop: "auto" }}>
            <Text c="dimmed">
              {page} of {paginatedItems.totalPages}
            </Text>
            {paginatedItems.totalPages > 1 && (
              <Pagination
                color="lime"
                value={page}
                onChange={handlePageChange}
                total={paginatedItems.totalPages}
                style={{ flexShrink: 0 }}
              />
            )}
          </Flex>
        </Stack>
      </Paper>
    </>
  );
}

export default TaskListDetailsPage;
