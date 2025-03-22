import { Anchor, Paper, Title, Text, Flex } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { ReactElement } from "react";

type AuthCardProps = {
  title: string;
  anchorLabel: string;
  anchorText: string;
  to: string;
  children: ReactElement;
};

function AuthCard({ title, anchorLabel, anchorText, to, children }: AuthCardProps) {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        width: "100%",
      }}
    >
      <Paper
        withBorder
        shadow="md"
        p={32}
        pt={30}
        radius="md"
        bg="secondary"
        className="card"
        style={{
          maxWidth: "520px",
          width: "100%",
        }}
      >
        <Title ta="center">{title}</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          {anchorLabel}{" "}
          <Anchor component={Link} to={to} size="sm" c="lime">
            {anchorText}
          </Anchor>
        </Text>
        {children}
      </Paper>
    </Flex>
  );
}

export default AuthCard;
