import { Badge } from "@mantine/core";
import { calculateDaysAway } from "../../util/formatters";
import { getBadgeColor } from "../../util/colors";

type TaskDueDateProps = { dueDate: Date };




function TaskDueDate({ dueDate }: TaskDueDateProps) {
  const daysAway = calculateDaysAway(dueDate);
  const badgeColor = getBadgeColor(daysAway);

  return (
    <Badge variant="light" color={badgeColor}>
      {daysAway === 0
        ? "Due today"
        : daysAway > 0
        ? `Due in ${daysAway} day${daysAway > 1 ? "s" : ""}`
        : `${Math.abs(daysAway)} day${Math.abs(daysAway) > 1 ? "s" : ""} ago`}
    </Badge>
  );
}

export default TaskDueDate;
