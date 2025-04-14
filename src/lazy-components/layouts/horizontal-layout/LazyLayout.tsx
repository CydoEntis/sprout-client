import { AppShell, Burger, Container, Flex, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Outlet } from "@tanstack/react-router";

export type LazyLayoutProps = {
  children?: React.ReactNode;
  isSidebarOpened: boolean;
  onToggle: () => void;
  navbar: React.ReactNode;
};

function LazyLayout({ children, isSidebarOpened, onToggle, navbar }: LazyLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 425px)");

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{
        width: isMobile ? 300 : 0,
        breakpoint: "sm",
        collapsed: { mobile: !isSidebarOpened },
      }}
      padding={{ base: 0, sm: 0, md: "xs" }}
    >
      <AppShell.Header bg="primary.9" withBorder={false}>
        <Container size="md" py={8}>
          <Flex justify="space-between" align="center">
            {children}
            {isMobile && <Burger opened={isSidebarOpened} onClick={onToggle} hiddenFrom="sm" size="sm" />}
          </Flex>
        </Container>
      </AppShell.Header>

      {isMobile && (
        <AppShell.Navbar bg="primary.9" p={16} hidden={!isSidebarOpened}>
          {navbar}
        </AppShell.Navbar>
      )}

      <AppShell.Main bg="secondary.9" pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default LazyLayout;
