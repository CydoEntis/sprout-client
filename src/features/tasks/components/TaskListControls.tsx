import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { useDeleteTasklistMutation } from "../services/task-list/delete-task-list.service";

type TasklistControlsProps = {
  TasklistId: number;
  categoryName: string;
};

function TasklistControls({ TasklistId, categoryName }: TasklistControlsProps) {
  const navigate = useNavigate();

  const deleteTasklist = useDeleteTasklistMutation();
  const onDeleteHandler = async () => {
    await deleteTasklist.mutateAsync(TasklistId);
    navigate({ to: `/categories/${categoryName}` });
  };

  return <div>TasklistControls</div>;
}

export default TasklistControls;
