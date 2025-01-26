import { Box, Paper, Title, Text, ActionIcon } from "@mantine/core";
import { ReactElement } from "react";
import React from "react";
import { CategoryResponse } from "./shared/category.types";
import { categoryIcons } from "./shared/category.constants";
import { CustomLink } from "../../components/CustomLink";
import { MoreVertical } from "lucide-react";

type CategoryCard = {
  // title: string;
  // icon: ReactNode;
  // unfinishedLists: number;
  category: CategoryResponse;
};

function CategoryCard({ category }: CategoryCard) {
  const foundCategory = categoryIcons.find(
    (c) => c.tag === category.categoryTag
  );

  return (
    <CustomLink
      c="inverse"
      to={"/category/$categoryName"}
      params={{ categoryName: category.categoryName.toLowerCase() }}
    >
      <Paper
        className="card"
        h={130}
        shadow="md"
        p="xl"
        radius="md"
        style={{ overflow: "hidden" }}
        pos="relative"
        bg="card"
      >
        <ActionIcon
          style={{
            zIndex: 100,
            position: "absolute",
            right: "2%",
            top: "5%",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Action icon clicked");
          }}
          variant="light"
          color="lime"
        >
          <MoreVertical size={16} />
        </ActionIcon>
        <Box
          style={{
            position: "absolute",
            bottom: "-25%",
            right: "-10%",
            transform: "rotate(-45deg)",
          }}
        >
          {foundCategory &&
            React.cloneElement(foundCategory.icon as ReactElement, {
              size: 100,
            })}
        </Box>
        <Box>
          <Title size="1.75rem">{category.categoryName}</Title>
          <Text size="sm" c="dimmed">
            {category.taskListCount === 1
              ? `${category.taskListCount} list`
              : `${category.taskListCount} lists`}
          </Text>
        </Box>
      </Paper>
    </CustomLink>
  );
}

export default CategoryCard;
