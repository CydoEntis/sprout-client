import { NavLink } from "@mantine/core";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

type NavLinkItem = {
  label: string;
  to: string;
  routePattern: string;
  leftSection?: React.ReactNode;
};

type NavLinkListProps = {
  links: NavLinkItem[];
};

function NavLinkList({ links }: NavLinkListProps) {
  const matchRoute = useMatchRoute();
  return (
    <>
      {links.map((link) => {
        const isActive = !!matchRoute({ to: link.to as typeof link.routePattern });

        return (
          <NavLink
            component={Link}
            key={link.to}
            label={link.label}
            leftSection={link.leftSection || <ShoppingBag size={20} />}
            childrenOffset={28}
            active={isActive}
            to={link.to}
            color="gray"
          />
        );
      })}
    </>
  );
}

export default NavLinkList;
