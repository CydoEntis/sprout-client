import { Box, Card, Flex } from "@mantine/core";
import { ReactNode } from "react";
import { CustomLink } from "../../../components/CustomLink";
import { useParams } from "@tanstack/react-router";

type TaskListCardProps = {
  borderPos: "left" | "bottom";
  color: string;
  children: ReactNode;
  taskListId: number;
};

function TaskListCard({
  borderPos,
  color,
  taskListId,
  children,
}: TaskListCardProps) {
  const { categoryName } = useParams({
    from: "/_authenticated/categories/$categoryName",
  });

  if (borderPos == "left") {
    return (
      <CustomLink
        to={"/categories/$categoryName/$taskListId"}
        params={{
          categoryName: categoryName,
          taskListId: taskListId.toString(),
        }}
        className="card"
      >
        <Card p={0} shadow="md" bg="secondary">
          <Flex>
            <Box bg={color} w={8} h="100%" />
            <Box p={16} flex="1">
              {children}
            </Box>
          </Flex>
        </Card>
      </CustomLink>
    );
  }

  return (
    <CustomLink
      to={"/categories/$categoryName/$taskListId"}
      params={{
        categoryName: categoryName,
        taskListId: taskListId.toString(),
      }}
      className="card"
    >
      <Card p={0} shadow="md" bg="secondary">
        <Box p={16}>{children}</Box>
        <Box bg={color} h={8}></Box>
      </Card>
    </CustomLink>
  );
}

export default TaskListCard;
