import React from "react";
import { CustomLink } from "../../CustomLink";
import { Card, CardProps } from "@mantine/core";

type LazyCardProps = {
  children: React.ReactNode;
  to?: string;
  params?: Record<string, string>;
} & CardProps;

function LazyCard({ to, params, children, ...rest }: LazyCardProps) {
  const cardContent = <Card {...rest}>{children}</Card>;

  return to ? (
    <CustomLink c="inverse" to={to} params={params}>
      {cardContent}
    </CustomLink>
  ) : (
    cardContent
  );
}

export default LazyCard;
