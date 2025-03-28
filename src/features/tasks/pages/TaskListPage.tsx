import { useDisclosure } from "@mantine/hooks";
import UpsertTasklistItem from "../components/UpsertTasklistItem";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import ListItem from "../components/list-item/ListItem";
import UpdateTasklistModal from "../components/UpdateTasklistModal";
import TasklistDetails from "../components/task-list-details/TasklistDetails";
import { useTasklistItemHandlers } from "../hooks/useTasklistItemHandlers";
import { Divider, Paper, Stack, Title } from "@mantine/core";
import { Tasklist } from "../shared/tasks.types";

type TasklistDetailsPageProps = {
  tasklist: Tasklist;
};

function TasklistDetailsPage({ tasklist }: TasklistDetailsPageProps) {
  const {
    TasklistItems,
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
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

  return (
    <>
      <Title>{tasklist.name}</Title>
      {/* <Divider my={16} size="md" color={tasklist.categoryDetails.color} /> */}

      <DragDropContext onDragEnd={reorderItems}>
        <Droppable droppableId="task-list" direction="vertical">
          {(provided) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef} gap={16}>
              {tasklist.tasklistItems.map((item, index) => (
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
                          <UpsertTasklistItem
                            isActive={true}
                            TasklistId={tasklist.id}
                            TasklistItem={item}
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
    </>
    // <>
    //   <UpdateTasklistModal onClose={closeModal} isOpen={isModalOpen} Tasklist={Tasklist} />
    //   <Paper bg="secondary" p={16} radius="md" mt={16} withBorder>
    //     <TasklistDetails
    //       Tasklist={Tasklist}
    //       onUpdate={function (): void {
    //         throw new Error("Function not implemented.");
    //       }}
    //       onDelete={function (): void {
    //         throw new Error("Function not implemented.");
    //       }}
    //     />

    //     {/* Show Create Task Input (Only if nothing is being edited) */}
    //     {/* {isCreating && !itemToUpdate && (
    //       <UpsertTasklistItem
    //         onCreate={createTasklistItemHandler}
    //         TasklistId={TasklistDetails.id}
    //         isActive={isCreating}
    //         onClose={closeCreateTasklistItemHandler}
    //       />
    //     )} */}

    //     {/* Render Task Items */}

    //   </Paper>
    // </>
  );
}

export default TasklistDetailsPage;
