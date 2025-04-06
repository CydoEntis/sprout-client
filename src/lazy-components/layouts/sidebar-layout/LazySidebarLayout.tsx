import { AppShell, Box, Container } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import { ReactNode } from "react";
import LazyBurger from "../../burger/LazyBurger";

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
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !isSidebarOpened } }}
      padding="md"
      withBorder={false}
    >
      {!isSidebarOpened && (
        <LazyBurger
          pos="fixed"
          top={10}
          left={10}
          p={5}
          style={{ zIndex: 1000 }}
          burgerProps={{
            opened: isSidebarOpened,
            onClick: onToggle,
            hiddenFrom: "sm",
            size: "sm",
          }}
        />
      )}

      <AppShell.Navbar bg="primary.9">
        <AppShell.Section>
          {isSidebarOpened && (
            <LazyBurger
              p={5}
              burgerProps={{
                opened: isSidebarOpened,
                onClick: onToggle,
                hiddenFrom: "sm",
                size: "sm",
              }}
            />
          )}
          <Box px={16} pt={16}>
            {logo}
          </Box>
        </AppShell.Section>
        {children}
      </AppShell.Navbar>

      <AppShell.Main bg="secondary.9" style={{ paddingTop: "50px" }}>
        <Container size="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default LazySidebarLayout;
