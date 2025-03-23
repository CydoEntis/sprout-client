import React from "react";
import { CustomLink } from "../../CustomLink";
import { Paper, PaperProps } from "@mantine/core";
import clsx from "clsx";
import styles from "./lazy-card.module.css";

type LazyCardProps = {
  children: React.ReactNode;
  to?: string;
  params?: Record<string, string>;
  isHoverable?: boolean;
  hasBorder?: boolean;
} & PaperProps;

function LazyCard({ to, params, isHoverable = false, hasBorder = true, children, ...rest }: LazyCardProps) {
  const cardClasses = clsx(styles.card, {
    [styles["card-hoverable"]]: isHoverable,
    [styles["card-border"]]: hasBorder,
  });

  const cardContent = (
    <Paper className={cardClasses} {...rest}>
      {children}
    </Paper>
  );

  return to ? (
    <CustomLink c="inverse" to={to} params={params}>
      {cardContent}
    </CustomLink>
  ) : (
    cardContent
  );
}

export default LazyCard;
