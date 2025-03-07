import { useNavigate, useParams } from "@tanstack/react-router";
import { useDeleteTaskListMutation } from "../services/task-list/delete-task-list.service";
import { TaskListDetails } from "../../task-list-details/shared/task-list-details.types";

export function useTaskListHandlers(taskListDetails: TaskListDetails) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$taskListId" });
  const navigate = useNavigate();
  const deleteTaskList = useDeleteTaskListMutation();

  const onDeleteTaskList = async () => {
    await deleteTaskList.mutateAsync(taskListDetails.id);
    navigate({ to: `/categories/${categoryName}` });
  };

  return { onDeleteTaskList };
}
