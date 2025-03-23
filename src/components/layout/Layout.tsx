import { Box, Container, Title } from "@mantine/core";

import ThemeToggle from "../theme/ThemeToggle";
import { Outlet, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../../stores/useAuthStore";
import LocalStorageService from "../../services/localStorage.service";
import { logoutUser } from "../../features/auth/services/logout.service";
import LazyNavbar from "../lazy-components/nav-bar/LazyNavbar";
import LazyNavLink from "../lazy-components/nav-link/LazyNavLink";

import styles from "./navlink.module.css";

function Layout() {
  const { user, logoutUser: logout } = useAuthStore();
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
        {user ? (
          <>
            <LazyNavLink to="/categories" className={styles.navlink} activeClassName={styles.active}>
              Categories
            </LazyNavLink>
            <LazyNavLink to="/garden" className={styles.navlink} activeClassName={styles.active}>
              Garden
            </LazyNavLink>
            <LazyNavLink to="/account" className={styles.navlink} activeClassName={styles.active}>
              Account
            </LazyNavLink>
            <LazyNavLink className={styles.navlink} onClick={logoutHandler}>
              Logout
            </LazyNavLink>
          </>
        ) : (
          <>
            <LazyNavLink to="/login" className={styles.navlink} activeClassName={styles.active}>
              Login
            </LazyNavLink>
            <LazyNavLink to="/register" className={styles.navlink} activeClassName={styles.active}>
              Register
            </LazyNavLink>
          </>
        )}

        <ThemeToggle />
      </LazyNavbar>
      <Container size="md" py={32}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
