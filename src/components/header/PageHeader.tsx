import { Flex, FlexProps, Text, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

type PageHeaderProps = {
  children?: React.ReactNode;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  textAlign?: React.CSSProperties["textAlign"];
} & FlexProps;

function PageHeader({ leftSection, rightSection, children, textAlign = "left", ...rest }: PageHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 425px)");

  return (
    <Flex
      direction={isMobile ? "column" : "row"}
      justify={isMobile ? "flex-start" : "space-between"}
      align={isMobile ? "stretch" : "center"}
      w="100%"
      gap={isMobile ? "sm" : "md"}
      {...rest}
    >
      <Box>{leftSection}</Box>

      <Box style={{ flex: 1, textAlign }}>
        {typeof children === "string" ? <Text size="lg">{children}</Text> : children}
      </Box>

      {rightSection && <Box>{rightSection}</Box>}
    </Flex>
  );
}

export default PageHeader;
