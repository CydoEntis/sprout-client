import { TaskListItemsDueThisWeekByCategory } from "../task-list/shared/tasks.types";
import ComingUpCard from "./ComingUpCard";

type ComingUpListProps = {
  items: TaskListItemsDueThisWeekByCategory[];
  onChange: (itemid: number, taskListId: number, isCompleted: boolean) => void;
};

function getColorByDaysAway(date: Date): string {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 1) return "red";
  if (diffDays <= 3) return "orange";
  if (diffDays <= 5) return "yellow";
  return "lime";
}

function ComingUpList({ items, onChange }: ComingUpListProps) {
  console.log(items);

  return (
    <>
      {items.map((item) => {
        const totalTasks = item.categories.reduce((count, category) => count + category.items.length, 0);
        const urgencyColor = getColorByDaysAway(new Date(item.date));
        console.log(item);
        return (
          <ComingUpCard
            key={item.date.toString()}
            item={item}
            urgencyColor={urgencyColor}
            totalTasks={totalTasks}
            onChange={onChange}
          />
        );
      })}
    </>
  );
}

export default ComingUpList;
