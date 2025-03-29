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
  const [tasklistItems, tasklistItemHandlers] = useListState(initialItems);
  const [editingState, setEditingState] = useState<{ itemToUpdate: TasklistItem | null; isCreating: boolean }>({
    itemToUpdate: null,
    isCreating: false,
  });

  useEffect(() => {
    tasklistItemHandlers.setState(initialItems);
  }, [initialItems, tasklistItemHandlers]);

  const createTasklistItem = useCreateTasklistItemMutation();
  const updateTasklistItem = useUpdateTasklistItemMutation();
  const reorderTasklistItems = useReorderTasklistItemsMutation();
  const updateStatusTasklistItem = useUpdateTasklistStatusItemMutation();
  const deleteTasklistItem = useDeleteTasklistItemMutation();

  const createItem = async (newItem: CreateTasklistItem) => {
    const result = await createTasklistItem.mutateAsync(newItem);
    tasklistItemHandlers.append(result.tasklistItemDetail as TasklistItem);
  };

  const updateItem = async (updatedItem: UpdateTasklistItem) => {
    console.log("CAlling???");
    await updateTasklistItem.mutateAsync(updatedItem);
    tasklistItemHandlers.setState((prev) =>
      prev.map((taskItem) => (taskItem.id === updatedItem.id ? updatedItem : taskItem))
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
    const newTasklistItems = [...tasklistItems];
    const [movedItem] = newTasklistItems.splice(source.index, 1);
    newTasklistItems.splice(destination.index, 0, movedItem);

    tasklistItemHandlers.setState(newTasklistItems);
    const reorderedItems = newTasklistItems.map((item, index) => ({ id: item.id, position: index }));
    await reorderTasklistItems.mutateAsync({ TasklistId: Number(tasklistId), items: reorderedItems });
  };

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
