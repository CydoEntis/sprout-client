import { useNavigate, useParams } from "@tanstack/react-router";
import { useDeleteTasklistMutation } from "../services/task-list/delete-task-list.service";
import { TasklistDetails } from "../../task-list-details/shared/task-list-details.types";

export function useTasklistHandlers(TasklistDetails: TasklistDetails) {
  const { categoryName } = useParams({ from: "/_authenticated/categories/$categoryName_/$tasklistId" });
  const navigate = useNavigate();
  const deleteTasklist = useDeleteTasklistMutation();

  const onDeleteTasklist = async () => {
    await deleteTasklist.mutateAsync(TasklistDetails.id);
    navigate({ to: `/categories/${categoryName}` });
  };

  return { onDeleteTasklist };
}
