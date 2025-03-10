import { useDisclosure } from "@mantine/hooks";
import UpsertTaskListItem from "../components/UpsertTaskListItem";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import ListItem from "../components/list-item/ListItem";
import UpdateTaskListModal from "../components/UpdateTaskListModal";
import TaskListDetails from "../components/task-list-details/TaskListDetails";
import { useTaskListItemHandlers } from "../hooks/useTaskListItemHandlers";
import { TaskList } from "../shared/tasks.types";
import { Paper, Stack } from "@mantine/core";

type TaskListDetailsPageProps = {
  taskList: TaskList;
};

function TaskListDetailsPage({ taskList }: TaskListDetailsPageProps) {
  const {
    taskListItems,
    createItem,
    updateItem,
    deleteItem,
    reorderItems,
    toggleItemStatus,
    showCreateItem,
    showUpdateItem,
    closeItem,
    editingState: { itemToUpdate, isCreating },
  } = useTaskListItemHandlers(taskList.taskListItems);
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

  console.log(taskList.taskListItems);

  return (
    <>
      <UpdateTaskListModal onClose={closeModal} isOpen={isModalOpen} taskList={taskList} />
      <Paper bg="secondary" p={16} radius="md" mt={16} withBorder>
        <TaskListDetails
          taskList={taskList}
          onUpdate={function (): void {
            throw new Error("Function not implemented.");
          }}
          onDelete={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        {/* Show Create Task Input (Only if nothing is being edited) */}
        {/* {isCreating && !itemToUpdate && (
          <UpsertTaskListItem
            onCreate={createTaskListItemHandler}
            taskListId={taskListDetails.id}
            isActive={isCreating}
            onClose={closeCreateTaskListItemHandler}
          />
        )} */}

        {/* Render Task Items */}
        <DragDropContext onDragEnd={reorderItems}>
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
                        <div {...provided.dragHandleProps} onDoubleClick={() => showUpdateItem(item)}>
                          {itemToUpdate?.id === item.id ? (
                            <UpsertTaskListItem
                              isActive={true}
                              taskListId={taskList.id}
                              taskListItem={item}
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

export default TaskListDetailsPage;
