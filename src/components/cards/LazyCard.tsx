import React from "react";
import { CustomLink } from "../CustomLink";
import { Paper } from "@mantine/core";
import clsx from "clsx";
import styles from "./lazy-card.module.css";

type LazyCardProps = {
  children: React.ReactNode;
  to?: string;
  params?: Record<string, string>;
  isHoverable?: boolean;
  hasBorder?: boolean;
};

function LazyCard({ to, params, isHoverable = false, hasBorder = true, children }: LazyCardProps) {
  const cardClasses = clsx(styles.card, {
    [styles["card-hoverable"]]: isHoverable,
    [styles["card-border"]]: hasBorder,
  });

  const cardContent = (
    <Paper
      className={cardClasses}
      shadow="md"
      p="md"
      radius="md"
      pos="relative"
      bg="secondary"
      w={300}
      h={200}
      withBorder
    >
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
