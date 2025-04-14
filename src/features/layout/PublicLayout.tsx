import { Flex, Stack, Title } from "@mantine/core";
import { useRouterState } from "@tanstack/react-router";

import LazyLayout from "../../lazy-components/layouts/horizontal-layout/LazyLayout";
import LazyNavLink from "../../lazy-components/nav-link/LazyNavLink";
import ThemeToggle from "../../components/theme/ThemeToggle";
import LazyIcon from "../../lazy-components/icons/LazyIcon";
import { Sprout } from "lucide-react";

import styles from "./layout.module.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

function PublicLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isMobile = useMediaQuery("(max-width: 425px)");
  const [isSidebarOpened, { toggle: toggleSidebar }] = useDisclosure();

  return (
    <LazyLayout
      isSidebarOpened={isSidebarOpened}
      onToggle={toggleSidebar}
      navbar={
        <Stack gap={16}>
          <LazyNavLink
            to="/login"
            className={styles.navlink}
            activeClassName={styles.active}
            active={pathname === "/login"}
          >
            Login
          </LazyNavLink>
          <LazyNavLink
            to="/register"
            className={styles.navlink}
            activeClassName={styles.active}
            active={pathname === "/register"}
          >
            Register
          </LazyNavLink>
          <ThemeToggle />
        </Stack>
      }
    >
      <Flex direction="row" justify="space-between" align="center" gap={8} style={{ width: "100%" }}>
        <Flex gap={8} align="center" direction="row">
          <LazyIcon icon={<Sprout color="#A9E34B" />} backgroundColor="lime" />
          <Title size="1.45rem">Sprout</Title>
        </Flex>
        {!isMobile && (
          <Flex gap={8} direction="row" align="flex-end">
            <LazyNavLink
              to="/login"
              className={styles.navlink}
              activeClassName={styles.active}
              active={pathname === "/login"}
            >
              Login
            </LazyNavLink>
            <LazyNavLink
              to="/register"
              className={styles.navlink}
              activeClassName={styles.active}
              active={pathname === "/register"}
            >
              Register
            </LazyNavLink>
            <ThemeToggle />
          </Flex>
        )}
      </Flex>
    </LazyLayout>
  );
}

export default PublicLayout;
