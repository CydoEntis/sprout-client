import { AppShell, Burger, Container, Flex } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import { ReactNode } from "react";

type LazySidebarLayoutProps = {
  isSidebarOpened: boolean;
  onToggle: () => void;
  logo?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

function LazySidebarLayout({ isSidebarOpened, onToggle, logo, children }: LazySidebarLayoutProps) {
  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !isSidebarOpened } }}
      padding={{ base: 0, sm: 0, md: "xs" }}
      withBorder={false}
    >
      <AppShell.Header>
        <Flex h="100%" justify="space-between" align="center" px={16}>
          {logo}
          <Burger opened={isSidebarOpened} onClick={onToggle} hiddenFrom="sm" size="sm" />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar bg="primary.9">{children}</AppShell.Navbar>

      <AppShell.Main py={25} h="100%">
        <Container size="xl" pt={60}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default LazySidebarLayout;
