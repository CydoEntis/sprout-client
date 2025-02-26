import { Text } from "@mantine/core";
import { CategoryColor } from "../shared/category.types";
type CategoryTaskListCountProps = {
  color: CategoryColor;
  count: number;
};

function CategoryTaskListCount({color, count}: CategoryTaskListCountProps) {
  return (
    <Text size="sm" c="dimmed">
      You have{" "}
      <Text span fw={700} className="underline" c={color}>
        {count}
      </Text>{" "}
      {count === 1 ? " active list" : " active lists"}
    </Text>
  );
}

export default CategoryTaskListCount;
