import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Button, Stack, Title, Text, Flex, Group, Paper, Pagination } from "@mantine/core";
import { List, Plus } from "lucide-react";
import { motion } from "framer-motion"; // Import Framer Motion
import ListItem from "../components/list-item/ListItem";
import { TasklistDetails, TasklistItem } from "../shared/tasks.types";
import { useTasklistItemHandlers } from "../hooks/useTaskListItemHandlers";
import UpsertTasklistItem from "../components/UpsertTasklistItem";
import TasklistMembers from "../components/TasklistMembers";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import UpdateTasklistModal from "../components/update-task-list/UpdateTasklistModal";
import LazyEditDeleteMenu from "../../../lazy-components/menus/LazyEditDeleteMenu";
import { useDeleteTasklistMutation } from "../services/task-list/delete-task-list.service";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Paginated } from "../../../util/types/shared.types";
import { TaskListRole } from "../../invitation/shared/invite.schemas";
import MembersModal from "../../invitation/components/members-modal/MembersModal";

type TasklistDetailsPageProps = {
  tasklist: TasklistDetails;
  paginatedItems: Paginated<TasklistItem>;
};

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each item will animate in with a 100ms delay
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function TasklistDetailsPage({ tasklist, paginatedItems }: TasklistDetailsPageProps) {
  const { categoryName, tasklistId } = useParams({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
  const searchParams = useSearch({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
  const page = searchParams.page || 1;
  const navigate = useNavigate();

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
  } = useTasklistItemHandlers(paginatedItems.items);

  const [isUpdateTasklistModalOpened, { open: openUpdateTasklistModal, close: closeUpdateTasklistModal }] =
    useDisclosure(false);
  const [isInviteMembersModalOpened, { open: openInviteMembersModal, close: closeInviteMembersModal }] =
    useDisclosure(false);
  const [selectedTasklist, setSelectedTasklist] = useState<TasklistDetails>(tasklist);

  const handleDeleteTasklist = async () => {
    await deleteTasklist.mutateAsync(tasklist.id);
  };

  const openEditTasklistModal = (tasklist: TasklistDetails) => {
    setSelectedTasklist(tasklist);
    openUpdateTasklistModal();
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      to: `/categories/${categoryName}/${tasklist.id}`,
      search: { ...searchParams, page: newPage },
    });
  };

  console.log(tasklist)
  return (
    <>
      <UpdateTasklistModal
        isOpen={isUpdateTasklistModalOpened}
        onClose={closeUpdateTasklistModal}
        tasklist={selectedTasklist}
        categoryName={categoryName}
      />

      <MembersModal
        isOpen={isInviteMembersModalOpened}
        onClose={closeInviteMembersModal}
        tasklistId={Number(tasklistId)}
        currentUserRole={tasklist.role}
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

          <Flex justify="space-between" align="center">
            <TasklistMembers members={tasklist.members} size="md" />
            {tasklist.membersRole !== TaskListRole.Viewer && (
              <Group>
                <Button color="gray" variant="subtle" onClick={openInviteMembersModal}>
                  Invite Users
                </Button>
                <Button color="gray" variant="subtle" onClick={openInviteMembersModal}>
                  Manage Users
                </Button>
              </Group>
            )}
          </Flex>
        </Stack>
      </Paper>

      <Paper
        bg="primary"
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
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={provided.draggableProps.style}
                              variants={itemVariants}
                            >
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

export default TasklistDetailsPage;
