import React from "react";
import { CustomLink } from "../../CustomLink";
import { useLocation } from "@tanstack/react-router";
import { Button, ButtonProps, UnstyledButton } from "@mantine/core";

type LazyNavLinkProps = {
  to?: string;
  params?: Record<string, string>;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
} & ({ to: string; onClick?: never } | { to?: undefined; onClick: () => void });

function LazyNavLink({ to, params, className = "", activeClassName = "", children, onClick }: LazyNavLinkProps) {
  const location = useLocation();
  const isActive = to && location.pathname === to;
  const linkClasses = `${className} ${isActive ? activeClassName : ""}`.trim();

  return to ? (
    <CustomLink to={to} className={linkClasses} params={params}>
      {children}
    </CustomLink>
  ) : (
    <UnstyledButton className={className} onClick={onClick}>
      {children}
    </UnstyledButton>
  );
}

export default LazyNavLink;
