import { SimpleGrid } from "@mantine/core";
import { ReactNode } from "react";

type GridListProps = {
  children: ReactNode;
};

function GridList({ children }: GridListProps) {
  return <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>{children}</SimpleGrid>;
}

export default GridList;
