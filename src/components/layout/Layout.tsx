import { Anchor, Box, Container, Flex, Group, Title } from "@mantine/core";

import ThemeToggle from "../theme/ThemeToggle";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../../stores/useAuthStore";
import { CustomLink } from "../CustomLink";
import LocalStorageService from "../../services/localStorage.service";
import { logoutUser } from "../../features/auth/services/logout.service";
import LazyNavbar from "../lazy-components/nav-bar/LazyNavbar";

function Layout() {
  const { user, logoutUser: logout } = useAuthStore();

  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser();
      logout();
      LocalStorageService.removeItem("taskgarden");
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box mih="100vh">
      <Container size="md" py={16}>
        <LazyNavbar justify="space-between" mb={32} logo={<Title size="1.5rem">Task Garden</Title>}>
          {user ? (
            <>
              <CustomLink
                to="/categories"
                c="inverse"
                style={{
                  fontWeight: location.pathname === "/categories" ? "bold" : "normal",
                }}
              >
                Categories
              </CustomLink>

              <Anchor c="inverse" onClick={logoutHandler}>
                Logout
              </Anchor>
            </>
          ) : (
            <>
              <CustomLink
                to="/login"
                c="inverse"
                style={{
                  fontWeight: location.pathname === "/login" ? "bold" : "normal",
                }}
              >
                Login
              </CustomLink>
              <CustomLink
                to="/register"
                c="inverse"
                style={{
                  fontWeight: location.pathname === "/register" ? "bold" : "normal",
                }}
              >
                Register
              </CustomLink>
            </>
          )}
          <ThemeToggle />
        </LazyNavbar>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
