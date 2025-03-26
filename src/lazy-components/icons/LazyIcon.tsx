import React, { ReactElement } from "react";
import { Paper } from "@mantine/core";

type LazyIconProps = {
  icon?: React.ReactNode;
  iconColor?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  hasBackground?: boolean;
  backgroundColor?: string;
};

const sizeMap = {
  xs: 16,
  sm: 20,
  md: 25,
  lg: 30,
  xl: 35,
};

function LazyIcon({
  icon,
  iconColor = "red",
  size = "md",
  hasBackground = false,
  backgroundColor = "transparent",
}: LazyIconProps) {
  const iconSize = sizeMap[size];

  return (
    <Paper
      p="xs"
      bg={hasBackground ? backgroundColor : "transparent"}
      radius="md"
      h={iconSize + 20}
      w={iconSize + 20}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {icon &&
        React.cloneElement(icon as ReactElement, {
          size: iconSize,
          color: iconColor,
        })}
    </Paper>
  );
}

export default LazyIcon;
