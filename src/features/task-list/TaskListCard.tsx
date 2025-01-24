import { Box, Card, Flex } from "@mantine/core";
import { ReactNode } from "react";
import { CustomLink } from "../../components/CustomLink";

type TaskListCardProps = {
  borderPos: "left" | "bottom";
  color: string;
  children: ReactNode;
};

function TaskListCard({ borderPos, color, children }: TaskListCardProps) {
  if (borderPos == "left") {
    return (
      <CustomLink
        to={"/$taskListId"}
        params={{ taskListId: "123" }}
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
      to={"/$taskListId"}
      params={{ taskListId: "123" }}
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
