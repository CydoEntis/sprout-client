import { Anchor, Box, Container, Flex, Group, Title } from "@mantine/core";
import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import { Outlet, useLocation } from "@tanstack/react-router"; // <-- useLocation here
import useAuthStore from "../../stores/useAuthStore";
import { CustomLink } from "../CustomLink";

function Layout() {
  const { user } = useAuthStore();
  const location = useLocation(); // Get current location (URL path)

  return (
    <Box bg="primary" mih="100vh">
      <Container size="md" py={16}>
        <Flex justify="space-between" mb={32}>
          <Title size="1.5rem">Task Garden</Title>

          <Group>
            {user ? (
              <>
                <CustomLink
                  to="/"
                  c="inverse"
                  href="/tasks"
                  style={{
                    fontWeight:
                      location.pathname === "/tasks" ? "bold" : "normal",
                  }}
                >
                  Tasks
                </CustomLink>

                <CustomLink
                  to="/"
                  c="inverse"
                  href="/tasks"
                  style={{
                    fontWeight:
                      location.pathname === "/tasks" ? "bold" : "normal",
                  }}
                >
                  Garden
                </CustomLink>
                <Anchor
                  c="inverse"
                  onClick={() => useAuthStore.getState().logoutUser()}
                >
                  Logout
                </Anchor>
              </>
            ) : (
              <>
                <CustomLink
                  to={"/login"}
                  c="inverse"
                  style={{
                    fontWeight:
                      location.pathname === "/login" ? "bold" : "normal",
                  }}
                >
                  Login
                </CustomLink>
                <CustomLink
                  to={"/register"}
                  c="inverse"
                  style={{
                    fontWeight:
                      location.pathname === "/register" ? "bold" : "normal",
                  }}
                >Register</CustomLink>
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
