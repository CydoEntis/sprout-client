import { useNavigate, useParams } from "@tanstack/react-router";
import { useDeleteTaskListMutation } from "../services/task-list/delete-task-list.service";
import { TaskListDetails } from "../../task-list-details/shared/task-list-details.types";

export function useTaskListHandlers(TaskListDetails: TaskListDetails) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
  const navigate = useNavigate();
  const deleteTaskList = useDeleteTaskListMutation();

  const onDeleteTaskList = async () => {
    await deleteTaskList.mutateAsync(TaskListDetails.id);
    navigate({ to: `/categories/${categoryName}` });
  };

  return { onDeleteTaskList };
}
