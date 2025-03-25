import React, { ReactElement } from "react";
import { Paper } from "@mantine/core";
import { ValidColor } from "../../../util/types/valid-color.types";

type CategoryIconProps = {
  icon?: React.ReactNode;
  color: ValidColor;
};

function CategoryIcon({ icon, color }: CategoryIconProps) {
  return (
    <Paper p="xs" bg={color} radius="md" h={45}>
      {icon &&
        React.cloneElement(icon as ReactElement, {
          size: 25,
          color: "white",
        })}
    </Paper>
  );
}

export default CategoryIcon;
