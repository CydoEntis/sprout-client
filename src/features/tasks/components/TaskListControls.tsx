import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { useDeleteTaskListMutation } from "../services/delete-task-list.service";

type TaskListControlsProps = {
  taskListId: number;
  categoryName: string;
};

function TaskListControls({ taskListId, categoryName }: TaskListControlsProps) {
  const navigate = useNavigate();

  const deleteTaskList = useDeleteTaskListMutation();
  const onDeleteHandler = async () => {
    await deleteTaskList.mutateAsync(taskListId);
    navigate({ to: `/categories/${categoryName}` });
  };

  return <div>TaskListControls</div>;
}

export default TaskListControls;
