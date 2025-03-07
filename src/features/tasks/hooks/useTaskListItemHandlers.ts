import { useState } from "react";
import { useListState } from "@mantine/hooks";
import { useParams } from "@tanstack/react-router";
import { useCreateTaskListItemMutation } from "../../task-list-item/services/create-task-list-item.service";
import { useUpdateTaskListItemMutation } from "../../task-list-item/services/update-task-list-item.service";
import { useReorderTaskListItemsMutation } from "../../task-list-item/services/reorder-task-list-item.service";
import { useUpdateTaskListStatusItemMutation } from "../../task-list-item/services/update-status-task-list.service";
import { useDeleteTaskListItemMutation } from "../../task-list-item/services/delete-task-list-item.service";
import { CreateTaskListItemRequest, TaskListItem } from "../../task-list-item/shared/task-list-item.types";

export function useTaskListItemHandlers(initialItems: TaskListItem[]) {
  const { taskListId } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const [taskListItems, taskListItemHandlers] = useListState(initialItems);
  const [itemToUpdate, setItemToUpdate] = useState<TaskListItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const createTaskListItem = useCreateTaskListItemMutation();
  const updateTaskListItem = useUpdateTaskListItemMutation();
  const reorderTaskListItems = useReorderTaskListItemsMutation();
  const updateStatusTaskListItem = useUpdateTaskListStatusItemMutation();
  const deleteTaskListItem = useDeleteTaskListItemMutation();

  const createItem = async (newItem: CreateTaskListItemRequest) => {
    const result = await createTaskListItem.mutateAsync(newItem);
    taskListItemHandlers.append({
      id: result.taskListItemDetail.id,
      description: result.taskListItemDetail.description,
      isCompleted: result.taskListItemDetail.isCompleted,
    });
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

  const toggleStatus = async (id: number, isCompleted: boolean) => {
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

  return {
    taskListItems,
    itemToUpdate,
    isCreating,
    createItem,
    updateItem,
    deleteItem,
    toggleStatus,
    reorderItems,
    setIsCreating,
    setItemToUpdate,
  };
}
