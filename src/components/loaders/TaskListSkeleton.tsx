import { useParams } from "@tanstack/react-router";
import useLoadingManagerStore from "../../stores/useLoadingManagerStore";
import GridList from "../GridList";
import { Skeleton } from "@mantine/core";

type TaskListSkeleton = {
  numberOfSkeletons: number;
  skeletons: number;
};

function TaskListSkeleton() {
  const { categoryName } = useParams({ from: "/categories/$categoryName" });
  const { skeletonCounts } = useLoadingManagerStore();

  const numOfSkeletons = skeletonCounts[categoryName] || 0;

  console.log(numOfSkeletons);

  return (
    <GridList>
      {[...Array(numOfSkeletons)].map((_, index) => (
        <Skeleton key={index} height={235} />
      ))}
    </GridList>
  );
}

export default TaskListSkeleton;
