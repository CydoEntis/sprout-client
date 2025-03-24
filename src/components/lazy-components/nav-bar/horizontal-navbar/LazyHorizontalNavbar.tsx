import { Box, Flex, FlexProps, Group } from "@mantine/core";
import React from "react";


type LazyHorizontalNavbarProps = {
  logo: React.ReactNode;
  navbar?: React.ReactNode;
  bg?: string;
} & FlexProps;

function LazyHorizontalNavbar({ logo, navbar, bg, ...props }: LazyHorizontalNavbarProps) {
  return (
    <Box w="100%" py={16} bg={bg}>
      <Flex {...props}>
        {logo}

        <Group gap={8}>{navbar}</Group>
      </Flex>
    </Box>
  );
}

export default LazyHorizontalNavbar;
