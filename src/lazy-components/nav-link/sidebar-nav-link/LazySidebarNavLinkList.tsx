import { NavLink, NavLinkProps, Paper, Stack } from "@mantine/core";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { LazyNavLinkItem } from "./lazy-sidebar-nav-link.types";

import styles from "./lazy-side-bar-nav-link-list.module.css";
import React, { ReactElement } from "react";

type LazySidebarNavLinkListProps = {
  links: LazyNavLinkItem[];
  childLinkProps?: NavLinkProps; // Props for child links
} & NavLinkProps;

function LazySidebarNavLinkList({ links, childLinkProps = {}, ...rest }: LazySidebarNavLinkListProps) {
  const matchRoute = useMatchRoute();

  return (
    <Stack gap={8}>
      {links.map((link) => {
        const isParentActive = !!matchRoute({ to: link.to as typeof link.routePattern });

        return (
          <div key={link.to}>
            <NavLink
              className={styles.navlink}
              component={Link}
              label={link.label}
              leftSection={
                link.icon ? (
                  <Paper
                    px={6}
                    py={8}
                    bg={link.iconColor}
                    radius="md"
                    h={35}
                    w={35}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    {React.isValidElement(link.icon)
                      ? React.cloneElement(link.icon as ReactElement, { size: 32, color: "white" })
                      : link.icon}
                  </Paper>
                ) : null
              }
              childrenOffset={28}
              to={link.to}
              active={isParentActive}
              {...rest}
            >
              <Stack gap={8} py={8}>
                {link.childLinks && link.childLinks.length > 0 && (
                  <>
                    {link.childLinks.map((childLink) => {
                      const isChildActive = !!matchRoute({ to: childLink.to as typeof childLink.routePattern });

                      return (
                        <NavLink
                          className={styles.navlink}
                          key={childLink.to}
                          component={Link}
                          label={childLink.label}
                          childrenOffset={28}
                          active={isChildActive}
                          to={childLink.to}
                          {...childLinkProps}
                        />
                      );
                    })}
                  </>
                )}
              </Stack>
            </NavLink>
          </div>
        );
      })}
    </Stack>
  );
}

export default LazySidebarNavLinkList;
