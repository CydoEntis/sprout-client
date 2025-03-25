import { AppShell, MantineColor, ScrollArea } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import React from "react";
import LazyBurger from "../../burger/LazyBurger";
import { LazyNavLinkItem } from "../../nav-link/sidebar-nav-link/lazy-sidebar-nav-link.types";
import LazySidebarNavLinkList from "../../nav-link/sidebar-nav-link/LazySidebarNavLinkList";

type LazySidebarLayoutProps = {
  isSidebarOpened: boolean;
  onToggle: () => void;
  links: LazyNavLinkItem[];
  isLoading?: boolean;
  footer?: React.ReactNode;
  navLinkColor?: MantineColor;
};

function LazySidebarLayout({
  isSidebarOpened,
  onToggle,
  links,
  isLoading = false,
  footer,
  navLinkColor = "gray",
}: LazySidebarLayoutProps) {
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

      <AppShell.Navbar bg="primary">
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
          Navbar header
        </AppShell.Section>

        <AppShell.Section p="md" grow my="md" component={ScrollArea}>
          {isLoading ? <p>Loading...</p> : <LazySidebarNavLinkList links={links || []} color={navLinkColor} />}
        </AppShell.Section>
        <AppShell.Section style={{ borderTop: "1px solid var(--border-color)" }}>{footer}</AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main bg="secondary" style={{ paddingTop: "50px" }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default LazySidebarLayout;
