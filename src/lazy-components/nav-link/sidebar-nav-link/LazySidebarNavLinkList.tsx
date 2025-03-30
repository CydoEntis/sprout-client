import { NavLink, NavLinkProps, Paper, Stack, Text } from "@mantine/core";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { LazyNavLinkList } from "./lazy-sidebar-nav-link.types";
import styles from "./lazy-side-bar-nav-link-list.module.css";
import React, { ReactElement } from "react";

type LazySidebarNavLinkListProps = {
  navList: LazyNavLinkList[];
  childLinkProps?: NavLinkProps;
} & NavLinkProps;

function LazySidebarNavLinkList({ navList, childLinkProps = {}, ...rest }: LazySidebarNavLinkListProps) {
  const matchRoute = useMatchRoute();

  return (
    <Stack gap={16}>
      {navList.map((list, listIndex) => (
        <div key={listIndex}>
          {list.sectionTitle && (
            <Text fw={600} size="lg" c="gray" mt={8}>
              {list.sectionTitle}
            </Text>
          )}

          <Stack gap={8} mt={8}>
            {list.links.map((link, linkIndex) => {
              // Check if any child link is active using fuzzy matching
              const isAnyChildActive = link.childLinks?.some(
                (childLink) => Boolean(matchRoute({ to: childLink.to, fuzzy: true })) // Use fuzzy matching for child links
              );

              // The parent should never be active if it has children
              const isParentActive = link.childLinks?.length
                ? false // Parent should be inactive if it has children
                : Boolean(matchRoute({ to: link.to, fuzzy: false })); // Exact match for parent link

              // If any child is active, no parent links should be active
              const isLinkActive = isAnyChildActive ? false : isParentActive;

              return (
                <div key={linkIndex}>
                  <NavLink
                    className={styles.navlink}
                    component={Link}
                    label={link.label}
                    leftSection={
                      link.icon && (
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
                      )
                    }
                    childrenOffset={28}
                    to={link.to}
                    active={isLinkActive} // Only activate if no child is active
                    {...rest}
                  >
                    {link.childLinks && link.childLinks.length > 0 && (
                      <Stack gap={8} py={8}>
                        {link.childLinks.map((childLink) => {
                          const isChildActive = Boolean(
                            matchRoute({ to: childLink.to, fuzzy: true }) // Use fuzzy matching for child links
                          );

                          return (
                            <NavLink
                              className={styles.navlink}
                              key={childLink.to}
                              component={Link}
                              label={childLink.label}
                              childrenOffset={28}
                              active={isChildActive} // Only activate the child link if it matches the route
                              to={childLink.to}
                              {...childLinkProps}
                            />
                          );
                        })}
                      </Stack>
                    )}
                  </NavLink>
                </div>
              );
            })}
          </Stack>
        </div>
      ))}
    </Stack>
  );
}

export default LazySidebarNavLinkList;
