import { Flex, FlexProps, Text } from "@mantine/core";
import React from "react";

type PageHeaderProps = {
  children?: React.ReactNode;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  textAlign?: React.CSSProperties["textAlign"];
} & FlexProps;

function PageHeader({
  leftSection,
  rightSection,
  children,
  textAlign = "left",
  align = "center",
  justify = "center",
  w = "100%",
  h = "auto",
  gap = 8,
  ...rest
}: PageHeaderProps) {
  return (
    <Flex justify={justify} align={align} w={w} h={h} gap={gap} {...rest}>
      {leftSection && <div>{leftSection}</div>}

      <div style={{ flex: 1, textAlign }}>{typeof children === "string" ? <Text>{children}</Text> : children}</div>

      {rightSection && <div>{rightSection}</div>}
    </Flex>
  );
}

export default PageHeader;
