import React from "react";
import { Card, CardProps } from "@mantine/core";
import { LazyLink } from "../link/LazyLink";

type LazyCardProps = {
  children: React.ReactNode;
  to?: string;
  params?: Record<string, string>;
} & CardProps;

function LazyCard({ to, params, children, ...rest }: LazyCardProps) {
  const cardContent = <Card {...rest}>{children}</Card>;

  return to ? (
    <LazyLink c="inverse" to={to} params={params}>
      {cardContent}
    </LazyLink>
  ) : (
    cardContent
  );
}

export default LazyCard;
