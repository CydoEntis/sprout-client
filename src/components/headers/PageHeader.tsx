import { Box, Container, Divider, Flex, Title } from "@mantine/core";
import React from "react";

type PageHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <Container p={0} pb={16} w="100%">
      <Flex justify="space-between" align="center">
        <Title>{title}</Title>
        {children}
      </Flex>
      <Box h={3} bg="dimmed" w="100%" mt={16}></Box>
    </Container>
  );
}

export default PageHeader;
