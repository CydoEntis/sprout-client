import { useEffect, useState } from "react";
import { useListState } from "@mantine/hooks";
import { useParams } from "@tanstack/react-router";
import { useCreateTasklistItemMutation } from "../services/task-list-items/create-task-list-item.service";
import { useUpdateTasklistItemMutation } from "../services/task-list-items/update-task-list-item.service";
import { useReorderTasklistItemsMutation } from "../services/task-list-items/reorder-task-list-item.service";
import { useUpdateTasklistStatusItemMutation } from "../services/task-list-items/update-status-task-list.service";
import { useDeleteTasklistItemMutation } from "../services/task-list-items/delete-task-list-item.service";
import { CreateTasklistItem, TasklistItem, UpdateTasklistItem } from "../shared/tasks.types";

export function useTasklistItemHandlers(initialItems: TasklistItem[]) {
  const { tasklistId } = useParams({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });

  // Ensure state updates correctly
  const [tasklistItems, tasklistItemHandlers] = useListState(initialItems);
  const [editingState, setEditingState] = useState<{ itemToUpdate: TasklistItem | null; isCreating: boolean }>({
    itemToUpdate: null,
    isCreating: false,
  });

  useEffect(() => {
    console.log("Initializing tasklistItems:", initialItems);
    tasklistItemHandlers.setState(initialItems);
  }, [initialItems]);

  const createTasklistItem = useCreateTasklistItemMutation();
  const updateTasklistItem = useUpdateTasklistItemMutation();
  const reorderTasklistItems = useReorderTasklistItemsMutation();
  const updateStatusTasklistItem = useUpdateTasklistStatusItemMutation(Number(tasklistId));
  const deleteTasklistItem = useDeleteTasklistItemMutation();

  const createItem = async (newItem: CreateTasklistItem) => {
    const result = await createTasklistItem.mutateAsync(newItem);
    tasklistItemHandlers.insert(0, result.tasklistItemDetail as TasklistItem);
  };

  const updateItem = async (updatedItem: UpdateTasklistItem) => {
    console.log("Updating item:", updatedItem);
    await updateTasklistItem.mutateAsync(updatedItem);
    tasklistItemHandlers.setState((prev) =>
      prev.map((taskItem) => (taskItem.id === updatedItem.id ? { ...taskItem, ...updatedItem } : taskItem))
    );
  };

  const deleteItem = async (tasklistItemId: number) => {
    await deleteTasklistItem.mutateAsync({ tasklistId: Number(tasklistId), tasklistItemId });
    tasklistItemHandlers.setState((prev) => prev.filter((item) => item.id !== tasklistItemId));
  };

  const toggleItemStatus = async (id: number, isCompleted: boolean) => {
    tasklistItemHandlers.setState((prev) => prev.map((item) => (item.id === id ? { ...item, isCompleted } : item)));
    await updateStatusTasklistItem.mutateAsync({ TasklistId: Number(tasklistId), id, isCompleted });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reorderItems = async ({ source, destination }: any) => {
    if (!destination) return;

    const reorderedItems = [...tasklistItems];
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    tasklistItemHandlers.setState(() => [...reorderedItems]);

    try {
      await reorderTasklistItems.mutateAsync({
        tasklistId: Number(tasklistId),
        items: reorderedItems.map((item, index) => ({ id: item.id, position: index })),
      });

      tasklistItemHandlers.setState(() => [...reorderedItems]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      tasklistItemHandlers.setState(initialItems);
    }
  };

  useEffect(() => {
    console.log("TasklistItems updated:", tasklistItems);
  }, [tasklistItems]);

  const showCreateItem = () => setEditingState({ itemToUpdate: null, isCreating: true });
  const showUpdateItem = (item: TasklistItem) => setEditingState({ itemToUpdate: item, isCreating: false });
  const closeItem = () => setEditingState({ itemToUpdate: null, isCreating: false });

  return {
    tasklistItems,
    createItem,
    updateItem,
    deleteItem,
    toggleItemStatus,
    reorderItems,
    closeItem,
    showCreateItem,
    showUpdateItem,
    editingState,
  };
}
