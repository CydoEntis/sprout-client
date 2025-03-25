import { AppShell, Burger, Container, rem } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import { LazyLayoutProps } from "../layout.types";
import { useDisclosure } from "@mantine/hooks";

import styles from "./lazy-horizontal-layout.module.css";

function LazyHorizontalLayout({ children }: LazyLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell padding="md" navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}>
      <AppShell.Header bg="secondary" className={styles.header}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Container size="md">{children}</Container>
      </AppShell.Header>

      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        <Container size="md" pt={32}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default LazyHorizontalLayout;
