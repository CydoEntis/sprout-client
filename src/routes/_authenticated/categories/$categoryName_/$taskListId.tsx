import { createFileRoute } from "@tanstack/react-router";
import TaskCardBody from "../../../features/Tasks2/TaskCardBody";

export const Route = createFileRoute("/categories/$categoryName_/$taskListId")({
  component: RouteComponent,
});

const temp = {
  id: 1,
  name: "Work",
  tasks: [
    { id: 1, description: "Finish the presentation", isCompleted: false },
    { id: 2, description: "Submit the report", isCompleted: true },
    { id: 3, description: "Call the client", isCompleted: false },
  ],
  taskStats: {
    totalTasks: 3,
    completedTasks: 2,
  },
  startDate: new Date("2025-01-14T09:00:00"),
  endDate: new Date("2025-01-14T17:00:00"),
  members: [
    { id: 1, username: "John Doe" },
    { id: 2, username: "Jane Doe" },
  ],
  crop: {
    id: 1,
    name: "Tomato",
    growthLevel: 5,
    maxGrowthLevel: 10,
    imageUrl: "placeholder.af",
  },
};

function RouteComponent() {
  return (
    <TaskCardBody
      isOpen={true}
      taskList={temp}
      onOpenAddTask={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
