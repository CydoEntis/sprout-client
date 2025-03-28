import React from "react";
import { UnstyledButton } from "@mantine/core";
import { LazyLink } from "../link/LazyLink";

type LazyNavLinkProps = {
  to?: string;
  params?: Record<string, string>;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
  active: boolean;
} & ({ to: string; onClick?: never } | { to?: undefined; onClick: () => void });

function LazyNavLink({
  to,
  params,
  className = "",
  activeClassName = "",
  children,
  onClick,
  active,
}: LazyNavLinkProps) {
  const linkClasses = `${className} ${active ? activeClassName : ""}`.trim(); // Use passed-in active state

  return to ? (
    <LazyLink to={to} className={linkClasses} params={params}>
      {children}
    </LazyLink>
  ) : (
    <UnstyledButton className={className} onClick={onClick}>
      {children}
    </UnstyledButton>
  );
}

export default LazyNavLink;
