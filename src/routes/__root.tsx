import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import theme from "../components/theme/theme.config";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <MantineProvider theme={theme}>
        <Outlet />
      </MantineProvider>
    </React.Fragment>
  );
}
