import { useState } from "react";
import { useListState } from "@mantine/hooks";
import { useParams } from "@tanstack/react-router";
import { useCreateTaskListItemMutation } from "../services/task-list-items/create-task-list-item.service";
import { useUpdateTaskListItemMutation } from "../services/task-list-items/update-task-list-item.service";
import { useReorderTaskListItemsMutation } from "../services/task-list-items/reorder-task-list-item.service";
import { useUpdateTaskListStatusItemMutation } from "../services/task-list-items/update-status-task-list.service";
import { useDeleteTaskListItemMutation } from "../services/task-list-items/delete-task-list-item.service";
import { CreateTaskListItem, TaskListItem } from "../shared/tasks.types";

export function useTaskListItemHandlers(initialItems: TaskListItem[]) {
  const { taskListId } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const [taskListItems, taskListItemHandlers] = useListState(initialItems);
  const [editingState, setEditingState] = useState<{ itemToUpdate: TaskListItem | null; isCreating: boolean }>({
    itemToUpdate: null,
    isCreating: false,
  });

  const createTaskListItem = useCreateTaskListItemMutation();
  const updateTaskListItem = useUpdateTaskListItemMutation();
  const reorderTaskListItems = useReorderTaskListItemsMutation();
  const updateStatusTaskListItem = useUpdateTaskListStatusItemMutation();
  const deleteTaskListItem = useDeleteTaskListItemMutation();

  const createItem = async (newItem: CreateTaskListItem) => {
    const result = await createTaskListItem.mutateAsync(newItem);
    taskListItemHandlers.append(result.item as TaskListItem);
  };

  const updateItem = async (updatedItem: TaskListItem) => {
    const updateRequest = { taskListId: Number(taskListId), ...updatedItem };
    await updateTaskListItem.mutateAsync(updateRequest);
    taskListItemHandlers.setState((prev) =>
      prev.map((taskItem) => (taskItem.id === updatedItem.id ? updatedItem : taskItem))
    );
  };

  const deleteItem = async (taskListItemId: number) => {
    await deleteTaskListItem.mutateAsync({ taskListId: Number(taskListId), taskListItemId });
    taskListItemHandlers.setState((prev) => prev.filter((item) => item.id !== taskListItemId));
  };

  const toggleItemStatus = async (id: number, isCompleted: boolean) => {
    taskListItemHandlers.setState((prev) => prev.map((item) => (item.id === id ? { ...item, isCompleted } : item)));
    await updateStatusTaskListItem.mutateAsync({ taskListId: Number(taskListId), id, isCompleted });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reorderItems = async ({ source, destination }: any) => {
    if (!destination) return;
    const newTaskListItems = [...taskListItems];
    const [movedItem] = newTaskListItems.splice(source.index, 1);
    newTaskListItems.splice(destination.index, 0, movedItem);

    taskListItemHandlers.setState(newTaskListItems);
    const reorderedItems = newTaskListItems.map((item, index) => ({ id: item.id, position: index }));
    await reorderTaskListItems.mutateAsync({ taskListId: Number(taskListId), items: reorderedItems });
  };

  const showCreateItem = () => setEditingState({ itemToUpdate: null, isCreating: true });
  const showUpdateItem = (item: TaskListItem) => setEditingState({ itemToUpdate: item, isCreating: false });
  const closeItem = () => setEditingState({ itemToUpdate: null, isCreating: false });

  return {
    taskListItems,
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
