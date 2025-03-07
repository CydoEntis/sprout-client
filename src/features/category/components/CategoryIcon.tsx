import React, { ReactElement } from "react";
import { CategoryColor, CategoryIdentifier } from "../shared/category.types";
import { Paper } from "@mantine/core";

type CategoryIconProps = {
  category: CategoryIdentifier;
  color: CategoryColor;
};

function CategoryIcon({ category, color }: CategoryIconProps) {
  return (
    <Paper p="xs" bg={color} radius="md" h={45} >
      {category &&
        React.cloneElement(category.icon as ReactElement, {
          size: 25,
          color: "white",
        })}
    </Paper>
  );
}

export default CategoryIcon;
