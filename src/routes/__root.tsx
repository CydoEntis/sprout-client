import * as React from "react";
import {  createRootRoute } from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import theme from "../components/theme/theme.config";
import Layout from "../components/layout/Layout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <MantineProvider theme={theme}>
        <Layout />
      </MantineProvider>
    </React.Fragment>
  );
}
