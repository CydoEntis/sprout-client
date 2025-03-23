import { Flex, Text } from "@mantine/core";
import React from "react";

type LazyHeaderProps = {
  children?: React.ReactNode;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  textAlign?: React.CSSProperties["textAlign"];
  width?: string | number;
  height?: string | number;
  gap?: number;
};

function LazyHeader({
  leftSection,
  rightSection,
  children,
  textAlign = "left",
  align = "center",
  justify = "center",
  width = "100%",
  height = "auto",
  gap = 8,
}: LazyHeaderProps) {
  return (
    <Flex justify={justify} align={align} w={width} h={height} gap={gap}>
      {leftSection && <div>{leftSection}</div>}

      <div style={{ flex: 1, textAlign }}>{typeof children === "string" ? <Text>{children}</Text> : children}</div>

      {rightSection && <div>{rightSection}</div>}
    </Flex>
  );
}

export default LazyHeader;
