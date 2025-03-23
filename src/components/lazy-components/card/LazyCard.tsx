import React from "react";
import { CustomLink } from "../../CustomLink";
import { Paper, PaperProps } from "@mantine/core";


type LazyCardProps = {
  children: React.ReactNode;
  to?: string;
  params?: Record<string, string>;
} & PaperProps;

function LazyCard({ to, params, children, ...rest }: LazyCardProps) {
  const cardContent = <Paper {...rest}>{children}</Paper>;

  return to ? (
    <CustomLink c="inverse" to={to} params={params}>
      {cardContent}
    </CustomLink>
  ) : (
    cardContent
  );
}

export default LazyCard;
