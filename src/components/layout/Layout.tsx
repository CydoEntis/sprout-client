import { Anchor, Box, Container, Flex, Group, Title } from "@mantine/core";
import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import { Outlet } from "@tanstack/react-router";
import useAuthStore from "../../stores/useAuthStore";
import { CustomLink } from "../CustomLink";

function Layout() {
  const { user } = useAuthStore();
  return (
    <Box bg="primary" mih="100vh">
      <Container size="md" py={16}>
        <Flex justify="space-between" mb={32}>
          <Title size="1.5rem">Task Garden</Title>

          <Group>
            {user ? (
              <>
                <Anchor c="inverse">Tasks</Anchor>
                <Anchor c="inverse">Garden</Anchor>
                <Anchor
                  c="inverse"
                  onClick={() => useAuthStore.getState().logoutUser()}
                >
                  Logout
                </Anchor>
              </>
            ) : (
              <>
                <CustomLink to={"/login"}>
                  <Anchor c="inverse">Login</Anchor>
                </CustomLink>
                <CustomLink to={"/register"}>
                  <Anchor c="inverse">Register</Anchor>
                </CustomLink>
              </>
            )}
            <ThemeToggle />
          </Group>
        </Flex>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
