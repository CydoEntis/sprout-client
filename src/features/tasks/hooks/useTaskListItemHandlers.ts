import { useEffect, useState } from "react";
import { useListState } from "@mantine/hooks";
import { useParams, useSearch } from "@tanstack/react-router";
import { useCreateTaskListItemMutation } from "../services/task-list-items/create-task-list-item.service";
import { useUpdateTaskListItemMutation } from "../services/task-list-items/update-task-list-item.service";
import { useReorderTaskListItemsMutation } from "../services/task-list-items/reorder-task-list-item.service";
import { useUpdateTaskListStatusItemMutation } from "../services/task-list-items/update-status-task-list.service";
import { useDeleteTaskListItemMutation } from "../services/task-list-items/delete-task-list-item.service";
import { CreateTaskListItem, TaskListItem, UpdateTaskListItem } from "../shared/tasks.types";

export function useTaskListItemHandlers(initialItems: TaskListItem[]) {
  const { tasklistId } = useParams({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
  const searchParams = useSearch({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });

  // Ensure state updates correctly
  const [tasklistItems, tasklistItemHandlers] = useListState(initialItems);
  const [editingState, setEditingState] = useState<{ itemToUpdate: TaskListItem | null; isCreating: boolean }>({
    itemToUpdate: null,
    isCreating: false,
  });

  useEffect(() => {
    tasklistItemHandlers.setState(initialItems);
  }, [initialItems]);

  const createTaskListItem = useCreateTaskListItemMutation(searchParams.page || 1);
  const updateTaskListItem = useUpdateTaskListItemMutation(searchParams.page || 1);
  const reorderTaskListItems = useReorderTaskListItemsMutation(searchParams.page || 1);
  const updateStatusTaskListItem = useUpdateTaskListStatusItemMutation(Number(tasklistId), searchParams.page || 1);
  const deleteTaskListItem = useDeleteTaskListItemMutation(searchParams.page || 1);

  const createItem = async (newItem: CreateTaskListItem) => {
    const result = await createTaskListItem.mutateAsync(newItem);
    tasklistItemHandlers.insert(0, result.tasklistItemDetail as TaskListItem);
  };

  const updateItem = async (updatedItem: UpdateTaskListItem) => {
    await updateTaskListItem.mutateAsync(updatedItem);
    tasklistItemHandlers.setState((prev) =>
      prev.map((taskItem) => (taskItem.id === updatedItem.id ? { ...taskItem, ...updatedItem } : taskItem))
    );
  };

  const deleteItem = async (tasklistItemId: number) => {
    await deleteTaskListItem.mutateAsync({ tasklistId: Number(tasklistId), tasklistItemId });
    tasklistItemHandlers.setState((prev) => prev.filter((item) => item.id !== tasklistItemId));
  };

  const toggleItemStatus = async (id: number, isCompleted: boolean) => {
    tasklistItemHandlers.setState((prev) => prev.map((item) => (item.id === id ? { ...item, isCompleted } : item)));
    await updateStatusTaskListItem.mutateAsync({ tasklistId: Number(tasklistId), id, isCompleted });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reorderItems = async ({ source, destination }: any) => {
    if (!destination) return;

    const reorderedItems = [...tasklistItems];
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    tasklistItemHandlers.setState(() => [...reorderedItems]);

    try {
      await reorderTaskListItems.mutateAsync({
        tasklistId: Number(tasklistId),
        items: reorderedItems.map((item, index) => ({ id: item.id, position: index })),
      });

      tasklistItemHandlers.setState(() => [...reorderedItems]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      tasklistItemHandlers.setState(initialItems);
    }
  };

  const showCreateItem = () => setEditingState({ itemToUpdate: null, isCreating: true });
  const showUpdateItem = (item: TaskListItem) => setEditingState({ itemToUpdate: item, isCreating: false });
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
