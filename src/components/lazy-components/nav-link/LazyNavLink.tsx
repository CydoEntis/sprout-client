import React from "react";
import { CustomLink } from "../../CustomLink";
import { useLocation } from "@tanstack/react-router";

type LazyNavLinkProps = {
  to: string;
  params?: Record<string, string>;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
};

function LazyNavLink({ to, params, className, activeClassName, children }: LazyNavLinkProps) {
  const location = useLocation();
  const isActive = to && location.pathname === to;

  const linkClasses = `${className} ${isActive ? activeClassName : ""}`.trim();

  return (
    <CustomLink to={to} className={linkClasses} params={params}>
      {children}
    </CustomLink>
  );
}

export default LazyNavLink;
