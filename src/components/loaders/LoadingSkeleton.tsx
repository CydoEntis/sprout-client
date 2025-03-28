import { SimpleGrid, Skeleton } from "@mantine/core";

type LoadingSkeletonProps = {
  numberOfSkeletons: number;
  height: number;
};

function LoadingSkeleton({ numberOfSkeletons, height }: LoadingSkeletonProps) {
  return (
    <SimpleGrid cols={{ xs: 1, md: 2, lg: 4 }}>
      {[...Array(numberOfSkeletons)].map((_, index) => (
        <Skeleton key={index} height={height} />
      ))}
    </SimpleGrid>
  );
}

export default LoadingSkeleton;
