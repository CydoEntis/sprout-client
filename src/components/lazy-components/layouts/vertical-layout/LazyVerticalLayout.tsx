import { AppShell, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "@tanstack/react-router";

import styles from "./lazy-vertical-layout.module.css";
import { LazyLayoutProps } from "../layout.types";

function LazyVerticalLayout({ children }: LazyLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, lg: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className={styles.header}>
        <Group h="100%" px="md" bg="secondary">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg="secondary" className={styles.navbar}>
        {children}
      </AppShell.Navbar>
      <AppShell.Main>
        <Container size="90%">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default LazyVerticalLayout;
