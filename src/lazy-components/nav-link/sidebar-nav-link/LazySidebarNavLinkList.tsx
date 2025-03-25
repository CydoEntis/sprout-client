import { NavLink, NavLinkProps } from "@mantine/core";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { LazyNavLinkItem } from "./lazy-sidebar-nav-link.types";

import styles from "./lazy-side-bar-nav-link-list.module.css";

type LazySidebarNavLinkListProps = {
  links: LazyNavLinkItem[];
} & NavLinkProps;

function LazySidebarNavLinkList({ links, ...rest }: LazySidebarNavLinkListProps) {
  const matchRoute = useMatchRoute();

  return (
    <>
      {links.map((link) => {
        const isActive = !!matchRoute({ to: link.to as typeof link.routePattern });

        return (
          <NavLink
            className={styles.navlink}
            component={Link}
            key={link.to}
            label={link.label}
            leftSection={link.icon}
            childrenOffset={28}
            active={isActive}
            to={link.to}
            {...rest}
          />
        );
      })}
    </>
  );
}

export default LazySidebarNavLinkList;
