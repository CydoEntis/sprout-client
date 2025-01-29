import GridList from "../GridList";
import { Skeleton } from "@mantine/core";

type LoadingSkeletonProps = {
  numberOfSkeletons: number;
  height: number;
};

function LoadingSkeleton({ numberOfSkeletons, height }: LoadingSkeletonProps) {
  return (
    <GridList>
      {[...Array(numberOfSkeletons)].map((_, index) => (
        <Skeleton key={index} height={height} />
      ))}
    </GridList>
  );
}

export default LoadingSkeleton;
