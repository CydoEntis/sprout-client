import { Box, Container, Flex, FlexProps, Group } from "@mantine/core";
import React from "react";

type LazyNavbarProps = {
  logo: React.ReactNode;
  children?: React.ReactNode;
  size: "xs" | "sm" | "md" | "lg" | "xl" | number;
  bg?: string;
} & FlexProps;

function LazyNavbar({ logo, children, size, bg, ...props }: LazyNavbarProps) {
  return (
    <Box w="100%" py={16} bg={bg}>
      <Container size={size}>
        <Flex {...props}>
          {logo}

          <Group gap={8}>{children}</Group>
        </Flex>
      </Container>
    </Box>
  );
}

export default LazyNavbar;
