import { Flex, FlexProps, Group } from "@mantine/core";
import React from "react";

type LazyNavbarProps = {
    logo: React.ReactNode;
    children?: React.ReactNode;
} & FlexProps;

{/* <Title size="1.5rem">Task Garden</Title> */}
// justify="space-between" mb={32}
function LazyNavbar({logo, children, ...props}: LazyNavbarProps) {
  return (
    <Flex {...props}>
      {logo}

      <Group gap={8}>
        {children}
      </Group>
    </Flex>
  );
}

export default LazyNavbar;
