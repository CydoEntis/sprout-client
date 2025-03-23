import { Anchor, Box, Container, Flex, Group, Title } from "@mantine/core";

import ThemeToggle from "../theme/ThemeToggle";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../../stores/useAuthStore";
import LocalStorageService from "../../services/localStorage.service";
import { logoutUser } from "../../features/auth/services/logout.service";
import LazyNavbar from "../lazy-components/nav-bar/LazyNavbar";
import LazyNavLink from "../lazy-components/nav-link/LazyNavLink";

import styles from "./navlink.module.css";

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
      <LazyNavbar justify="space-between" logo={<Title size="1.5rem">Task Garden</Title>} size="md" bg="secondary">
        <LazyNavLink to="/categories" className={styles.navlink} activeClassName={styles.active}>
          Categories
        </LazyNavLink>
        <LazyNavLink to="/garden" className={styles.navlink} activeClassName={styles.active}>
          Garden
        </LazyNavLink>
        <LazyNavLink to="/account" className={styles.navlink} activeClassName={styles.active}>
          Account
        </LazyNavLink>
        <LazyNavLink  className={styles.navlink} onClick={logoutHandler}>
          Logout
        </LazyNavLink>
        <ThemeToggle />
      </LazyNavbar>
      <Container size="md" py={32}>
        {/* {user ? (
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
        </LazyNavbar> */}
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
