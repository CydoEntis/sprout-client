import { Anchor, Box, Container, Flex, Group, Title } from "@mantine/core";
import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import { Outlet } from "@tanstack/react-router";

function Layout() {
  return (
    <Box bg="primary" mih="100vh">
      <Container size="md" py={16}>
        <Flex justify="space-between" mb={32}>
          <Title size="1.5rem">Task Garden</Title>

          <Group>
            <Anchor c="inverse">Tasks</Anchor>
            <Anchor c="inverse">Garden</Anchor>
            <ThemeToggle />
          </Group>
        </Flex>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
